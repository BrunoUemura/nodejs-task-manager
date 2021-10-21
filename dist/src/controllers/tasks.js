"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const Task_1 = require("../models/Task");
const async_1 = require("../middleware/async");
const custom_error_1 = require("../errors/custom-error");
const getAllTasks = (0, async_1.asyncWrapper)(async (_request, response) => {
    const tasks = await Task_1.Task.find({});
    response.status(200).json({ tasks });
});
exports.getAllTasks = getAllTasks;
const createTask = (0, async_1.asyncWrapper)(async (request, response) => {
    const task = await Task_1.Task.create(request.body);
    response.status(201).json({ task });
});
exports.createTask = createTask;
const getTask = (0, async_1.asyncWrapper)(async (request, response, next) => {
    const { id: taskID } = request.params;
    const task = await Task_1.Task.findOne({ _id: taskID });
    if (!task) {
        return next((0, custom_error_1.createCustomError)(`No task with id : ${taskID}`, 404));
    }
    response.status(200).json({ task });
});
exports.getTask = getTask;
const deleteTask = (0, async_1.asyncWrapper)(async (request, response, next) => {
    const { id: taskID } = request.params;
    const task = await Task_1.Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next((0, custom_error_1.createCustomError)(`No task with id : ${taskID}`, 404));
    }
    response.status(200).json({ task });
});
exports.deleteTask = deleteTask;
const updateTask = (0, async_1.asyncWrapper)(async (request, response, next) => {
    const { id: taskID } = request.params;
    const task = await Task_1.Task.findOneAndUpdate({ _id: taskID }, request.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return next((0, custom_error_1.createCustomError)(`No task with id : ${taskID}`, 404));
    }
    response.status(200).json({ task });
});
exports.updateTask = updateTask;
