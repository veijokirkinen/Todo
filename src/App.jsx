import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all') // all, completed, active
  const [priorityFilter, setPriorityFilter] = useState('all') // all, high, medium, low
  const [deadlineFilter, setDeadlineFilter] = useState('all') // all, overdue, today, week

  // Lataa tehtävät localStoragesta sovelluksen käynnistyessä
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Tallenna tehtävät localStorageen aina kun lista muuttuu
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Lisää uusi tehtävä
  const addTodo = (text, priority = 'medium', deadline = null) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      priority: priority, // 'high', 'medium', 'low'
      deadline: deadline, // ISO date string or null
      createdAt: new Date().toISOString()
    }
    setTodos([...todos, newTodo])
  }

  // Merkitse tehtävä tehdyksi / peruuta merkintä
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Poista tehtävä
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Muokkaa tehtävän tekstiä
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ))
  }

  // Muuta tehtävän prioriteetti
  const updatePriority = (id, newPriority) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, priority: newPriority } : todo
    ))
  }

  // Muuta tehtävän määräpäivä
  const updateDeadline = (id, newDeadline) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, deadline: newDeadline } : todo
    ))
  }

  // Suodata tehtävät näkymän mukaan
  const filteredTodos = todos.filter(todo => {
    // Tila-suodatus
    let statusMatch = true
    if (filter === 'completed') statusMatch = todo.completed
    if (filter === 'active') statusMatch = !todo.completed
    
    // Prioriteetti-suodatus
    let priorityMatch = true
    if (priorityFilter !== 'all') {
      priorityMatch = (todo.priority || 'medium') === priorityFilter
    }
    
    // Määräpäivä-suodatus
    let deadlineMatch = true
    if (deadlineFilter !== 'all') {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      
      if (deadlineFilter === 'overdue') {
        deadlineMatch = todo.deadline && new Date(todo.deadline) < today && !todo.completed
      } else if (deadlineFilter === 'today') {
        deadlineMatch = todo.deadline && 
          new Date(todo.deadline).toDateString() === today.toDateString()
      } else if (deadlineFilter === 'week') {
        deadlineMatch = todo.deadline && 
          new Date(todo.deadline) >= today && 
          new Date(todo.deadline) <= weekFromNow
      }
    }
    
    return statusMatch && priorityMatch && deadlineMatch
  })

  // Järjestä tehtävät prioriteetin ja määräpäivän mukaan
  const sortedTodos = filteredTodos.sort((a, b) => {
    // Ensin myöhässä olevat tehtävät
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    const aOverdue = a.deadline && new Date(a.deadline) < today && !a.completed
    const bOverdue = b.deadline && new Date(b.deadline) < today && !b.completed
    
    if (aOverdue && !bOverdue) return -1
    if (!aOverdue && bOverdue) return 1
    
    // Sitten prioriteetin mukaan
    const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 }
    const priorityDiff = priorityOrder[b.priority || 'medium'] - priorityOrder[a.priority || 'medium']
    if (priorityDiff !== 0) return priorityDiff
    
    // Sitten määräpäivän mukaan (aikaisemmat ensin)
    if (a.deadline && b.deadline) {
      const deadlineDiff = new Date(a.deadline) - new Date(b.deadline)
      if (deadlineDiff !== 0) return deadlineDiff
    }
    if (a.deadline && !b.deadline) return -1
    if (!a.deadline && b.deadline) return 1
    
    // Lopuksi luomisajan mukaan
    return new Date(a.createdAt) - new Date(b.createdAt)
  })

  // Laske jäljellä olevien tehtävien määrä
  const activeTodosCount = todos.filter(todo => !todo.completed).length

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Tehtävälista</h1>
        <p>Jäljellä: {activeTodosCount} tehtävää</p>
      </header>

      <main className="app-main">
        <AddTodo onAdd={addTodo} />
        
        <div className="filter-buttons">
          <div className="status-filters">
            <h4>Tila:</h4>
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              Kaikki ({todos.length})
            </button>
            <button 
              className={filter === 'active' ? 'active' : ''}
              onClick={() => setFilter('active')}
            >
              Keskeneräiset ({activeTodosCount})
            </button>
            <button 
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              Valmiit ({todos.length - activeTodosCount})
            </button>
          </div>

          <div className="priority-filters">
            <h4>Prioriteetti:</h4>
            <button 
              className={priorityFilter === 'all' ? 'active' : ''}
              onClick={() => setPriorityFilter('all')}
            >
              Kaikki
            </button>
            <button 
              className={priorityFilter === 'high' ? 'active priority-high' : 'priority-high'}
              onClick={() => setPriorityFilter('high')}
            >
              🔴 Korkea
            </button>
            <button 
              className={priorityFilter === 'medium' ? 'active priority-medium' : 'priority-medium'}
              onClick={() => setPriorityFilter('medium')}
            >
              🟡 Normaali
            </button>
            <button 
              className={priorityFilter === 'low' ? 'active priority-low' : 'priority-low'}
              onClick={() => setPriorityFilter('low')}
            >
              🟢 Matala
            </button>
          </div>

          <div className="deadline-filters">
            <h4>Määräpäivä:</h4>
            <button 
              className={deadlineFilter === 'all' ? 'active' : ''}
              onClick={() => setDeadlineFilter('all')}
            >
              Kaikki
            </button>
            <button 
              className={deadlineFilter === 'overdue' ? 'active deadline-overdue' : 'deadline-overdue'}
              onClick={() => setDeadlineFilter('overdue')}
            >
              ⚠️ Myöhässä
            </button>
            <button 
              className={deadlineFilter === 'today' ? 'active deadline-today' : 'deadline-today'}
              onClick={() => setDeadlineFilter('today')}
            >
              📅 Tänään
            </button>
            <button 
              className={deadlineFilter === 'week' ? 'active deadline-week' : 'deadline-week'}
              onClick={() => setDeadlineFilter('week')}
            >
              📆 Tämä viikko
            </button>
          </div>
        </div>

        <TodoList 
          todos={sortedTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onUpdatePriority={updatePriority}
          onUpdateDeadline={updateDeadline}
        />

        {todos.length === 0 && (
          <div className="empty-state">
            <p>Ei tehtäviä vielä. Lisää ensimmäinen tehtävä!</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
