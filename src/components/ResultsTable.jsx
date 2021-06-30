import {cn} from 'helpers'

export default function ResultsTable({
  homePrice,
  downPayment,
  interestRate,
  taxes,
  insurance,
  term,
}) {
  const adjustments = [-50_000, -25_000, 0, 25_000, 50_000]
  const monthlyPayments = adjustments.map(adjustment => {
    const price = homePrice + adjustment
    return getMonthlyPayment({
      term,
      homePrice: price,
      downPayment,
      taxes,
      insurance,
      interestRate,
    })
  })

  return (
    <table>
      <thead>
        <th>Home Price</th>
        <th>Monthly Payment</th>
      </thead>
      <tbody>
        {monthlyPayments.map((payment, i) => {
          const adjustment = adjustments[i]
          const price = homePrice + adjustment

          return (
            <tr key={i} className={cn({b: adjustment === 0})}>
              <td>{price}</td>
              <td>{payment}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function getMonthlyPayment({
  term,
  homePrice,
  downPayment,
  taxes,
  insurance,
  interestRate,
}) {
  const numOfPayments = term * 12
  const loanAmount = homePrice - downPayment
  const monthlyTaxAmount = Math.round(taxes / 12)
  const monthlyInsurance = Math.round(insurance / 12)
  const monthlyInterestRate = interestRate / 100 / 12
  const mortgagePayment =
    loanAmount *
    ((monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numOfPayments) - 1))

  return Math.round(mortgagePayment + monthlyTaxAmount + monthlyInsurance)
}
