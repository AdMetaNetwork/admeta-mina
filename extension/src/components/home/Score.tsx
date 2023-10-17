import { FC, useEffect, useState } from 'react'
import browser from 'webextension-polyfill'

const Score: FC = () => {

  const [score, setScore] = useState<Record<string, any>>({})

  useEffect(() => {
    browser.storage.local.get(['score']).then((v) => {
      setScore(v.score)
      console.log(v.score)
    })
  }, [])

  return (
    <div className='w-full px-2 pb-10'>
      <div className='text-[20px] text-r-medium mb-4'>Your Local Score Dashboard</div>
      {
        Object.keys(score).map((key, index) => (
          <div key={index} className='flex items-center mb-2 px-2'>
            <div className='text-[16px]'>{key}</div>
            <div className='flex-1 mx-10 border-b border-b-theme-color border-b-[4px] border-dashed'></div>
            <div className='text-[16px] text-theme-color'>{score[key]}</div>
          </div>
        ))
      }
    </div>
  )
}

export default Score