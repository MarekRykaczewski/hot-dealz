import React from 'react'
import { useLocation } from 'react-router-dom'

function DealDetails() {

    const location = useLocation()
    const { test } = location.state

  return (
    <div>{test}</div>
  )
}

export default DealDetails