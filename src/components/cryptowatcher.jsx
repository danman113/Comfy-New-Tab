import React, { Component } from 'react'
import cn from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import GlassPanel from './glasspanel'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import 'es6-promise'
import 'isomorphic-fetch'

export default class CryptoWatcher extends Component {
  state = {
    price: 0,
    min: 0,
    max: 0,
    data: []
  }

  interval = null
  getData = (symbol = 'ETH', value = 'USD', days = 7) => {
    fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=${symbol}&tsym=${value}&limit=${days * 24}&aggregate=1`)
    .then(res => res.json())
    .then(chart => {
      const data = chart.Data
      const min = Math.min(...data.map(e => e.close))
      const max = Math.max(...data.map(e => e.close))
      this.setState({
        data: data,
        min: min,
        max: max,
        price: data[data.length - 1].close
      })
    })
  }

  componentWillMount = () => {
    this.getData(this.props.symbol)
    this.interval = setInterval(_ => {
      this.getData(this.props.symbol)
    }, 1000 * 5)
  }

  render() {
    const {
      wallpaper
    } = this.props

    const {
      data
    } = this.state

    return (
      <GlassPanel wallpaper={wallpaper} className={cn('crypto-panel', this.props.className)} frosted>
        <h2>{this.props.symbol} ${this.state.price}</h2>
          <AreaChart
              data={data}
              width={200}
              height={200}
              style={{margin: 'auto'}}
            >
            <YAxis dataKey='close' domain={['dataMin', 'dataMax']} hide />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='close'
            />
          </AreaChart>
      </GlassPanel>
    )
  }
}

export const WatcherWidget = ({
  cryptos = ['BTC', 'ETH', 'LTC'],
  wallpaper,
}) => (
  <div className='watcher-widget'>
    <TransitionGroup>
      {
        cryptos.map((sym, i) => (
          <CSSTransition
            timeout={5000}
            key={i}
            classNames="fade"
          >
            <CryptoWatcher symbol={sym} key={i} wallpaper={wallpaper} />
          </CSSTransition>
        ))
      }
    </TransitionGroup>
  </div>
)
