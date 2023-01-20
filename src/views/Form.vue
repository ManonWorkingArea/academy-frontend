<template>
  <div class="container">
    <form ref="form" v-on:submit.prevent="onSubmit">
      <label for="password">Password:</label>
      <input type="password" id="password" v-bind:class="{ 'error': passwordError }" v-on:input="clearError('password')" />
      <label v-if="passwordError" class="error">{{ passwordError }}</label>

      <label for="email">Email:</label>
      <input type="email" id="email" v-bind:class="{ 'error': emailError }" v-on:input="clearError('email')" />
      <label v-if="emailError" class="error">{{ emailError }}</label>

      <button type="submit">Submit</button>
    </form>

    <div class="overlay" v-if="showOverlay">
      <div class="spinner" v-if="!error">
        <!-- Add your spinner component here -->
      </div>
      <p class="error_respond" v-if="error">{{ error }}</p>
      <button v-if="error" v-on:click="closeOverlay">Close</button>
    </div>
  </div>
</template>

  <script>

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
    async onSubmit() {
      this.showOverlay = true
      this.passwordError = ''
      this.emailError = ''
      try {
        const formElements = this.$refs.form.elements
        const formData = {}
        for (let i = 0; i < formElements.length; i++) {
          const element = formElements[i]
          if (element.name || element.id) {
            formData[element.name || element.id] = element.value
          }
        }
        const errors = this.validate(formData, {
          password: { required: true, minLength: 8 },
          email: { required: true, email: true }
        })
        if (Object.keys(errors).length) {
          this.passwordError = errors.password || ''
          this.emailError = errors.email || ''
          if (errors.password && errors.email) {
            this.error = `Form validation error: ${errors.password.join(', ')} ${errors.email.join(', ')}`
          } else if (errors.password) {
            this.error = `Form validation error: ${errors.password.join(', ')}`
          } else if (errors.email) {
            this.error = `Form validation error: ${errors.email.join(', ')}`
          }
          this.showOverlay = true
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
          const errorMap = {
            'Missing email or username': 'Email is required',
            'Missing password': 'Password is required'
          }
          this[errorJson.error.split(' ')[1] + 'Error'] = errorMap[errorJson.error]
          throw new Error(errorJson.error)
        }
        this.showOverlay = false
        const successData = await response.json()
        this.handleSuccess(successData)
      } catch (error) {
        this.error = error.message
      }
    },
    generateRequestBody(formData) {
      // Add your logic for generating the request body here
      return formData
    },
    clearError(input) {
      this[input + 'Error'] = ''
    },
    closeOverlay() {
      this.showOverlay = false
      this.error = null
    },
    handleSuccess(successData) {
      // Add your success handling logic here
      console.log(successData)
    }
  }
}

  </script>

  <style>
  .container {
    position: relative;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  label {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  input {
    width: 300px;
    height: 40px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 10px;
    margin-bottom: 20px;
  }
  
  button[type="submit"] {
    width: 300px;
    height: 40px;
    font-size: 18px;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    margin: 100px auto;
    background-color: #333;
    border-radius: 100%;
    -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
    animation: sk-scaleout 1.0s infinite ease-in-out;
  }
  
  @-webkit-keyframes sk-scaleout {
    0% { -webkit-transform: scale(0) }
    100% {
      -webkit-transform: scale(1.0);
      opacity: 0;
    }
  }
  
  @keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 100% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
      opacity: 0;
    }
  }
  
  .error_respond {
    background-color: red;
    color: white;
    margin-bottom: 10px;
    text-align: center;
  }

  .error {
    background-color: red;
    color: white;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .error.input {
    border: 1px solid red;
  }
  
  button {
    width: 300px;
    height: 40px;
    font-size: 18px;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }
  
  </style>