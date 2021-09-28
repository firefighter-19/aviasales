export class ErrorApi extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static unauthorizedErrorHandler() {
        return new ErrorApi(401, 'User is not authorized');
    }

    static badRequestHandler(message, errors = []) {
        return new ErrorApi(400, message, errors);
    }
}