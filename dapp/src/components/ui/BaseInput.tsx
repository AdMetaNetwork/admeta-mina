import { FC, ReactNode } from 'react'

type Props = {
  tokenName?: string,
  handleChange?: () => void,
  icon?: ReactNode,
  placeholder?: string,
  state?: 0 | 1 | 2
}

const Input: FC<Props> = ({ tokenName, handleChange, icon, placeholder = '', state }) => {
  return (
    <div
      className={`border border-[4px] border-white hover:border-[#D6BBFB]/10 rounded-[.5rem]`}
    >
      <div className="flex items-center pl-[14px] rounded-[.5rem] w-full border hover:border-[#D6BBFB]">
        <input
          className={`flex-1 h-[2.75rem] focus:outline-0 text-base text-r-regular hover:text-[#101828] ${state === 1 ? 'text-[#101828]' : 'text-[#667085]'}`}
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
        />
        <div className="px-[.875rem] h-[2.75rem] flex justify-center items-center">
          <div className="text-base text-[#101828] text-r-medium">{tokenName}</div>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default Input