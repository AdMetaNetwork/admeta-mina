import Base from "@/components/common/Base"
import Button from "@/components/ui/BaseButton"
import { useContext, useEffect } from 'react'
import BaseCtx from "@/utils/context"
import * as U from '@/utils'

export default function SyncData() {

  const { setEVMAddress, setMinaAddress, EVMAddress, minaAddress } = useContext(BaseCtx)

  return (
    <Base page="zk proof">
      <div className="w-full h-[100vh] pt-[6rem]">
        <div className="text-[24px] text-r-medium mb-10">Generate ZK Proof From Your Local Data</div>
        <div className="mb-10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-primary-600 flex justify-center items-center rounded-full mr-1">
              <div className="text-[12px] text-white text-r-medium">1</div>
            </div>
            <div>Load proof data from extension</div>
          </div>
          <Button
            label="Load Data"
            handleClick={() => { 
              U.Messager.sendMessageToContent(U.C.ADMETA_MSG_SYNC_DATA, { msg: 'load data' })
              window.addEventListener("message", function (msg) {
                if (msg.data.type === U.C.ADMETA_MSG_SYNC_DATA_BACK) {
                  console.log('bnasks--->>>', msg)
                }
              })
            }}
          />
        </div>
        
        <div className="mb-10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-primary-600 flex justify-center items-center rounded-full mr-1">
              <div className="text-[12px] text-white text-r-medium">2</div>
            </div>
            <div>Generate your zk proof</div>
          </div>
          <Button
            label="Generate"
            handleClick={() => { }}
          />
        </div>

        <div className="mb-10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-primary-600 flex justify-center items-center rounded-full mr-1">
              <div className="text-[12px] text-white text-r-medium">3</div>
            </div>
            <div>Upload updated scores to the Mina blockchain</div>
          </div>
          <Button
            label="Update"
            handleClick={() => { }}
          />
        </div>
      </div>
    </Base>
  )
}
