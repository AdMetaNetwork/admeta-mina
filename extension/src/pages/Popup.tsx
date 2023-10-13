import { useEffect } from 'react';
import Header from '@/components/common/Header';
import Account from '@/components/common/Account';
import Score from '@/components/common/Score';
import Chart from '@/components/common/Chart';

export default function() {
  useEffect(() => {
    console.log("Hello from the popup!");
  }, []);

  return (
    <div>
      <Header />
      <Account />
      <Chart />
      <Score />
    </div>
  )
}
