const ErrorHandler = class extends Error {
  static handler(err, _req, res, _next) {
    const { message, status } = err;
    return res.status(status).json({ message });
  }
};

module.exports = ErrorHandler;
