import { FC, useMemo } from 'react'
import Jazzicon from 'react-jazzicon/dist/Jazzicon'
import * as U from '@/utils'

const Account: FC = () => {

  // const generateAvator = useMemo(() => {
  //   return evm_address && <Jazzicon diameter={24} seed={Number(evm_address?.substring(0, 5))} />
  // }, [evm_address])

  return (
    <div className='flex px-2 items-center mt-4 mb-10'>
      <Jazzicon diameter={32} seed={Number(10)} />
      <div className='ml-4'>
        <div className='text-[14px] text-r-medium'>EVM: {U.H.formatAddress('0x8899B50613AB56F4D21ff5407d3f16AdF5fce884')}</div>
        <div className='text-[14px] text-r-medium'>MINA: {U.H.formatAddress('B62qoVbkafwAuAVBCVMfbK4jngFUL5SBpvqUGj3kkB7eZ8touVo95hc')}</div>
      </div>
    </div>
  )
}

export default Account