import { useState } from 'react'

export default function App() {
  return (
    <div className='App'>
      <TipCalculator />
    </div>
  )
}

function TipCalculator() {
  const [bill, setBill] = useState('')
  const [percentage1, setPercentage1] = useState(0)
  const [percentage2, setPercentage2] = useState(0)

  const tip = bill * ((percentage1 + percentage2) / 2 / 100)

  function handleReset() {
    setBill('')
    setPercentage1('')
    setPercentage2('')
  }

  return (
    <>
      <BillInput bill={bill} onSetBill={setBill} />

      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        <span>How did you like the service?</span>
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        <span>How did your friend like the service?</span>
      </SelectPercentage>

      <br></br>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </>
  )
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type='text'
        value={bill}
        onChange={(e) => onSetBill(+e.target.value)}
        placeholder='Bill value'
      />
    </div>
  )
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      {children}{' '}
      <select value={percentage} onChange={(e) => onSelect(+e.target.value)}>
        <option value='0'>Dissatisfied (0%)</option>
        <option value='5'>It was okay (5%)</option>
        <option value='10'>It was good (10%)</option>
        <option value='20'>Absolutely amazing! (20%)</option>
      </select>
    </div>
  )
}

function Output({ bill, tip }) {
  return (
    <h3>
      You pay ₹{bill + tip} (₹{bill} + ₹{tip})
    </h3>
  )
}

function Reset({ onReset }) {
  return (
    <div>
      <button onClick={onReset}>Reset</button>
    </div>
  )
}
