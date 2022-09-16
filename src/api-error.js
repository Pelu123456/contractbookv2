class ApiError extends Error{
    constructor(statsCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ApiError;