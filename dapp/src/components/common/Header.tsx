import { FC, useMemo } from "react";
import * as U from '@/utils'
import Jazzicon from 'react-jazzicon'
import useLocalStorage from "@/hooks/useLocalStorage";

const Header: FC = () => {
  const [evm_address,] = useLocalStorage<string>('evm_address', '');
  const [mina_address,] = useLocalStorage<string>('mina_address', '');

  const generateAvator = useMemo(() => {
    return evm_address && <Jazzicon diameter={24} seed={Number(evm_address?.substring(0, 5))} />
  }, [evm_address])

  return (
    <div className="w-full flex justify-center fixed top-0 left-0 right-0 z-20 border-b">
      <div className="w-full flex justify-between items-center h-[5rem] px-[6.25rem] bg-white">
        <div className="text-[32px] text-r-bold">ADMETA x MINA</div>
        <div className="flex justify-end items-center">
          <div
            className="flex items-center"
          >
            {generateAvator}
            <div className="text-[18px] text-[#344054] text-r-semi-bold ml-[8px]">EVM: {U.H.formatAddress(evm_address)}</div>
          </div>
          <div className="text-[18px] text-[#344054] text-r-semi-bold ml-[8px]">MINA: {U.H.formatAddress(mina_address)}</div>
        </div>
      </div>

    </div >
  )
}

export default Header