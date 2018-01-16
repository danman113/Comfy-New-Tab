import React, { Component } from 'react'
import moment from 'moment'
global.moment = moment

const newTime = _ => moment().format('hh:mm:ss')
const newDate = _ => moment().format('dddd, MMMM Do')

export default class Clock extends Component {
  state = {
    time: newTime(),
    date: newDate()
  }
  interval = null

  tick = () => {
    this.setState({
      time: newTime(),
      date: newDate()
    })
  }
  componentWillMount = () => {
    this.interval = setInterval(this.tick, 100)
  }

  render() {
    const { time, date } = this.state
    return (
      <section className='clock'>
        <h2 className='date'>{date}</h2>
        <h1 className='time'>{time}</h1>
      </section>
    )
  }
}
