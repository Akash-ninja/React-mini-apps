import React from "react"
import Counter from "./Counter"

function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>

      {/* <Counter
        iconIncrease='+'
        iconDecrease='-'
        label='My NOT so flexible counter'
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
      /> */}

      <Counter>
        <Counter.Label>My super flexible counter</Counter.Label>
        <Counter.Increase icon='+' />
        <Counter.Count />
        <Counter.Decrease icon='-' />
      </Counter>
    </div>
  )
}

export default App
