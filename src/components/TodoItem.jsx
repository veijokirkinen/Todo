import { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onEdit, onUpdatePriority, onUpdateDeadline }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      onEdit(todo.id, editText)
    }
    setIsEditing(false)
    setEditText(todo.text)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditText(todo.text)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fi-FI', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDeadline = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('fi-FI', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getDeadlineStatus = (deadline) => {
    if (!deadline || todo.completed) return 'none'
    
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const deadlineDate = new Date(deadline)
    const deadlineDateOnly = new Date(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate())
    
    if (deadlineDateOnly < today) return 'overdue'
    if (deadlineDateOnly.getTime() === today.getTime()) return 'today'
    if (deadlineDateOnly <= new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)) return 'soon'
    return 'future'
  }

  const getPriorityInfo = (priority) => {
    const priorityMap = {
      'high': { emoji: '🔴', label: 'Korkea', class: 'priority-high' },
      'medium': { emoji: '🟡', label: 'Normaali', class: 'priority-medium' },
      'low': { emoji: '🟢', label: 'Matala', class: 'priority-low' }
    }
    return priorityMap[priority] || priorityMap['medium']
  }

  const priorityInfo = getPriorityInfo(todo.priority || 'medium')
  const deadlineStatus = getDeadlineStatus(todo.deadline)

  const handleDeadlineChange = (e) => {
    const newDeadline = e.target.value ? new Date(e.target.value + 'T23:59:59').toISOString() : null
    onUpdateDeadline(todo.id, newDeadline)
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${priorityInfo.class} deadline-${deadlineStatus}`}>
      <div className="todo-content">
        <button
          className="todo-toggle"
          onClick={() => onToggle(todo.id)}
          title={todo.completed ? 'Merkitse keskeneräiseksi' : 'Merkitse valmiiksi'}
        >
          {todo.completed ? '✅' : '⭕'}
        </button>

        <div className="priority-indicator" title={`Prioriteetti: ${priorityInfo.label}`}>
          {priorityInfo.emoji}
        </div>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyPress}
            className="todo-edit-input"
            autoFocus
            maxLength={200}
          />
        ) : (
          <div className="todo-text-container">
            <span className="todo-text">{todo.text}</span>
            <div className="todo-meta">
              <small className="todo-date">
                Luotu: {formatDate(todo.createdAt)} | Prioriteetti: {priorityInfo.label}
              </small>
              {todo.deadline && (
                <div className={`deadline-info deadline-${deadlineStatus}`}>
                  {deadlineStatus === 'overdue' && <span className="deadline-emoji">⚠️</span>}
                  {deadlineStatus === 'today' && <span className="deadline-emoji">📅</span>}
                  {deadlineStatus === 'soon' && <span className="deadline-emoji">⏰</span>}
                  {deadlineStatus === 'future' && <span className="deadline-emoji">📆</span>}
                  <span className="deadline-text">
                    Määräpäivä: {formatDeadline(todo.deadline)}
                    {deadlineStatus === 'overdue' && ' (MYÖHÄSSÄ!)'}
                    {deadlineStatus === 'today' && ' (TÄNÄÄN)'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="todo-actions">
        {!isEditing && (
          <>
            <input
              type="date"
              value={todo.deadline ? new Date(todo.deadline).toISOString().split('T')[0] : ''}
              onChange={handleDeadlineChange}
              className="deadline-change-input"
              title="Muuta määräpäivä"
              disabled={todo.completed}
              min={new Date().toISOString().split('T')[0]}
            />
            <select
              value={todo.priority || 'medium'}
              onChange={(e) => onUpdatePriority(todo.id, e.target.value)}
              className="priority-change-select"
              title="Muuta prioriteetti"
              disabled={todo.completed}
            >
              <option value="high">🔴 Korkea</option>
              <option value="medium">🟡 Normaali</option>
              <option value="low">🟢 Matala</option>
            </select>
            <button
              className="todo-edit"
              onClick={() => setIsEditing(true)}
              title="Muokkaa tehtävää"
              disabled={todo.completed}
            >
              ✏️
            </button>
          </>
        )}
        <button
          className="todo-delete"
          onClick={() => onDelete(todo.id)}
          title="Poista tehtävä"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TodoItem