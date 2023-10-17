import { FC } from 'react'
import Button from '../ui/BaseButton'
import * as U from '@/utils'
import browser from 'webextension-polyfill'

type Props = {
  handleAgree: () => void
}

const Index: FC<Props> = ({ handleAgree }) => {

  return (
    <div className='w-full pt-[100px] flex flex-col items-center justify-center px-4'>
      <div className='text-[24px] text-r-bold mb-2'>ADMETA x MINA</div>
      <div className='text-[16px] text-r-medium mb-2'>AdMeta emphasizes user privacy, seamlessly integrating Mina's discreet user tagging with EVM's ad publishing, and rewards engagement while maintaining data integrity across platforms.</div>
      <div className='text-[12px] text-primary-600 text-r-medium mb-2'>* We locally analyze the following whitelist browsing information, solely for local zk-proof computations.</div>
      <div className='w-full bg-gray-100 flex flex-col p-2 h-[100px] overflow-y-auto mb-10'>
        {
          U.W.default.products.map((item, index) => (
            <div key={index} className='mb-1 flex items-center'>
              <div className='flex items-center mr-2'>
                {
                  item.category.map((i, k) => (
                    <div key={k} className='px-[4px] py-[2px] rounded bg-black text-white text-[12px] mr-1'>{i}</div>
                  ))
                }

              </div>
              <div className='text-[14px]'>{item.domain}</div>
            </div>
          ))
        }
      </div>
      <Button
        label='Agree and start from today!'
        handleClick={() => {
          browser.storage.local.set({ agree: 1 })
          handleAgree()
        }}
      />
    </div>
  )
}

export default Index