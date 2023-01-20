import formValidation from './form/form-validation'

export default {
  mixins: [formValidation],
  data() {
    return {
      showOverlay: false,
      error: null,
      passwordError: '',
      emailError: ''
    }
  },
  methods: {
    // Form submission
    async onSubmit() {
      this.showOverlay = true
      this.passwordError = ''
      this.emailError = ''
      try {
        const formData = this.getFormData()
        const errors = this.validate(formData, {
          password: { required: true, minLength: 8 },
          email: { required: true, email: true }
        })
        if (Object.keys(errors).length) {
          this.setErrors(errors)
          throw new Error(this.error)
        }
        const response = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          body: JSON.stringify(this.generateRequestBody(formData)),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          const errorJson = await response.json()
          this.setError(errorJson.error)
          throw new Error(errorJson.error)
        }
        this.showOverlay = false
        const successData = await response.json()
        this.handleSuccess(successData)
      } catch (error) {
        this.error = error.message
      }
    },

    getFormData() {
      const formElements = this.$refs.form.elements
      const formData = {}
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i]
        if (element.name || element.id) {
          formData[element.name || element.id] = element.value
        }
      }
      return formData
    },
    
    generateRequestBody(formData) {
      // Add your logic for generating the request body here
      return formData
    },
    
    setErrors(errors) {
      const errorMap = {
        'Missing email or username': 'Email is required',
        'Missing password': 'Password is required'
      }
      for (const key in errors) {
        this[`${key}Error`] = errorMap[errors[key][0]] || errors[key]
      }
      this.error = `Form validation error: ${Object.values(errors).flat().join(', ')}`
      this.showOverlay = true
    },
    
    setError(error) {
      const errorMap = {
        'Missing email or username': 'Email is required',
        'Missing password': 'Password is required'
      }
      const field = error.split(' ')[1]
      this[`${field}Error`] = errorMap[error] || error
      this.error = error
      this.showOverlay = true
    },
    
    clearError(input) {
      this[input + 'Error'] = ''
    },
    
    closeOverlay() {
      this.showOverlay = false
      this.error = null
    },
    
    // Handling success
    handleSuccess(successData) {
      console.log(successData)
      // Success handling logic goes here
    }
  }
}
