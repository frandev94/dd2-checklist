import { useState } from 'react'

export function ExampleButton() {
  const [clicked, setClicked] = useState(false)
  const handleClick = () => setClicked(true)
  return (
    <div>
      <button onClick={handleClick}>
        {clicked ? 'Clicked' : 'Hello World'}
      </button>
    </div>
  )
}
