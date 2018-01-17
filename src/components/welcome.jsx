import React, { Component } from 'react'
import moment from 'moment'
import Hello from './hello.json'

const getHello = () => {
  return parseInt(Date.now() / 1000 / 60) % Hello.hellos.length
}

export default class Welcome extends Component {
  state = {
    hello: 'Hello'
  }
  setHello = () => {
    this.setState({
      hello: Hello.hellos[getHello()].text
    })
  }
  componentWillMount = () => {
    this.setHello()
    this.interval = setInterval(this.setHello, 1000)
  }
  render() {
    return (
      <h2 className='welcome'>{this.state.hello}, {this.props.name}</h2>
    )
  }

}
