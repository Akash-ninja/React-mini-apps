import { useState } from 'react'
import Button from './Button'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

export default function AppV2() {
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(true)

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1)
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1)
  }

  return (
    <>
      <button className='close' onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>

      {isOpen && (
        <div className='steps'>
          <div className='numbers'>
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>

          {/* <p className='message'>
            Step {step}: {messages[step - 1]}
          </p> */}

          {/* Demonstration of how to use children for component reusability */}
          <StepMessage step={step}>
            {messages[step - 1]}
            <div className='buttons'>
              <Button
                bgColor='#e7e7e7'
                textColor='#333'
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
              >
                Learn How
              </Button>
            </div>
          </StepMessage>

          <div className='buttons'>
            <Button
              textColor='#fff'
              bgColor='#7950f2'
              onClick={handlePrevious}
              text='Previous'
            >
              <span>👈</span> Previous
            </Button>
            <Button
              textColor='#fff'
              bgColor='#7950f2'
              onClick={handleNext}
              text='Next'
            >
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

function StepMessage({ step, children }) {
  return (
    <div className='message'>
      <h3>Step {step}: </h3>
      {children}
    </div>
  )
}
