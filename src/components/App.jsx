import {useState} from 'react'
import SlidingInput from 'components/SlidingInput'
import Input from 'components/Input'
import ResultsTable from 'components/ResultsTable'
import GithubLogo from 'components/GithubLogo'

export default function App() {
  const [homePrice, setHomePrice] = useState(600_000)
  const [downPayment, setDownPayment] = useState(300_000)
  const [interestRate, setInterestRate] = useState(3.375)
  const [taxes, setTaxes] = useState(12_000)
  const [insurance, setInsurance] = useState(1600)
  const [term, setTerm] = useState(30)

  return (
    <div className="df flex-col vh-100">
      <header className="pv24 bg-gold black-80">
        <div className="tc">
          <h1 className="mt0 mb0">Mortgage Calculator</h1>
          <div>By The Qodesmith</div>
        </div>
        <a
          href="https://github.com/qodesmith/mortgage-calculator"
          target="_blank"
          className="dib mra">
          <GithubLogo />
        </a>
      </header>

      <section className="flex-grow-1 fw4 tc pt24">
        <div>
          <SlidingInput
            label="Home Price"
            value={homePrice}
            onChange={setHomePrice}
            step={1000}
            max={1_000_000}
            options={[
              600_000, 700_000, 725_000, 750_000, 775_000, 800_000, 825_000,
              850_000,
            ]}
          />

          <SlidingInput
            label="Down Payment"
            className="ml16"
            value={downPayment}
            onChange={setDownPayment}
            step={10_000}
            max={500_000}
          />

          <SlidingInput
            label="Interest Rate"
            className="ml16"
            value={interestRate}
            onChange={setInterestRate}
            type="number"
            step={0.125}
            max={6}
          />

          <SlidingInput
            label="Annual Taxes"
            className="ml16"
            value={taxes}
            onChange={setTaxes}
            step={250}
            max={20_000}
          />

          <SlidingInput
            label="Insurance"
            className="ml16"
            value={insurance}
            onChange={setInsurance}
            step={100}
            max={3000}
          />
        </div>

        <div className="mt16">
          <div className="dif flex-col">
            <Input
              type="checkbox"
              label="30y"
              checked={term === 30}
              onChange={() => setTerm(30)}
            />
          </div>
          <div className="dif flex-col ml16">
            <Input
              type="checkbox"
              label="15y"
              checked={term === 15}
              onChange={() => setTerm(15)}
            />
          </div>
        </div>

        <div className="df justify-center mt32">
          <ResultsTable
            homePrice={homePrice}
            downPayment={downPayment}
            interestRate={interestRate}
            taxes={taxes}
            insurance={insurance}
            term={term}
          />
        </div>
      </section>
    </div>
  )
}
