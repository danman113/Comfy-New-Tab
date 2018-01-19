import React, { Component } from 'react'
import moment from 'moment'
import Hello from './hello.json'
import { Popover } from './popover'

const getHello = () => {
  return parseInt(Date.now() / 1000 / 60) % Hello.hellos.length
}

export default class Welcome extends Component {
  state = {
    hello: 'Hello',
    showPopover: false
  }
  setHello = () => {
    this.setState({
      hello: Hello.hellos[getHello()]
    })
  }
  componentWillMount = () => {
    this.setHello()
    this.interval = setInterval(this.setHello, 1000)
  }

  showPopover = () => {
    this.setState({
      showPopover: true
    })
  }

  hidePopover = () => {
    this.setState({
      showPopover: false
    })
  }

  render() {
    const {
      hello,
      showPopover
    } = this.state

    return (
      <div>
        <h2 className='welcome'>
          <span className='popover-button' >
            <a onMouseEnter={this.showPopover} onMouseLeave={this.hidePopover}>
              {hello.text}
              {', '} {this.props.name}
            </a>
            <Popover wallpaper={this.props.wallpaper} visible={showPopover}>
              <span className='language-popover'>{hello.pronunciation} ({ hello.lang })</span>
            </Popover>
          </span>
        </h2>
      </div>
    )
  }

}
