import Base from "@/components/common/Base"
import Button from "@/components/ui/BaseButton"
import { useContext } from 'react'
import BaseCtx from "@/utils/context"

export default function Deploy() {

  const { setEVMAddress, setMinaAddress, EVMAddress, minaAddress } = useContext(BaseCtx)

  return (
    <Base page="deploy">
      <div className="w-full h-[100vh] pt-[6rem]">
        <div className="text-[24px] text-r-medium mb-10">Deploy your mina contract</div>
        <div className="mb-10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-primary-600 flex justify-center items-center rounded-full mr-1">
              <div className="text-[12px] text-white text-r-medium">1</div>
            </div>
            <div>Generate mina deploy address</div>
          </div>
          <Button
            label="Generate"
            handleClick={() => { }}
          />
        </div>

        <div className="mb-10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-primary-600 flex justify-center items-center rounded-full mr-1">
              <div className="text-[12px] text-white text-r-medium">2</div>
            </div>
            <div>Get token from faucet</div>
          </div>
          <Button
            label="Go Faucet"
            handleClick={() => { }}
          />
        </div>

        <div className="mb-10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-primary-600 flex justify-center items-center rounded-full mr-1">
              <div className="text-[12px] text-white text-r-medium">3</div>
            </div>
            <div>Check address balance</div>
          </div>
          <Button
            label="Check"
            handleClick={() => { }}
          />
        </div>

        <div className="mb-10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-primary-600 flex justify-center items-center rounded-full mr-1">
              <div className="text-[12px] text-white text-r-medium">4</div>
            </div>
            <div>Deploy mina contract</div>
          </div>
          <Button
            label="Deploy"
            disable
            handleClick={() => { }}
          />
        </div>

      </div>
    </Base>
  )
}
