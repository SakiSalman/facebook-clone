



export const errorHandler = (error, req, res, next) => {



    const errorstatus = error.status || 500
    const errormessage = error.message || "unknown Error"

    return res.status(errorstatus).json({
        status : errorstatus,
        message : errormessage,
        stack : error.stack
    })

    next()

}