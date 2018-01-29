import React, { Component } from 'react'
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
    fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=${symbol}&tsym=${value}&limit=${days * 24}&aggregate=1&e=Coinbase`)
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
      <GlassPanel wallpaper={wallpaper} className='crypto-panel' frosted>
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
    {
      cryptos.map((sym, i) => (
        <CryptoWatcher symbol={sym} key={i} wallpaper={wallpaper} />
      ))
    }
  </div>
)
