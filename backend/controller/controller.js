import {
  getAllTodos,
  insertOneTodo,
  addTodoFields,
  deleteTodo,
  markAllTodosDone
} from '../model/database.js';

import { isEmptyObject, rename_idToid, renameKey } from '../utility.js';

export const getAllTodosController = async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

export const insertTodoController = async (req, res) => {
  try {
    if (isEmptyObject(req.body)) {
      res.status(400).json({ message: 'Empty Body Sent' });
     // throw new Error('Empty Body Sent'); //return from the function
    }
    const result = await insertOneTodo(req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

export const updateTodoByIdController = async (req, res, next) => {
  try {
    if (isEmptyObject(req.body)) {
      res.status(400).json({ message: 'Empty Body Sent' });
      throw new Error('Empty Body Sent');
    }

    const todo = await addTodoFields(req.params.id, req.body);
    res.json(todo);
  } catch (err) {
    console.log(err);
  }
};

export const deleteByIdController = async (req, res, next) => {
  try {
    const result = await deleteTodo(req.params.id);
    res.json({ deleted: result });
  } catch (err) {
    console.log(err);
  }
};

export const markAllDoneController = async (req, res) => {
  await markAllTodosDone();
  res.json();
};
