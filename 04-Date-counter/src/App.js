import { useState } from 'react'
import './App.css'

export default function App() {
  return (
    <div className='App'>
      {/* <Counter /> */}
      <CounterVersion2 />
    </div>
  )
}

function Counter() {
  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)

  const result = new Date('june 21 2027')
  result.setDate(result.getDate() + count)

  return (
    <div>
      <div>
        <button onClick={() => setStep((s) => s - 1)}>-</button>
        <span>Step: {step}</span>
        <button onClick={() => setStep((s) => s + 1)}>+</button>
      </div>

      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <span>Count: {count}</span>
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? 'Today is '
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago today is `}
        </span>
        <span>{result.toDateString()}</span>
      </p>
    </div>
  )
}

function CounterVersion2() {
  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)

  const result = new Date()
  result.setDate(result.getDate() + count)

  const handleReset = () => {
    setStep(1)
    setCount(0)
  }

  return (
    <div>
      <div>
        <input
          type='range'
          min='1'
          max='10'
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span> {step}</span>
      </div>

      <br></br>
      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <input
          type='number'
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? 'Today is '
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago today is `}
        </span>
        <span>{result.toDateString()}</span>
      </p>

      {count !== 0 || step !== 1 ? (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : null}
    </div>
  )
}
