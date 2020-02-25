import React from 'react'

class NumberInput extends React.Component {
    render() {
      const { name, value, saveToState } = this.props
      
      return (
        <div className="form-group">
          <label for={name}>{name.titleCase()}</label>
          <input
            type="number"
            name={name}
            className="form-control"
            value={value}
            onChange={saveToState}
          />
        </div>
      )
    }
  }

  export default NumberInput
  