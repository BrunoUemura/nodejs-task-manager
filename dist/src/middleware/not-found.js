"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (request, response) => response.status(404).send("Route does not exist");
exports.notFound = notFound;
