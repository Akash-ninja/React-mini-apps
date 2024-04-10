import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload
    },

    withdraw(state, action) {
      state.balance -= action.payload
    },

    requestLoan: {
      // method to accept multiple arguments from dispatched actions
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        }
      },

      reducer(state, action) {
        if (state.loan > 0) return

        state.balance += action.payload.amount
        state.loan = action.payload.amount
        state.loanPurpose = action.payload.purpose
      },
    },

    payLoan(state, action) {
      state.balance -= state.loan
      state.loanPurpose = ''
      state.loan = 0
    },
  },
})

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions

export default accountSlice.reducer
