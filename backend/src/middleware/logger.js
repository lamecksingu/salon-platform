// logger.js

const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next(); // Proceed to the next middleware or route
};

module.exports = loggerMiddleware;

