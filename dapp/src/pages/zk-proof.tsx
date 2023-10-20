import Base from "@/components/common/Base"
import Button from "@/components/ui/BaseButton"
import { useEffect, useState } from 'react'
import * as U from '@/utils'
import { PrivateKey, Signature, Field, Poseidon, isReady, Mina, PublicKey, fetchAccount } from 'o1js'
import useLocalStorage from "@/hooks/useLocalStorage"

export default function SyncData() {
  const [sigs, setSigs] = useState<Field[]>([])
  const [proofData, setProofData] = useState<string>()
  const [depStatus, setDepStatus] = useState('')
  const [score, setScore] = useState<Record<string, Field>>({})
  const [deploy_address,] = useLocalStorage<string>('deploy_address', '')
  const [sig, setSin] = useState<Signature>()

  useEffect(() => {
    window.addEventListener("message", function (msg) {
      if (msg.data.type === U.C.ADMETA_MSG_SYNC_DATA_BACK) {
        const score = msg.data.data
        const categories = U.WHITE_LIST.categories
        const s: Record<string, Field> = {}
        const sigs: Field[] = []
        Object.keys(score).forEach((key) => {
          const idx = categories.findIndex((i) => i === key)
          sigs.push(Poseidon.hash([Field(idx), Field(score[key])]))
          s[key] = Field(score[key])
        })
        console.log(s)
        setSigs(sigs)
        setScore(s)
      }
    })

    return () => {
      window.removeEventListener('message', () => { });
    };

  }, [])

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
          {
            sigs.length
              ?
              <div className="mb-2 flex flex-wrap">
                {sigs.map((item, index) => (
                  <div className="px-4 py-2 text-[14px] bg-gray-200 rounded text-r-medium mb-1 mr-1" key={index}>{item.toString()}</div>
                ))}
              </div>
              :
              null
          }
          <Button
            label="Load Data"
            handleClick={() => {
              U.Messager.sendMessageToContent(U.C.ADMETA_MSG_SYNC_DATA, { msg: 'load data' })
            }}
          />
        </div>

        <div className="mb-10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-primary-600 flex justify-center items-center rounded-full mr-1">
              <div className="text-[12px] text-white text-r-medium">2</div>
            </div>
            <div>Generate zk trusted data</div>
          </div>
          {
            proofData
            &&
            <div className="mb-2 flex flex-wrap">
              <div className="px-4 py-2 text-[14px] bg-gray-200 rounded text-r-medium">{proofData}</div>
            </div>
          }
          <Button
            label="Generate"
            handleClick={async () => {
              // TODO Follow-up plan get signature from service
              const privKey = PrivateKey.fromBase58(U.C.TEST_SIGN_ACCOUNT)
              let sig = Signature.create(privKey, sigs);
              setProofData(sig.toBase58())
              setSin(sig)
            }}
          />
        </div>

        <div className="mb-10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-primary-600 flex justify-center items-center rounded-full mr-1">
              <div className="text-[12px] text-white text-r-medium">3</div>
            </div>
            <div>Upload updated scores to the Mina blockchain</div>
          </div>

          {
            depStatus
            &&
            <div className="mb-2 flex flex-wrap items-center">
              <div className="px-4 py-2 text-[14px] text-r-medium mr-1">Update Status ---{'>'} {depStatus}</div>
            </div>
          }
          <Button
            label="Update"
            handleClick={async () => {
              await isReady;

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
                const addree = allAccounts[0]
                setDepStatus('request account from wallet')

                const senderAccount = PublicKey.fromBase58(addree)
                setDepStatus('send address --- ' + addree)

                const zkAppInstance = new Score(PublicKey.fromBase58(deploy_address));

                setDepStatus('start compile')
                await Score.compile()

                console.log('contract compiled')
                setDepStatus('contract compiled')

                console.log('start transaction')
                setDepStatus('start transaction')
                const tx = await Mina.transaction({
                  sender: senderAccount,
                  fee: 100_000_000
                }, () => {
                  fetchAccount({ publicKey: senderAccount });
                  zkAppInstance.updateScore(
                    score.DeFi,
                    score.GameFi,
                    score.NFT,
                    score.Metaverse,
                    score.OnChainData,
                    score.DID,
                    score.AI,
                    sig!,
                    PrivateKey.fromBase58(U.C.TEST_SIGN_ACCOUNT).toPublicKey()
                  );
                });
                console.log('start transaction send!')
                setDepStatus('start transaction send')

                await tx.prove().catch(err => err)

                let partiesJsonUpdate = tx.toJSON();
                setDepStatus('start wallet pravite key sign')

                let partyResult = await (window as any).mina.sendTransaction({
                  transaction: partiesJsonUpdate,
                  feePayer: {
                    memo: "update score",
                    fee: 0.1
                  },
                })
                console.log(partyResult, 'partyResult-->>')
                setDepStatus(`update success --- https://minascan.io/berkeley/tx/${partyResult.hash}`)
                console.log("tx hash-->", partyResult.hash);
                U.Messager.sendMessageToContent(U.C.ADMETA_MSG_UPDATE_SUCCESS, { msg: 'update success' })
              }
            }}
          />
        </div>
      </div>
    </Base>
  )
}
