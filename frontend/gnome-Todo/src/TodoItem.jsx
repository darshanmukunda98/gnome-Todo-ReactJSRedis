export default function TodoItem ({ todoItem }) {
  return (
    <details id={todoItem.id}>
      <summary>
        <input type='checkbox' />
        <input value={todoItem.name} />
      </summary>

      <textarea />
      <input type='date' />
      <select>
        <option defaultValue=''>None</option>
        <option value='High'>High</option>
        <option value='Medium'>Medium</option>
        <option value='Low'>Low</option>
      </select>
    </details>
  )
}
