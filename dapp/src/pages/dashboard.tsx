import Base from "@/components/common/Base"
import ReactEcharts from 'echarts-for-react';
import * as U from '@/utils'
import { PrivateKey, Signature, Field, Poseidon, isReady, Mina, PublicKey, fetchAccount } from 'o1js'
import useLocalStorage from "@/hooks/useLocalStorage"
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [deploy_address,] = useLocalStorage<string>('deploy_address', '')
  const [value, setValue] = useState<string[]>([])

  useEffect(() => {
    const Berkeley = Mina.Network(
      'https://proxy.berkeley.minaexplorer.com/graphql'
    );
    Mina.setActiveInstance(Berkeley);

    import('../../build_mina/src').then(async ({ Score }) => {
      const zkAppInstance = new Score(PublicKey.fromBase58(deploy_address));
      const DeFi = await zkAppInstance.DeFi.fetch()
      const GameFi = await zkAppInstance.GameFi.fetch()
      const NFT = await zkAppInstance.NFT.fetch()
      const Metaverse = await zkAppInstance.Metaverse.fetch()
      const OnChainData = await zkAppInstance.OnChainData.fetch()
      const DID = await zkAppInstance.DID.fetch()
      const AI = await zkAppInstance.AI.fetch()

      setValue([
        DeFi.toString(),
        GameFi.toString(),
        NFT.toString(),
        Metaverse.toString(),
        OnChainData.toString(),
        DID.toString(),
        AI.toString()
      ])
    })

  }, [deploy_address])

  const MyEchartsComponent = () => {

    const getOption = () => {
      return {
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontFamily: 'RMedium, serif',
                formatter: (params: any) => {
                  return `${params.name}-${params.value}`;
                }
              },
            },
            labelLine: {
              show: false
            },
            data: U.WHITE_LIST.categories.map((item, index) => ({ name: item, value: value[index] }))
          }
        ]
      };
    };

    return <ReactEcharts style={{ width: 300, height: 300 }} option={getOption()} />;
  };

  return (
    <Base page="dashboard">
      <div className="w-full h-[100vh] pt-[6rem]">
        <div className="text-[24px] text-r-medium mb-10">You Dashboard</div>
        <div className="mb-10 flex">
          <div className="inline-flex items-center mb-2 border-b border-primary-600 border-b-4 mr-10">
            <div>Total earning: </div>
            <div className="ml-2 text-[30px] text-primary-600 text-r-semi-bold">8.62</div>
          </div>
          <div className="inline-flex items-center mb-2 border-b border-primary-600 border-b-4 mr-10">
            <div>Completed ad tasks: </div>
            <div className="ml-2 text-[30px] text-primary-600 text-r-semi-bold">10</div>
          </div>
          <div className="inline-flex items-center mb-2 border-b border-primary-600 border-b-4 mr-10">
            <div>Earned NFT badges: </div>
            <div className="ml-2 text-[30px] text-primary-600 text-r-semi-bold">10</div>
          </div>
        </div>
        <div className="mb-10">
          <div className="text-[18px] mb-2">Your Personal Portrait</div>
          <MyEchartsComponent />
        </div>
        <div>
          <div className="text-[18px] mb-2">Current Single Level</div>
          {
            U.WHITE_LIST.categories.map((item, index) => (
              <div className="flex items-center mb-4" key={index}>
                <div className="w-[100px] text-r-medium">{item}:</div>
                <div className="w-[500px] flex mr-4">
                  <div style={{ width: `${U.H.calculationSinglePercent(+value[index])}%` }} className="h-[4px] bg-primary-600"></div>
                  <div style={{ width: `${100 - U.H.calculationSinglePercent(+value[index])}%` }} className="h-[4px] bg-gray-300"></div>
                </div>
                <div className="text-r-medium">{U.H.calculationSinglePercent(+value[index])}%</div>
                <div className="ml-2 text-[20px] text-primary-600 text-r-medium">Lv.{U.H.calculationSingleLevel(+value[index])}</div>
              </div>
            ))
          }
        </div>
        <div
          className="fixed bottom-0 left-0 opacity-0 cursor-pointer"
          onClick={async () => {
            const Berkeley = Mina.Network(
              'https://proxy.berkeley.minaexplorer.com/graphql'
            );
            Mina.setActiveInstance(Berkeley);
            if (typeof window !== 'undefined') {

              console.log('load contract')
              const { Score } = await import('../../build_mina/src');
              console.log('Score-->>>', Score)

              const allAccounts = await (window as any).mina.requestAccounts()
              const address = allAccounts[0]
              const senderAccount = PublicKey.fromBase58(address)

              const zkAppInstance = new Score(PublicKey.fromBase58(deploy_address));

              await Score.compile()

              console.log('contract compiled')

              const tmp_s = [Field(0), Field(0), Field(0), Field(0), Field(0), Field(0), Field(0)]
              let tmp_sigs: Field[] = []
              tmp_s.forEach((item, index) => {
                tmp_sigs.push(Poseidon.hash([Field(index), item]))
              })

              // TODO Follow-up plan get signature from service
              const privKey = PrivateKey.fromBase58(U.C.TEST_SIGN_ACCOUNT)
              let sig = Signature.create(privKey, tmp_sigs);

              const tx = await Mina.transaction({
                sender: senderAccount,
                fee: 100_000_000
              }, () => {
                fetchAccount({ publicKey: senderAccount });
                zkAppInstance.updateScore(
                  Field(0),
                  Field(0),
                  Field(0),
                  Field(0),
                  Field(0),
                  Field(0),
                  Field(0),
                  sig!,
                  PrivateKey.fromBase58(U.C.TEST_SIGN_ACCOUNT).toPublicKey()
                );
              });
              console.log('start transaction send!')

              await tx.prove().catch(err => err)

              let partiesJsonUpdate = tx.toJSON();

              let partyResult = await (window as any).mina.sendTransaction({
                transaction: partiesJsonUpdate,
                feePayer: {
                  memo: "clear user score",
                  fee: 0.1
                },
              })
              console.log(partyResult, 'partyResult-->>')
              console.log("tx hash-->", partyResult.hash);
            }
          }}
        >clear did</div>
      </div>
    </Base>
  )
}
