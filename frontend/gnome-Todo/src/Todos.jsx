import TodoItem from './TodoItem'

export default function Todos ({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todoItem={todo} />
        </li>
      ))}
    </ul>
  )
}
