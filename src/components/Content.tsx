import React, { FC } from 'react';

type Prop = {}

const Content: FC<Prop> = ({ }) => {
  return (
    <div style={{
      marginTop: 80,
      padding: '0 100px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'linear-gradient(250.5deg,#6dc1dc 18.1%,#a690fc 35.14%,#fc96bb 65.36%,#ffc397 97.34%),#3772ff',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        fontWeight: '100',
        fontSize: '30px',
        fontStyle: 'italic'
      }}>Admeta with mina use an off-chain execution and mostly off-chain state model. This allows for private computation and state that can be either private or public.</div>
    </div>
  )
}

export default Content