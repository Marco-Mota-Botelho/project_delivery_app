export default class ErrorFactory extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
}