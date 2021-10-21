"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const custom_error_1 = require("../errors/custom-error");
const errorHandlerMiddleware = (err, _request, response, next) => {
    if (err instanceof custom_error_1.CustomAPIError) {
        return response.status(err.statusCode).json({ msg: err.message });
    }
    return response.status(500).json({ msg: 'Something went wrong, please try again' });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
