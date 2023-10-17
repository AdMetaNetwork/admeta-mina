import Base from "@/components/common/Base"
import Button from "@/components/ui/BaseButton"
import { useContext, useEffect } from 'react'
import BaseCtx from "@/utils/context"
import { useModal, ConnectKitButton } from 'connectkit';
import { useAccount, useNetwork } from "wagmi";
import { sepolia } from 'wagmi/chains'
import { useRouter } from "next/router";
import * as U from '@/utils'

export default function Home() {

  const { setEVMAddress, setMinaAddress, EVMAddress, minaAddress } = useContext(BaseCtx)

  const { address } = useAccount()
  const network = useNetwork()
  const { setOpen } = useModal()

  const router = useRouter()

  useEffect(() => {
    if (address) {
      setEVMAddress!(address)
      localStorage.setItem('evm_address', address)
    }
  }, [address, setEVMAddress])

  useEffect(() => {
    if (network.chain?.id === sepolia.id) {
      setOpen(false)
    }
  }, [network.chain?.id, setOpen])

  const connectMina = async () => {
    if (typeof window !== 'undefined') {
      const allAccounts = await (window as any).mina.requestAccounts()
      setMinaAddress!(allAccounts[0])
      localStorage.setItem('mina_address', allAccounts[0])
    }
  }

  return (
    <Base
      header={false}
      sideNav={false}
      page="connect"
    >
      <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        <div className="text-[64px] text-r-bold mb-10">ADMETA x MINA</div>
        <div className="text-[32px] text-r-medium mb-[200px] w-[50%]">AdMeta emphasizes user privacy, seamlessly integrating Mina&apos;s discreet user tagging with EVM&apos;s ad publishing, and rewards engagement while maintaining data integrity across platforms.</div>
        <div className="mb-4">
          <div className="text-[24px]">EVM: {EVMAddress}</div>
          <div className="text-[24px]">MINA: {minaAddress}</div>
        </div>
        {
          EVMAddress && minaAddress
            ?
            <div>
              <Button
                label="Go Deploy"
                handleClick={() => {
                  U.Messager.sendMessageToContent(U.C.ADMETA_MSG_ACCOUNT, { EVMAddress, minaAddress })
                  router.push('/deploy')
                }}
              />
            </div>
            :
            <div className="flex">
              <ConnectKitButton.Custom>
                {({ show }) => {
                  return (
                    <Button
                      label="Connect EVM Wallet"
                      handleClick={() => {
                        show!()
                      }}
                    />
                  );
                }}
              </ConnectKitButton.Custom>
              <div className="w-4"></div>
              <Button
                label="Connect Mina Wallet"
                handleClick={connectMina}
              />
            </div>
        }
      </div>
    </Base>
  )
}
