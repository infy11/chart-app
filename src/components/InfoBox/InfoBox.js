import React from 'react'

class InfoBox extends React.Component {
    render() {
      return (
        <div className={`alert alert-${this.props.type}`}>
          {this.props.msg}
        </div>
      )
    }
  }

  
  export default InfoBox