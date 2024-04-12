import React from 'react'
import { quantum } from 'ldrs'
quantum.register()

function loading() {
  return (
    <l-quantum
  size="100"
  speed="6.00" 
  color="blue"
  border="none" 
></l-quantum>
  )
}

export default loading

