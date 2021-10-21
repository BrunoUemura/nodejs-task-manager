import { Task } from '../models/Task';
import { asyncWrapper } from '../middleware/async';
import { createCustomError } from '../errors/custom-error';
import { NextFunction, Request, Response } from 'express';

const getAllTasks = asyncWrapper(async (_request: Request, response: Response) => {
  const tasks = await Task.find({});
  response.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (request: Request, response: Response) => {
  const task = await Task.create(request.body);
  response.status(201).json({ task });
});

const getTask = asyncWrapper(async (request: Request, response: Response, next: NextFunction) => {
  const { id: taskID } = request.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  response.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (request: Request, response: Response, next: NextFunction) => {
  const { id: taskID } = request.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  response.status(200).json({ task });
});
const updateTask = asyncWrapper(async (request: Request, response: Response, next: NextFunction) => {
  const { id: taskID } = request.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, request.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  response.status(200).json({ task });
});

export { getAllTasks, createTask, getTask, updateTask, deleteTask };
