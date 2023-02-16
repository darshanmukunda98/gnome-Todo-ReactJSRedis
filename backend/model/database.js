import { createClient } from 'redis';


const client = createClient();
await client.connect();

//await client.json.SET('todos','$',[]);
//await client.SET('id',0)

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
    await client.json.SET('todos', `[${id}].deleted`, true);
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function markAllTodosDone() {
  try {
    let all_todos_done_status = await client.json.get('todos')
    await client.json.SET('todos',`[*].done`,!all_todos_done_status.every((todo) => todo.done))
  } catch (err) {
    console.log(err);
    return err;
  }
}
