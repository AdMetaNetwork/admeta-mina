import { useEffect, useState } from 'react';
import Home from '@/components/home'
import Start from '@/components/start'
import browser from 'webextension-polyfill';

export default function () {
  const [agree, setAgree] = useState(0)

  useEffect(() => {
    browser.storage.local.get(['agree']).then(({ agree }) => {
      setAgree(agree)
    });
  }, []);

  return (
    <div>
      {
        agree === 0
          ?
          <Start handleAgree={() => setAgree(1)} />
          :
          <Home />
      }
    </div>
  )
}
