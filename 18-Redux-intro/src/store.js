import { createStore } from 'redux'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload }

    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload }

    case 'account/requestLoan':
      if (state.loan > 0) return state
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      }

    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      }

    default:
      return state
  }
}

const store = createStore(reducer)

store.dispatch({ type: 'account/deposit', payload: 100 })
store.dispatch({ type: 'account/withdraw', payload: 50 })
console.log(store.getState())

store.dispatch({
  type: 'account/requestLoan',
  payload: { amount: 1000, purpose: 'Buy a car' },
})
console.log(store.getState())
