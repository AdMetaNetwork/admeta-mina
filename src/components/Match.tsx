import React, { FC, useState } from 'react';

type Prop = {
  handleSubmit: (v: number) => void
}

const Match: FC<Prop> = ({
  handleSubmit
}) => {
  const [age, setAge] = useState(30)
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
      }}>2. Enter your age and use zero-knowledge proofs to calculate your age range to protect privacy and you will get the on-chain proof.</div>
      <input
        type="number"
        value={age}
        onChange={(e) => {
          setAge(+e.target.value)
        }}
        style={{
          width: '500px',
          height: '40px',
          fontSize: '20px',
          color: '#fff',
          background: '#000',
          border: '1px solid #fff',
          borderRadius: '4px',
          marginBottom: '20px',
          padding: '0 20px'
        }}
      />
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
        onClick={() => {
          handleSubmit(age)
        }}
      >Submit</div>
    </div>
  )
}

export default Match