import { useState } from 'react'
import Todos from './Todos'

export default function App () {
  const [todos, setTodos] = useState([])

  function input (e) {
    if (e.key === 'Enter' && e.target.value !== '') {
      const todo = {
        id: Date.now(),
        name: e.target.value
      }

      setTodos([...todos, todo])
      console.log(todos)
      e.target.value = ''
    }
  }

  return (
    <div>
      <input type='text' onKeyDown={input} />
      <Todos todos={todos} />
    </div>
  )
}
