import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { v4 as uuidv4 } from 'uuid'

const initialTodo = [
  {
    id: uuidv4(),
    text: 'todo1',
    status: 'Ongoing'
  },
  {
    id: uuidv4(),
    text: 'todo2',
    status: 'Ongoing'
  },
  {
    id: uuidv4(),
    text: 'todo3',
    status: 'Ongoing'
  }
]

const TodoItem = styled.div`
  padding: 0 15px;
  background-color: #e1ef97;
  font-size: 24px;
  border-radius: 4px;
  color: #042b67;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    color: #3065b5;
  }
`

const FilterBox = styled.div`
  padding: 15px;
  border-radius: 4px;
  color: #042b67;
  font-weight: bold;
  display: flex;
  align-items: center;
`

const TodoText = styled.p(
  props => ({ textDecoration: props.status === 'Done' ? 'line-through' : 'none'})
)

const AddInput = styled.input`
  padding: 10px 15px;
  margin: 0 5px;
  border: 1px solid #042b67;
  border-radius: 4px;
`

function TodoList() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodo] = useState(initialTodo)

  const handleChange = (e) => {
    if (e.key === 'Enter') {
      setTodo([ ...todos, {
        id: uuidv4(),
        text: newTodo,
        status: 'Ongoing'
      }])
      setNewTodo('')
    }
  }

  const removeTodo = (id) => {
    setTodo(todos.filter((todo) => todo.id !== id))
  }

  const changeStatus = (index) => {
    let newTodos = todos
    newTodos[index].status = newTodos[index].status === 'Ongoing' ? 'Done' : 'Ongoing'
    setTodo([ ...newTodos ])
  }

  const [todoFilter, setFilter] = useState('All')
  const changeFilter = (value) => {
    setFilter(value)
  }
  const [showTodos, setShowTodos] = useState(initialTodo)

  useEffect(() => {
    const newTodos = todoFilter === 'All'
      ? todos
      : todos.filter((todo) => todo.status === todoFilter)
    setShowTodos(newTodos)
  }, [todoFilter, todos])

  return (
    <>
      <FilterBox>
        <input
          type='radio'
          name='filter'
          onChange={() => changeFilter('All')}
          checked={todoFilter === 'All'}
        /> All
        <input
          type='radio'
          name='filter'
          onChange={() => changeFilter('Ongoing')}
          checked={todoFilter === 'Ongoing'}
        /> Ongoing
        <input
          type='radio'
          name='filter'
          onChange={() => changeFilter('Done')}
          checked={todoFilter === 'Done'}
        /> Done
      </FilterBox>
      {
        showTodos.map((todo, index) => (
          <TodoItem key={todo.id}>
            <input
              type='checkbox'
              checked={todo.status === 'Done'}
              onChange={() => changeStatus(index)} />
            <TodoText status={todo.status}>{todo.text}</TodoText>
            <button onClick={() => removeTodo(todo.id)}>x</button>
          </TodoItem>
        ))
      }
      add new todo:
      <AddInput
        onKeyPress={handleChange}
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
      />
    </>
  );
}

export default TodoList;