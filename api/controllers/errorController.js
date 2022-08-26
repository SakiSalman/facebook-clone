

// custom error controller


export const customError = (status, msg) => {

    const err = new Error()

    err.status = status
    err.message = msg

    return err
}