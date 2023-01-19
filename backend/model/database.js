//import { MongoClient, ObjectId } from 'mongodb';
import { createClient } from 'redis';
import { isEmptyObject, rename_idToid, renameKey } from '../utility.js';
import dotenv from 'dotenv';

dotenv.config();

//const client = new MongoClient(process.env.DB_URL);
//const db = client.db(process.env.DB_NAME);
//const collection = db.collection(process.env.DB_COLLECTION);
const client = createClient();
await client.connect();

//await client.json.SET('todos','$',[]);
//await client.SET('id',0)

// let id = await client.GET('id');

// await client.json.ARRAPPEND('todos', '$', {
//   id: Number(id),
//   date: '',
//   deleted: true,
//   done: true,
//   notes: '',
//   priority: 'none',
//   title: 'todo 3'
// });
// id = await client.INCR('id');
// const value = await client.json.get('todos');
//console.log(value);

export async function getAllTodos() {
  try {
    const value = await client.json.get('todos');
    return value;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function insertOneTodo(todo) {
  let insertedTodo = {};
  try {
    // insertedTodo = await collection.insertOne(todo);
    // insertedTodo = collection.find({
    //   _id: ObjectId(insertedTodo.insertedId + '')
    // });
    // return rename_idToid(await insertedTodo.toArray());
    let id = await client.GET('id');
    todo.id = Number(id);
    await client.json.ARRAPPEND('todos', '$', todo);
    id = await client.INCR('id');
    return todo;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function addTodoFields(id, todofields) {
  try {
    // const filter = {
    //   _id: ObjectId(id)
    // };
    // const updateDoc = {
    //   $set: todofields
    // };
    // await collection.updateOne(filter, updateDoc);
    // let updatedTodo = collection.find({ _id: ObjectId(id) });
    // return renameKey((await updatedTodo.toArray())[0], '_id', 'id');
    let todofield = Object.keys(todofields)[0];
    await client.json.SET(
      'todos',
      `[${id}].` + todofield,
      todofields[todofield]
    );
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function deleteTodo(id) {
  try {
    /* const filter = {
      _id: ObjectId(id)
    };
    const updateDoc = {
      $set: { deleted: true }
    };
    const result = await collection.updateOne(filter, updateDoc);
    return result.modifiedCount > 0 && result.matchedCount > 0; */
    await client.json.SET('todos', `[${id}].deleted`, true);
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
