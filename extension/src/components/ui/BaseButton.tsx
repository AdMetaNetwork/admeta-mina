import { FC, ReactNode } from 'react'

type Props = {
  label: string,
  handleClick: () => void,
  h?: string,
  px?: string,
  borderColor?: string,
  color?: string,
  fSize?: string,
  bg?: string,
  icon?: ReactNode,
  disable?: boolean
}

const Button: FC<Props> = ({ label, handleClick, h = 'h-[3rem]', px = 'px-[1.25rem]', borderColor = 'border-[primary-600]', color = 'text-white', fSize = 'text-[1.25rem]', bg = 'bg-primary-600', icon, disable = false }) => {
  return (
    <div
      className={`inline-flex ${h} ${bg} ${px} rounded-[.5rem] cursor-pointer items-center hover:opacity-80 border ${borderColor} box-border ${disable ? 'bg-gray-500 border-0 cursor-not-allowed' : bg}`}
      onClick={disable ? () => { } : handleClick}
    >
      <div className={`${color} ${fSize} text-r-semi-bold`}>{label}</div>
      {icon && <div className='w-[.5rem]'></div>}
      {icon}
    </div>
  )
}

export default Button