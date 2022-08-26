


//ErrorHandler


const errorHandler = (error, req, res, next) => {


    const errstatus = error.status || 500
    const errmessage = error.message || "Unknown Error!"


    return res.status(errstatus).json({
        status : errstatus,
        message : errmessage,
        stack : error.stack
    })

}

// export error handler

export default errorHandler;