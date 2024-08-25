// custom-errors.js
class ConflictException extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictException";
        this.statusCode = 409; // HTTP Status Code for Conflict
    }
}

class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundException";
        this.statusCode = 404; // HTTP Status Code for Conflict
    }
}

class InternalServerErrorException extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalServerErrorException";
        this.statusCode = 500; // HTTP Status Code for Internal Server Error
    }
}

class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedException";
        this.statusCode = 422; // HTTP Status Code for Internal Server Error
    }
}

module.exports = {
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
};
