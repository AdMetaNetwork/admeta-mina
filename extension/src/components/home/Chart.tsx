import { FC, useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react';
import * as U from '@/utils'
import browser from 'webextension-polyfill';
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

const MyEchartsComponent = () => {

  const [value, setValue] = useState<string[]>([])

  const  getMinaState = async (deploy_address: string) => {

    if (!deploy_address) return;

    const GET_DATA = gql`
        query {
          account(publicKey: "${deploy_address}") {
            zkappState
          }
        }
    `;

    const endpoint = 'https://proxy.berkeley.minaexplorer.com/graphql';

    const client = new ApolloClient({
      link: new HttpLink({
        uri: endpoint,
      }),
      cache: new InMemoryCache(),
    });

    const { data } = await client.query({
      query: GET_DATA,
    });

    const zkappState = data.account.zkappState.slice(0, 7);

    const chainScore: { [key: string]: number } = {};
    U.W.default.categories.forEach((category) => {
      chainScore[category] = 0;
    });

    Object.keys(chainScore).forEach((key, index) => {
      if (index < zkappState.length) {
        chainScore[key] = +zkappState[index];
      }
    });

    setValue([
      chainScore.DeFi.toString(),
      chainScore.GameFi.toString(),
      chainScore.NFT.toString(),
      chainScore.Metaverse.toString(),
      chainScore.OnChainData.toString(),
      chainScore.DID.toString(),
      chainScore.AI.toString()
    ])
  }

  useEffect(() => {
    browser.storage.local.get(['deploy_address']).then(({ deploy_address }) => {
      if (deploy_address) {
        getMinaState(deploy_address)
      }
    })
  }, [])


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
          data: U.W.default.categories.map((item, index) => ({ name: item, value: value[index] }))
        }
      ]
    };
  };

  return <ReactEcharts style={{ width: 300, height: 300 }} option={getOption()} />;
};


const Chart: FC = () => {

  return (
    <div className='w-full px-2'>
      <div className='text-[20px] text-r-medium mb-4'>Your Personal Portrait</div>
      <div className='w-full flex justify-center'>
        <MyEchartsComponent />
      </div>
    </div>
  )
}

export default Chart