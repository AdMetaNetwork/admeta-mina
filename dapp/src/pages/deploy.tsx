import Base from "@/components/common/Base"
import Button from "@/components/ui/BaseButton"
import { useContext, useState } from 'react'
import BaseCtx from "@/utils/context"
import { PrivateKey, Mina, PublicKey, fetchAccount } from 'o1js'
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Deploy() {
  const [deployPrivateKey, setDeployPrivateKey] = useState('')
  const [deploy_address,] = useLocalStorage<string>('deploy_address', '');

  const { setDeployMinaAddress, deployMinaAddress } = useContext(BaseCtx)

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
          {
            deployMinaAddress
            &&
            <div className="mb-2 flex flex-wrap items-center">
              <div className="px-4 py-2 text-[14px] bg-gray-200 rounded text-r-medium mr-1">Publick Key {deployMinaAddress}</div>
              {
                deployPrivateKey
                &&
                <div className="mb-2 flex flex-wrap items-center">
                  <div className="px-4 py-2 text-[14px] bg-gray-200 rounded text-r-medium mr-1">Private Key {deployPrivateKey}</div>
                  <div className="text-[12px] text-primary-600 text-r-medium mr-1">* The deployed PrivateKey will not be stored within the program and must be manually copied to a secure environment by the user.</div>
                </div>
              }
            </div>
          }
          <Button
            label="Generate"
            handleClick={async () => {
              if (!deploy_address) {
                const zkAppPrivateKey = PrivateKey.random();
                const zkAppAddress = zkAppPrivateKey.toPublicKey();
                localStorage.setItem('deploy_address', zkAppAddress.toBase58())
                // localStorage.setItem('deploy_address2', zkAppPrivateKey.toBase58())
                setDeployMinaAddress!(zkAppAddress.toBase58())
                setDeployPrivateKey(zkAppPrivateKey.toBase58())
              } else {
                setDeployMinaAddress!(deploy_address)
              }

            }}
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
            handleClick={() => {
              window.open(`https://faucet.minaprotocol.com/?address=${deployMinaAddress}&?explorer=minaexplorer`)
            }}
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
            label="Check Balance"
            handleClick={async () => {
              const Berkeley = Mina.Network(
                'https://proxy.berkeley.minaexplorer.com/graphql'
              );
              Mina.setActiveInstance(Berkeley);
              const { account } = await fetchAccount({ publicKey: PublicKey.fromBase58(deployMinaAddress!) })

              if (!account?.balance) {
                alert('The balance is 0, please confirm whether you have executed the faucet claim operation!')
              }
            }}
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
            handleClick={() => {
              
            }}
          />
        </div>

      </div>
    </Base>
  )
}
