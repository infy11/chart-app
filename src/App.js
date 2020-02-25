import React from 'react';
import Calculator from './components/Calculator/Calculator'
import NumberInput from './components/NumberInput/NumberInput'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const initial_data = {
    current_age: 25,
    retirement_age: 68,
    current_savings: 1000,
    annual_deposit: 6000,
    interest_rate: 8,
    years_after_retirement: 20,
    desired_retirement_income: 100000,
  }

  return (
    <div class="container">
      <div class="page-header">
        <h1>Retirement Calculator</h1>
        <p>Disclaimer: I'm no finance math genius, so don't take these numbers to the bank.</p>
      </div>
      <div id="calculator">
        {/* <NumberInput /> */}
         <Calculator 
            {...initial_data}
          />
      </div>
   </div>
  );
}

export default App;
