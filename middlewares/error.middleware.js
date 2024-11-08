const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Differentiate between development and production errors
    if (process.env.NODE_ENV === 'development') {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    } else {
        res.status(500).render('error', {
            message: 'Something went wrong!'
        });
    }
};

module.exports = errorHandler; 