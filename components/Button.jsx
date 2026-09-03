import React from 'react'

function Button({ value , className="",onClick}) {
  return (
      <button className={`bg-gray-600 p-3 text-white ${className} border`}
      onClick = {onClick}>{value} </button>
  )
}

export default Button