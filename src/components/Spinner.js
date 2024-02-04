import React from 'react'
import loading from './loading.gif'

function Spinner() {
  return (
    <div className='text-center'>
      <img src={loading} alt="loading..." width={45} />
    </div>
  )
}

export default Spinner
