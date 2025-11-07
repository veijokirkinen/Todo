import { useState } from 'react'

function AddTodo({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [deadline, setDeadline] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      const deadlineValue = deadline ? new Date(deadline + 'T23:59:59').toISOString() : null
      onAdd(text, priority, deadlineValue)
      setText('')
      setPriority('medium')
      setDeadline('')
    }
  }

  const priorityOptions = [
    { value: 'high', label: '🔴 Korkea', emoji: '🔴' },
    { value: 'medium', label: '🟡 Normaali', emoji: '🟡' },
    { value: 'low', label: '🟢 Matala', emoji: '🟢' }
  ]

  // Minimipäivä on tänään
  const today = new Date().toISOString().split('T')[0]

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Lisää uusi tehtävä..."
          className="add-todo-input"
          maxLength={200}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
          title="Valitse prioriteetti"
        >
          {priorityOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="deadline-select"
          title="Valitse määräpäivä (valinnainen)"
          min={today}
        />
      </div>
      <button 
        type="submit" 
        className="add-todo-button"
        disabled={!text.trim()}
      >
        ➕ Lisää
      </button>
    </form>
  )
}

export default AddTodo