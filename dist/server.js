"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const connect_1 = require("./database/connect");
const not_found_1 = require("./middleware/not-found");
const error_handler_1 = require("./middleware/error-handler");
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.static('./public'));
app.use(express_1.default.json());
// routes
app.use('/api/v1/tasks', tasks_1.default);
app.use(not_found_1.notFound);
app.use(error_handler_1.errorHandlerMiddleware);
(async () => {
    try {
        await (0, connect_1.connectDB)(String(process.env.MONGO_URI));
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
})();
