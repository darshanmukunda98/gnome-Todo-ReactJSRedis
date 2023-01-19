import express  from 'express';
import {
  getAllTodosController,
  insertTodoController,
  updateTodoByIdController,
  deleteByIdController,
  markAllDoneController
} from '../controller/controller.js';


const router = express.Router();

router.get('/', getAllTodosController);

router.post('/', insertTodoController);

router.put('/:id', updateTodoByIdController);

router.delete('/:id', deleteByIdController);

router.put('/all/check', markAllDoneController);

export default router;

