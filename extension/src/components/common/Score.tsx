import { FC } from 'react'

const Score: FC = () => {
  return (
    <div className='w-full px-2 pb-10'>
      <div className='text-[20px] text-r-medium mb-4'>Your Local Score Dashboard</div>
      <div className='flex items-center mb-2'>
        <div className='text-[16px]'>DeFi</div>
        <div className='flex-1 mx-10 border-b border-b-theme-color border-b-[4px] border-dashed'></div>
        <div className='text-[16px] text-theme-color'>800</div>
      </div>
      <div className='flex items-center mb-2'>
        <div className='text-[16px]'>DeFi</div>
        <div className='flex-1 mx-10 border-b border-b-theme-color border-b-[4px] border-dashed'></div>
        <div className='text-[16px] text-theme-color'>800</div>
      </div>
    </div>
  )
}

export default Score