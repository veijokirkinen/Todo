import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onDelete, onEdit, onUpdatePriority, onUpdateDeadline }) {
  if (todos.length === 0) {
    return null
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onUpdatePriority={onUpdatePriority}
          onUpdateDeadline={onUpdateDeadline}
        />
      ))}
    </div>
  )
}

export default TodoList