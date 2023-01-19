import { MongoClient, ObjectId } from 'mongodb';
import { isEmptyObject, rename_idToid, renameKey } from '../utility.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.DB_URL);
const db = client.db(process.env.DB_NAME);
const collection = db.collection(process.env.DB_COLLECTION);

export async function getAllTodos() {
  try {
    const todos = await collection.find({}).toArray();
    return rename_idToid(todos);
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function insertOneTodo(todo) {
  let insertedTodo = {};
  try {
    insertedTodo = await collection.insertOne(todo);
    insertedTodo = collection.find({
      _id: ObjectId(insertedTodo.insertedId + '')
    });
    return rename_idToid(await insertedTodo.toArray());
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function addTodoFields(id, todofields) {
  try {
    const filter = {
      _id: ObjectId(id)
    };
    const updateDoc = {
      $set: todofields
    };
    await collection.updateOne(filter, updateDoc);
    let updatedTodo = collection.find({ _id: ObjectId(id) });
    return renameKey((await updatedTodo.toArray())[0], '_id', 'id');
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function deleteTodo(id) {
  try {
    const filter = {
      _id: ObjectId(id)
    };
    const updateDoc = {
      $set: { deleted: true }
    };
    const result = await collection.updateOne(filter, updateDoc);
    return result.modifiedCount > 0 && result.matchedCount > 0;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function markAllTodosDone() {
  try {
    const todos = await collection.find({}).toArray();
    const filter = {};
    const updateDoc = {
      $set: { done: !todos.every((todo) => todo.done) }
    };
    await collection.updateMany(filter, updateDoc);
  } catch (err) {
    console.log(err);
    return err;
  }
}
