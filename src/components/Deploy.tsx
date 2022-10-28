import React, { FC } from 'react';

type Prop = {
  handleDeploy: () => void
}

const Deploy: FC<Prop> = ({ handleDeploy }) => {
  return (
    <div style={{
      marginTop: 80,
      padding: '0 100px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        color: '#fff',
        fontWeight: '100',
        fontSize: '20px',
        fontStyle: 'italic',
        marginBottom: '20px'
      }}>1. First deploy the contract on mina chian</div>
      <div
        style={{
          color: '#000',
          background: 'linear-gradient(250.5deg,#6dc1dc 18.1%,#a690fc 35.14%,#fc96bb 65.36%,#ffc397 97.34%),#3772ff',
          display: 'inline-block',
          padding: '4px 20px',
          borderRadius: '10px',
          fontWeight: '100',
          fontSize: '20px',
          fontStyle: 'italic',
          cursor: 'pointer'
        }}
        onClick={handleDeploy}
      >Deploy</div>
    </div>
  )
}

export default Deploy