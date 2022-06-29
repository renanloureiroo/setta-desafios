class AppError {
  message
  statusCode
  constructor(message, statusCode = 404) {
    this.message = message
    this.statusCode = statusCode
  }
}

export { AppError }
