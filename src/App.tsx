import React, { useCallback, useEffect, useState, FC } from 'react';
import { render } from 'react-dom';
import Header from './components/Header'
import Content from './components/Content'
import Deploy from './components/Deploy'
import Log from './components/Log'
import Match from './components/Match'

type Prop = {

}

const App: FC<Prop> = ({ }) => {
  const [isDeploy, setDeploy] = useState(false)
  const [log, setLog] = useState<string[]>([])

  const handleMatchAge = async (v: number) => {
    console.log(v)
    setLog([
      '=== start contract deploy local mina chain',
      '=== contract deployed',
      `=== input age ${v}`,
      `=== start local run zero-knowledge proof`
    ])
    const { matchAge } = await import('../dist/match.js');
    const range = await matchAge(v);
    setLog([
      '=== start contract deploy local mina chain',
      '=== contract deployed',
      `=== input age ${v}`,
      `=== start local run zero-knowledge proof`,
      `=== match range ${range}`
    ])
  }

  const handleDeploy = async () => {
    setLog(['=== start contract deploy local mina chain'])
    const { deploy } = await import('../dist/match.js');
    await deploy();
    setLog(['=== start contract deploy local mina chain', '=== contract deployed'])
    setDeploy(true)
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000',
      position: 'relative'
    }}>
      <Header />
      <Content />
      {
        isDeploy
          ?
          <Match
            handleSubmit={handleMatchAge}
          />
          :
          <Deploy handleDeploy={handleDeploy} />
      }
      <Log log={log} />
    </div>
  )
}

// function App():FC<{}> {
//   async function deploy() {
//     const { deploy } = await import('../dist/match.js');
//     await deploy();
//   }

//   return <div style={{ color: '#fec400' }} onClick={deploy}>1111111</div>;
// }

render(<App />, document.querySelector('#root'));
