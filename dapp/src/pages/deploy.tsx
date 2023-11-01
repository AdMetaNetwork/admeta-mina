import Base from "@/components/common/Base"
import Button from "@/components/ui/BaseButton"
import { useContext, useState } from 'react'
import BaseCtx from "@/utils/context"
import { PrivateKey, Mina, PublicKey, fetchAccount, isReady, Poseidon } from 'o1js'
import useLocalStorage from "@/hooks/useLocalStorage";
import * as U from '@/utils'

export default function Deploy() {
  const [deployPrivateKey, setDeployPrivateKey] = useState('')
  const [balance, setBalance] = useState('')
  const [depStatus, setDepStatus] = useState('')
  const [depStatus2, setDepStatus2] = useState('')
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
                  <div className="text-[12px] text-primary-600 text-r-medium mr-1">* The deployed PrivateKey will not be stored within the program and must be manually copied and imported into your Auro wallet.</div>
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

                U.Messager.sendMessageToContent(U.C.ADMETA_MSG_MINA_DEVELOP_ADDRESS, { deploy_address: zkAppAddress.toBase58() })
              } else {
                setDeployMinaAddress!(deploy_address)
                U.Messager.sendMessageToContent(U.C.ADMETA_MSG_MINA_DEVELOP_ADDRESS, { deploy_address })
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
          {
            balance
            &&
            <div className="mb-2 flex flex-wrap items-center">
              <div className="px-4 py-2 text-[14px] text-r-medium mr-1">Your balance {balance}</div>
            </div>
          }
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
              } else {
                setBalance(account?.balance.toString())
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

          {
            depStatus
            &&
            <div className="mb-2 flex flex-wrap items-center">
              <div className="px-4 py-2 text-[14px] text-r-medium mr-1">Deploy Status ---{'>'} {depStatus}</div>
            </div>
          }
          <Button
            label="Deploy"
            handleClick={async () => {
              await isReady;
              console.log('deploy start')
              setDepStatus('deploy start')
              const Berkeley = Mina.Network(
                'https://proxy.berkeley.minaexplorer.com/graphql'
              );
              Mina.setActiveInstance(Berkeley);

              if (typeof window !== 'undefined') {

                console.log('load contract')
                setDepStatus('load contract')
                const { Score } = await import('../../build_mina/src');
                console.log('Score-->>>', Score)
                setDepStatus('load contract ok')

                const allAccounts = await (window as any).mina.requestAccounts()
                const deployAddress = allAccounts[0]
                setDepStatus('request account from wallet')

                const senderAccount = PublicKey.fromBase58(deployAddress)
                setDepStatus('deploy address --- ' + deployAddress)

                const zkAppInstance = new Score(senderAccount);

                setDepStatus('start compile')
                const { verificationKey } = await Score.compile()

                console.log('contract compiled')
                setDepStatus('contract compiled')

                console.log('start transaction')
                setDepStatus('start transaction')
                const tx = await Mina.transaction({
                  sender: senderAccount,
                  fee: 100_000_000
                }, () => {
                  fetchAccount({ publicKey: senderAccount });
                  zkAppInstance.deploy({ verificationKey });
                });
                console.log('start transaction send!')
                setDepStatus('start transaction send')

                await tx.prove().catch(err => err)

                let partiesJsonUpdate = tx.toJSON();
                setDepStatus('start wallet pravite key sign')

                let partyResult = await (window as any).mina.sendTransaction({
                  transaction: partiesJsonUpdate,
                  feePayer: {
                    memo: "deploy admeta contract",
                    fee: 0.1
                  },
                })
                console.log(partyResult, 'partyResult-->>')
                setDepStatus(`deploy success --- https://minascan.io/berkeley/tx/${partyResult.hash}`)
                console.log("tx hash-->", partyResult.hash);
              }
            }}
          />
        </div>


        <div className="mb-10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-primary-600 flex justify-center items-center rounded-full mr-1">
              <div className="text-[12px] text-white text-r-medium">5</div>
            </div>
            <div>Set verify address, Please switch to your main wallet address before doing this!</div>
          </div>
          {
            depStatus2
            &&
            <div className="mb-2 flex flex-wrap items-center">
              <div className="px-4 py-2 text-[14px] text-r-medium mr-1">Set Status ---{'>'} {depStatus2}</div>
            </div>
          }
          <Button
            label="Set"
            handleClick={async () => {
              await isReady;
              console.log('set start')
              setDepStatus2('set start')
              const Berkeley = Mina.Network(
                'https://proxy.berkeley.minaexplorer.com/graphql'
              );
              Mina.setActiveInstance(Berkeley);

              if (typeof window !== 'undefined') {

                console.log('load contract')
                setDepStatus2('load contract')
                const { Score } = await import('../../build_mina/src');
                console.log('Score-->>>', Score)
                setDepStatus2('load contract ok')

                const allAccounts = await (window as any).mina.requestAccounts()
                const addree = allAccounts[0]
                setDepStatus2('request account from wallet')

                const senderAccount = PublicKey.fromBase58(addree)
                setDepStatus2('send address --- ' + deploy_address)

                const zkAppInstance = new Score(PublicKey.fromBase58(deploy_address));

                setDepStatus2('start compile')
                await Score.compile()

                console.log('contract compiled')
                setDepStatus2('contract compiled')

                console.log('start transaction')
                setDepStatus2('start transaction')
                const tx = await Mina.transaction({
                  sender: senderAccount,
                  fee: 100_000_000
                }, () => {
                  fetchAccount({ publicKey: senderAccount });
                  zkAppInstance.setVerifyAddress(Poseidon.hash(PrivateKey.fromBase58(U.C.TEST_SIGN_ACCOUNT).toPublicKey().toFields()));
                });
                console.log('start transaction send!')
                setDepStatus2('start transaction send')

                await tx.prove().catch(err => err)

                let partiesJsonUpdate = tx.toJSON();
                setDepStatus2('start wallet pravite key sign')

                let partyResult = await (window as any).mina.sendTransaction({
                  transaction: partiesJsonUpdate,
                  feePayer: {
                    memo: "set verify address",
                    fee: 0.1
                  },
                })
                console.log(partyResult, 'partyResult-->>')
                setDepStatus2(`set success --- https://minascan.io/berkeley/tx/${partyResult.hash}`)
                console.log("tx hash-->", partyResult.hash);
              }
            }}
          />
        </div>

      </div>
    </Base>
  )
}
