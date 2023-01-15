class ValidatorError  extends Error {
    constructor(message, path, type) {
      super()
      this.message = message
      this.name = "ValidatorError"
      this.path = path
      this.type = type
    }
}

module.exports = ValidatorError