import { FC, useState } from 'react'
import ReactEcharts from 'echarts-for-react';
import * as U from '@/utils'

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
          data: U.W.default.categories.map(item => ({ name: item, value: Math.floor(Math.random() * 1000) }))
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