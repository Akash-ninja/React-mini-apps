import { createContext, useContext, useState } from "react"

// 1. Create a context
const CounterContext = createContext()

// 2. Create parent component
function Counter({ children }) {
  const [count, setCount] = useState(0)
  const increase = () => setCount((c) => c + 1)
  const decrease = () => setCount((c) => c - 1)

  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      {children}
    </CounterContext.Provider>
  )
}

// 3. Create child components to help implementing the common task
function Count() {
  const { count } = useContext(CounterContext)
  return <span>{count}</span>
}

function Increase({ icon }) {
  const { increase } = useContext(CounterContext)
  return <button onClick={increase}>{icon}</button>
}

function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext)
  return <button onClick={decrease}>{icon}</button>
}

function Label({ children }) {
  return <span>{children}</span>
}

// 4. Add child components as properties to parent component
Counter.Count = Count
Counter.Increase = Increase
Counter.Decrease = Decrease
Counter.Label = Label

export default Counter
