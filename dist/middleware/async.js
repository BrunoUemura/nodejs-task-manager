"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = void 0;
const asyncWrapper = (fn) => {
    return async (request, response, next) => {
        try {
            await fn(request, response, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.asyncWrapper = asyncWrapper;
