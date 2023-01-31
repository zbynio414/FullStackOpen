import { useState } from 'react'

const Display = props => <h1>{props.value} </h1>

const Button = props => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Statistics = ({good,neutral,bad}) => {
  const all=good+neutral+bad

  return (
  <table>
    <tbody>
      <tr><td>good</td><td>{good}</td></tr>
      <tr><td>neutral</td><td>{neutral}</td></tr>
      <tr><td>bad</td><td>{bad}</td></tr>
      <tr><td>average</td><td>{((good-bad)/all).toFixed(1)}</td></tr>
      <tr><td>positive</td><td>{(good/all*100).toFixed(1)}%</td></tr>
    </tbody>
  </table>
)
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  } 

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  } 
  const handleBadClick = () => {
    setBad(bad + 1)
  } 

  return (
    <div>
      <br/>
      <Display value='give feedback' />
      <br/>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <br/> 
      <Display value='Statistics' />
      <br/>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App