import React from 'react'

const ThreeDLogo = () => {

  return (
    <mesh rotation={[90,0,20]}>
        <boxGeometry args={[3,3,3]}/>
        <meshStandardMaterial color="blue" />
    </mesh>
  )
}

export default ThreeDLogo