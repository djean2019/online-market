class ResponseApi {
    status;
    message;
    result;

    constructor(status, message, result) {
        this.status = status;
        this.message = message;
        this.result = result;
    }
}

module.exports = ResponseApi;