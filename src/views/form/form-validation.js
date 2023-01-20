export function validate(formData, rules) {
    const errors = {}
    for (const key in formData) {
      if (rules[key]) {
        const fieldErrors = validateField(formData[key], rules[key])
        if (fieldErrors.length) {
          errors[key] = fieldErrors
        }
      }
    }
    return errors
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  
  function validateField(value, rules) {
    const errors = []
    for (const rule in rules) {
      switch (rule) {
        case 'required':
          if (!value.trim()) {
            errors.push('This field is required')
          }
          break
        case 'minLength':
          if (value.trim().length < rules[rule]) {
            errors.push(`This field must be at least ${rules[rule]} characters long`)
          }
          break
        case 'maxLength':
          if (value.trim().length > rules[rule]) {
            errors.push(`This field must be no more than ${rules[rule]} characters long`)
          }
          break
        case 'email':
          if (!validateEmail(value)) {
            errors.push('This field must be a valid email')
          }
          break
        case 'number':
          if (isNaN(value)) {
            errors.push('This field must be a number')
          }
          break
        case 'passwordMatch':
          if (value !== rules[rule]) {
            errors.push('Passwords do not match')
          }
          break
        case 'slug':
          if (!/^[a-z0-9-]+$/.test(value)) {
            errors.push('This field must be a slug')
          }
          break
        default:
          break
      }
    }
    return errors
  }
  