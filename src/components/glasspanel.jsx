import React, { Component } from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

const grad = 'linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), '

export default class GlassPanel extends Component {
  static propTypes = {
    wallpaper: PropTypes.string.isRequired,
    frosted: PropTypes.bool,
    className: PropTypes.string
  }

  render() {
    const {
      wallpaper,
      frosted,
      children,
      className
    } = this.props

    return (
      <div className={cn('box', className)}>
        <div
          style={{backgroundImage: `${frosted ? grad: ''} url(${this.props.wallpaper})`}}
          className='blur'>
        </div>
        <div className='box-content'>
          { children }
        </div>
      </div>
    )
  }
}
