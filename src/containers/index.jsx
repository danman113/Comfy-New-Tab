import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Clock from '../components/clock'
import Welcome from '../components/welcome'
import { WatcherWidget } from '../components/cryptowatcher'

class Tab extends Component {
  state = {
    name: 'Daniel',
    wallpaperUrls: [
      'https://source.unsplash.com/1920x1080/daily?nature,water,architecture'
    ],
    selectedWallpaper: 0,
    cryptos: ['BTC', 'ETH', 'LTC']
  }
  interval = null
  cycleWalpaper = () => {
    const {
      selectedWallpaper,
      wallpaperUrls
    } = this.state

    this.setState({
      selectedWallpaper: (this.getWallpaper()) % wallpaperUrls.length
    })
  }
  addCryptos = (crypto) => {
    this.setState({
      cryptos: this.state.cryptos.concat(crypto)
    })
  }

  getWallpaper = () => {
    // Every Day
    // return parseInt(Date.now() / 1000 / 60 / 60 / 24)
    // Every Hour
    // return parseInt(Date.now() / 1000 / 60 / 60)
    // Every Minute
    return parseInt(Date.now() / 1000 / 60)
  }

  preloadImages = () => {
    const wallPapers = this.state.wallpaperUrls.map(img => {
      let image = new Image()
      image.src = img
      return image
    })
  }

  componentWillMount = () => {
    this.preloadImages()
    this.cycleWalpaper()
    this.interval = setInterval(this.cycleWalpaper, 1000)
  }

  render() {
    let wallpaper = this.state.wallpaperUrls[this.state.selectedWallpaper]
    const {
      cryptos
    } = this.state
    return (
      <section className='background container' style={{backgroundImage: `url(${wallpaper})`}}>
        <Clock />
        <Welcome name={this.state.name} wallpaper={wallpaper} />
        <WatcherWidget wallpaper={wallpaper} cryptos={cryptos} addCrypto={this.addCryptos}/>
      </section>
    )
  }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<Tab />, mountNode);
