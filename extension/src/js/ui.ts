import * as U from '@/utils'

export const pushAdCard = (type: 'PICTURE' | 'VIDEO', link: string, imgUrl: string, id: string, address: string, tag: number) => {
  const ui = document.createElement('div')
  const style = 'position: fixed; width: 300px; height: 170px; top: 80px; right: 80px; background: #18191D; z-index: 9999; border-radius: 20px; overflow: hidden;'
  ui.setAttribute('style', style)

  const img = document.createElement('img');
  img.src = tag === 5 ? 'https://storage.fleek-internal.com/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/idhub.png' : imgUrl
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

export const completeLitBtn = () => {
  const address = U.H.getUrlParameter('address');
  const platform = U.H.getUrlParameter('platform');

  const createUI = () => {
    const ui = document.createElement('div');
    ui.id = 'complete_btn_admeta';
    ui.style.cssText = 'position: fixed; padding: 0 10px; height: 50px; bottom: 80px; right: 80px; background: #15b887; z-index: 9999; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; cursor: pointer;';

    const label = document.createElement('div');
    label.style.cssText = 'color: #ffffff; font-size: 18px; font-weight: 600;';
    label.textContent = 'Complete Litentry Task Power By AdMeta';

    ui.appendChild(label);

    const handleClick = () => {
      document.body.removeChild(ui);
      U.H.apiCall({
        URI: 'admeta/overwriteCompletedRecord',
        full_url: false,
        method: 'POST',
        params: {
          address,
          platform,
        },
      });
    };

    ui.addEventListener('click', handleClick);

    return ui;
  };

  const ui = createUI();

  const handleScroll = () => {
    if ((window.innerHeight + Math.round(window.scrollY)) < document.body.offsetHeight) {
      const element = document.getElementById('complete_btn_admeta');
      if (!element) return;
      document.body.removeChild(ui);
    } else if (!document.getElementById('complete_btn_admeta')) {
      document.body.appendChild(ui);
    }
  };

  const scrollHandler = () => {
    handleScroll();
  };

  let animationFrameId: any = null;

  const optimizedScrollHandler = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(handleScroll);
  };

  window.addEventListener('scroll', optimizedScrollHandler);

  scrollHandler();
};


export const completeWeb3GoBtn = () => {
  const address = U.H.getUrlParameter('address');
  const platform = U.H.getUrlParameter('platform');

  const createUI = () => {
    const ui = document.createElement('div');
    ui.id = 'complete_btn_admeta';
    ui.style.cssText = 'position: fixed; padding: 0 10px; height: 50px; bottom: 80px; right: 80px; background: #E9EDEA; z-index: 9999; border-radius: 0.6rem; overflow: hidden; display: flex; align-items: center; justify-content: center; cursor: pointer;';

    const label = document.createElement('div');
    label.style.cssText = 'color: #213323; font-size: 1.4rem; font-weight: 400;';
    label.textContent = 'Complete Web3Go Task Power By AdMeta';

    ui.appendChild(label);

    const handleClick = () => {
      document.body.removeChild(ui);
      U.H.apiCall({
        URI: 'admeta/overwriteCompletedRecord',
        full_url: false,
        method: 'POST',
        params: {
          address,
          platform,
        },
      });
    };
    ui.addEventListener('click', handleClick);

    return ui;
  };

  const ui = createUI();

  const timer = setTimeout(() => {
    document.body.appendChild(ui);
    clearTimeout(timer)
  }, 5 * 1000)
};
