// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState, useEffect } from 'react'

export default function App() {
  const [currencyAmt, setCurrencyAmt] = useState(1)
  const [fromCur, setFromCur] = useState('USD')
  const [toCur, setToCur] = useState('INR')
  const [converted, setConverted] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(
    function () {
      async function getCurrencyValue() {
        setIsLoading(true)
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${currencyAmt}&from=${fromCur}&to=${toCur}`
        )
        const data = await res.json()
        setConverted(data.rates[toCur])
        setIsLoading(false)
      }

      if (fromCur === toCur) return setConverted(currencyAmt)

      getCurrencyValue()
    },
    [currencyAmt, fromCur, toCur]
  )

  return (
    <div>
      <input
        type='text'
        value={currencyAmt}
        onChange={(e) => setCurrencyAmt(e.target.value)}
        disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <p>
        {converted} {toCur}
      </p>
    </div>
  )
}
