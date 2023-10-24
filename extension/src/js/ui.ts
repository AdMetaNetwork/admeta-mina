import * as U from '@/utils'

export const pushAdCard = (type: 'PICTURE' | 'VIDEO', link: string, imgUrl: string, id: string, address: string) => {
  const ui = document.createElement('div')
  const style = 'position: fixed; width: 300px; height: 170px; top: 80px; right: 80px; background: #18191D; z-index: 9999; border-radius: 20px; overflow: hidden;'
  ui.setAttribute('style', style)

  const img = document.createElement('img');
  img.src = imgUrl
  const imgStyle = 'width: 100%; height: 100%; border-radius: 8px; cursor: pointer;'
  img.setAttribute('style', imgStyle)
  ui.appendChild(img)

  img.addEventListener('click', () => {
    if (type === 'VIDEO') {
      window.open(`${U.C.LINK_HTTP}play?video=${encodeURIComponent(link)}&id=${id}&add=${address}`)
    } else {
      window.open(`${link}`)
    }
    document.body.removeChild(ui)
  })

  

  const play = document.createElement('div')
  const playStyle = `position: absolute; top: 50%; margin-top: -10px; left: 50%; margin-left: -10px; width: 20px; height: 20px; background: url(${U.C.PLAY_ICON}) no-repeat center; background-size: cover; cursor: pointer;`
  play.setAttribute('style', playStyle)
  if (type === 'VIDEO') {
    ui.appendChild(play)
  }

  play.addEventListener('click', () => {
    window.open(`${U.C.LINK_HTTP}play?video=${encodeURIComponent(link)}&id=${id}&add=${address}`)
  })

  const footer = document.createElement('div')
  const footerStyle = 'width: 100%; height: 28px; padding: 0 16px; box-sizing: border-box; display: flex; align-items: center; justify-content: flex-end; position: absolute; bottom: -28px; right: 0; background: rgba(29, 31, 38, 0.60); '
  footer.setAttribute('style', footerStyle)
  ui.appendChild(footer)

  let pow = document.createElement('img')
  pow.src = U.C.POW_IMG
  const powStyle = 'width: 100px; height: 8px;'
  pow.setAttribute('style', powStyle)

  footer.appendChild(pow)

  const close = document.createElement('div')
  const closeStyle = `position: absolute; top: -28px; right: 8px; width: 28px; height: 28px; background: url(${U.C.CLOSE_IMG}) no-repeat center; background-size: cover; cursor: pointer;`

  close.setAttribute('style', closeStyle)
  ui.appendChild(close)

  close.addEventListener('click', () => {
    document.body.removeChild(ui)
  })

  document.body.appendChild(ui);

  ui.addEventListener('mouseover', () => {
    footer.style.transition = 'bottom .5s'
    footer.style.bottom = '0px'
    close.style.transition = 'top .5s'
    close.style.top = '8px'
  })

  ui.addEventListener('mouseleave', () => {
    footer.style.transition = 'bottom .5s'
    footer.style.bottom = '-28px'
    close.style.transition = 'top .5s'
    close.style.top = '-28px'
  })
}