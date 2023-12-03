 const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Server Error';
    const errorMessage = error.response?.data?.error || message;
    res.status(statusCode).json({message: message});
 };
 export default errorHandler;