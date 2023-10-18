import Base from "@/components/common/Base"
import Button from "@/components/ui/BaseButton"
import { useEffect, useState } from 'react'
import * as U from '@/utils'
import { PrivateKey, Signature, Field, Poseidon } from 'o1js'

export default function SyncData() {
  const [sigs, setSigs] = useState<Field[]>([])
  const [proofData, setProofData] = useState<string>()

  useEffect(() => {
    window.addEventListener("message", function (msg) {
      if (msg.data.type === U.C.ADMETA_MSG_SYNC_DATA_BACK) {
        const score = msg.data.data
        const categories = U.WHITE_LIST.categories
        const sigs: Field[] = []
        Object.keys(score).forEach((key) => {
          const idx = categories.findIndex((i) => i === key)
          sigs.push(Poseidon.hash([Field(idx), Field(score[key])]))

        })
        setSigs(sigs)
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
          <div className="mb-2 flex flex-wrap">
            <div className="px-4 py-2 text-[14px] bg-gray-200 rounded text-r-medium">{proofData}</div>
          </div>
          <Button
            label="Generate"
            handleClick={async () => {
              const privKey = PrivateKey.fromBase58(U.C.TEST_SIGN_ACCOUNT)
              const pubKey = PrivateKey.fromBase58(U.C.TEST_SIGN_ACCOUNT).toPublicKey()
              let sig = Signature.create(privKey, sigs); // sign a message
              // const r = sig.verify(pubKey, sigs); // Bool(true)
              // sig.toJSON()
              setProofData(sig.toBase58())
              // console.log(sig, sig.toBase58(), 'test-sssaa--->>>>', r.toString())
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
          <Button
            label="Update"
            handleClick={() => { }}
          />
        </div>
      </div>
    </Base>
  )
}
