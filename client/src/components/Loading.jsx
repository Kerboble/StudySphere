import React from 'react'
import { quantum } from 'ldrs'
quantum.register()

function loading() {
  return (
    <l-quantum
  size="45"
  speed="1.75" 
  color="blue" 
></l-quantum>
  )
}

export default loading

