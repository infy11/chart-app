import NumberInput from '../NumberInput/NumberInput'
import InfoBox from '../InfoBox/InfoBox'
import React from 'react';
import  zingchart from 'zingchart';


Array.eq = (a, b) => JSON.stringify(a) === JSON.stringify(b)

String.prototype.titleCase = function() {
  return this.toLowerCase().replace('_', ' ').split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase())
  }).join(' ')
}

class Calculator extends React.Component {
    constructor(props) {
      super(props)

      const defaultState = {
        future_value: 0,
        annual_retirement_income: 0,
        on_track: true,
        years_data: [],
      }
      
      this.state = {...defaultState, ...this.props}
    }
  
    componentWillMount() {
      this.calculate()
    }
  
    componentDidMount() {
      this.renderChart()
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      let dirty = false
      let changed = []
  
      for (let item in this.state) {
        if (Array.isArray(nextState[item])) {
          if (Array.eq(nextState[item], this.state[item])) continue
          changed.push(item)
          dirty = true
        } else {
          if (nextState[item] === this.state[item]) continue
          changed.push(item)
          dirty = true
        }
      }
  
      return dirty
    }
  
    componentDidUpdate() {
      this.calculate()
      this.renderChart()
    }
  
    render() {
      const { future_value, annual_retirement_income } = this.state
  
      return (
        <div className="row">
          <div className="calc-form col-md-6">
  
            {Object.keys(this.props).map( name => {
              return(
                <NumberInput
                  name={name}
                  value={this.state[name]}
                  saveToState={this.saveToState.bind(this)}
                />
              )
            })}
          </div>
  
          <div className="col-md-6">
            <div id="myChart" className="chart" />
            <InfoBox msg={`Total Retirement Savings: ${this.toUsd(future_value)}`} type="info" />
            <InfoBox
              msg={`Annual Retirement Income: ${this.toUsd(annual_retirement_income)}`}
              type={this.state.on_track ? "success" : "danger"}
            />
          </div>
  
        </div>
      )
    }
  
    renderChart() {
      const labels = this.getChartLabels()
      const config = {
        id: "myChart",
        data: {
          "scale-x": { labels },
          type: "area",
          title: { text: "Piggy Bank" },
          series: [{ values: this.state.years_data }]
        }
      }
      zingchart.render(config)
    }
    
    getChartLabels() {
      const years = Array.from(new Array(this.getYearsUntilRetirement()))
      return years.map( (_, i) => i + this.state.current_age + 1 )
    }
    
    getYearsUntilRetirement() {
      const { current_age, retirement_age } = this.state
      return retirement_age - current_age

    }
  
    saveToState(e) {
      const { name, value } = e.target
      this.setState({ [name]: value })
    }
  
    calculate() {
      const { years_after_retirement, desired_retirement_income } = this.state
      const { future_value, years_data } = this.futureValue()
      const annual_retirement_income = future_value / years_after_retirement
      const on_track = annual_retirement_income > desired_retirement_income ? true : false
  
      this.setState({
        years_data,
        future_value: this.toUsd(future_value),
        annual_retirement_income: this.toUsd(annual_retirement_income),
        on_track,
      })
    }
  
    futureValue() {
      const {
        current_age,
        retirement_age,
        annual_deposit,
        interest_rate,
        current_savings,
      } = this.state
      
      const int = interest_rate / 100
      const years_data = []
      const years_until_retirement = Array.from(new Array(this.getYearsUntilRetirement()))
      const future_value = years_until_retirement.reduce( sum => {
        const last_year_plus_annual_deposit = sum + annual_deposit
        const interest_earned = last_year_plus_annual_deposit * int
        const new_sum = parseFloat((last_year_plus_annual_deposit + interest_earned).toFixed(2))
        
        years_data.push(new_sum)
        return new_sum
      }, current_savings)
      
      return { future_value, years_data }
    }
  
    toUsd(number) {
      return number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })
    }
  }

  export default Calculator
  