export function getFormData() {
    const formElements = this.$refs.form.elements
    const formData = {}
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i]
      if (element.name || element.id) {
        formData[element.name || element.id] = element.value
      }
    }
    return formData
  }
  
  export function setErrors(errors) {
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
  }
  