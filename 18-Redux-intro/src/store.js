import { createStore, combineReducers } from 'redux'

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
}

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
}

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      }

    case 'customer/updateCustomer':
      return {
        ...state,
        fullName: action.payload,
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

const store = createStore(rootReducer)

/* store.dispatch({ type: 'account/deposit', payload: 100 })
store.dispatch({ type: 'account/withdraw', payload: 50 })
console.log(store.getState())

store.dispatch({
  type: 'account/requestLoan',
  payload: { amount: 1000, purpose: 'Buy a car' },
})
console.log(store.getState()) */

function deposit(amount) {
  return { type: 'account/deposit', payload: amount }
}

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount }
}

function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  }
}

function payLoan() {
  return { type: 'account/payLoan' }
}

store.dispatch(deposit(500))
store.dispatch(withdraw(100))
console.log(store.getState())

store.dispatch(requestLoan(100))
console.log(store.getState())

store.dispatch(payLoan(100))
console.log(store.getState())

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  }
}

function updateCustomer(fullName) {
  return {
    type: 'customer/updateCustomer',
    payload: fullName,
  }
}

store.dispatch(createCustomer('Akash Keshri', '20901939'))
console.log(store.getState())
store.dispatch(updateCustomer('Akash Keshari'))
console.log(store.getState())
