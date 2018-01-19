import React, { Component } from 'react'
import GlassPanel from './glasspanel'
import cn from 'classnames'

export class Popover extends Component {
  render () {
    const {
      wallpaper,
      children,
      visible = true
    } = this.props

    return (
      <GlassPanel
        wallpaper={wallpaper}
        className={cn('popover', visible ? 'opacity-show' : 'opacity-hide')}
        frosted>
        <div className='arrow-up' />
        { children }
      </GlassPanel>
    )
  }
}
