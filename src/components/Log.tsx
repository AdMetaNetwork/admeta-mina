import React, { FC } from 'react';

type Prop = {
  log: string[]
}

const Log: FC<Prop> = ({ log }) => {
  return (
    <div style={{
      marginTop: 80,
      padding: '0 200px',
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
        marginBottom: '20px',
        maxHeight: '200px',
        border: '1px solid #fff',
        width: '100%',
        padding: '20px',
        borderRadius: '10px'
      }}>
        {
          log.map((item, index) => (
            <div
              style={{
                color: '#fff',
                fontWeight: '100',
                fontSize: '16px',
                fontStyle: 'italic',
                marginBottom: '10px'
              }}
              key={index}
            >{item}</div>
          ))
        }
        {
          !log.length
          &&
          <div
            style={{
              color: '#fff',
              fontWeight: '100',
              fontSize: '16px',
              fontStyle: 'italic',
              marginBottom: '10px'
            }}
          >======= the log ====</div>
        }
      </div>

    </div>
  )
}

export default Log