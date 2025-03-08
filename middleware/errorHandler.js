function errorHandler(err, req, res, next) {
    console.error(err.stack);

    // Set status code (default to 500 if not specified)
    const statusCode = err.status || 500;
    
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        // Only expose stack trace in development mode
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
}

module.exports = errorHandler;