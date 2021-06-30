export default function ResultsTable({
  homePrice,
  downPayment,
  interestRate,
  taxes,
  insurance,
  term,
}) {
  const numOfPayments = term * 12
  const loanAmount = homePrice - downPayment
  const monthlyTaxAmount = Math.round(taxes / 12)
  const monthlyInsurance = Math.round(insurance / 12)
  const monthlyInterestRate = interestRate / 12
  const mortgagePayment =
    loanAmount *
    ((monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numOfPayments) - 1))

  const monthlyPayment = mortgagePayment + monthlyTaxAmount + monthlyInsurance

  return <div>{monthlyPayment}</div>
}
