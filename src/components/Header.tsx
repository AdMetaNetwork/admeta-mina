import React, { FC } from 'react';

type Prop = {}

const Header: FC<Prop> = ({ }) => {
  return (
    <div style={{
      position: 'sticky',
      left: 0,
      top: 0,
      right: 0,
      height: 80,
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px'
    }}>
      <div style={{
        color: '#fff',
        fontWeight: '100',
        fontSize: '30px',
        fontStyle: 'italic'
      }}>
        AdMeta with mina zero-knowledge proof
      </div>
    </div>
  )
}

export default Header