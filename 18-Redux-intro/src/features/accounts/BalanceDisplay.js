import { connect } from 'react-redux'

function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

function BalanceDisplay({ balance }) {
  return <div className='balance'>{formatCurrency(balance)}</div>
}

function mapStateToProps(state) {
  return {
    //name of the prop that are comp. receives
    balance: state.account.balance,
  }
}

export default connect(mapStateToProps)(BalanceDisplay)
