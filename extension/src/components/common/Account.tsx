import { FC, useEffect, useState } from 'react'
import Jazzicon from 'react-jazzicon/dist/Jazzicon'
import * as U from '@/utils'
import browser from 'webextension-polyfill'
import Button from '../ui/BaseButton'

const Account: FC = () => {

  const [EVMAddress, setEVMAddress] = useState('')
  const [minaAddress, setMinaAddress] = useState('')

  useEffect(() => {
    browser.storage.local.get(['EVMAddress', 'minaAddress']).then(({ EVMAddress, minaAddress }) => {
      setEVMAddress(EVMAddress)
      setMinaAddress(minaAddress)
    })
  }, [])

  return (
    <>
      {
        EVMAddress
          ?
          <div className='flex px-2 items-center mt-4 mb-10'>
            <Jazzicon diameter={32} seed={Number(10)} />
            <div className='ml-4'>
              <div className='text-[14px] text-r-medium'>EVM: {U.H.formatAddress(EVMAddress)}</div>
              <div className='text-[14px] text-r-medium'>MINA: {U.H.formatAddress(minaAddress)}</div>
            </div>
          </div>
          :
          <div className='px-2'>
            <Button
              label='Go web connect wallet'
              handleClick={() => { U.H.goOrigin() }}
            />
          </div>
      }
    </>

  )
}

export default Account