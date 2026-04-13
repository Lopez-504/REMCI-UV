import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, PerspectiveCamera } from '@react-three/drei'

const Instrument = ({ position, name, description, children }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <group 
      position={position} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      {children}
      {hovered && (
        <Html distanceFactor={10}>
          <div style={{
            background: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            fontFamily: 'sans-serif'
          }}>
            <strong>{name}</strong>
            <p style={{ margin: 0, fontSize: '12px' }}>{description}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

const WeatherStationModel = () => {
  const anemometerRef = useRef()

  // Animate the anemometer rotation
  useFrame((state, delta) => {
    if (anemometerRef.current) {
      anemometerRef.current.rotation.y += delta * 2
    }
  })

  return (
    <group>
      {/* Main Mast */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 32]} />
        <meshStandardMaterial color="#888888" />
      </mesh>

      {/* Radiation Shield / Temp-Hum Sensor */}
      <Instrument 
        position={[0, 0.5, 0]} 
        name="Radiation Shield" 
        description="Protects temp/humidity sensors from solar radiation."
      >
        <cylinderGeometry args={[0.25, 0.25, 0.6, 16]} />
        <meshStandardMaterial color="white" />
      </Instrument>

      {/* Anemometer */}
      <Instrument 
        position={[0, 1.8, 0]} 
        name="Anemometer" 
        description="Measures wind speed via rotating cups."
      >
        <group ref={anemometerRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>
      </Instrument>

      {/* Rain Gauge */}
      <Instrument 
        position={[0.6, -1.2, 0]} 
        name="Rain Gauge" 
        description="A tipping bucket mechanism to measure precipitation."
      >
        <cylinderGeometry args={[0.2, 0.15, 0.4, 32]} />
        <meshStandardMaterial color="#555" />
      </Instrument>
      
      {/* Ground Plane for context */}
      <gridHelper args={[10, 10]} position={[0, -2, 0]} />
    </group>
  )
}

export default function WeatherStationScene() {
  return (
    <div style={{ width: '100%', height: '500px', background: '#f0f2f5' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 2, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <WeatherStationModel />
        <OrbitControls enablePan={false} minDistance={2} maxDistance={10} />
      </Canvas>
    </div>
  )
}