export default formData => {
    // validate formData
    const valid = Object.values(formData).every(value => value !== '')
    return valid
  }