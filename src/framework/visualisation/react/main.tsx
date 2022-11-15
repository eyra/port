import * as React from 'react'

interface MainProps {
  elements: JSX.Element[]
}

export const Main = ({ elements }: MainProps): JSX.Element => {
  elements = elements.map((element, index) => { return { ...element, key: `${index}` } })

  return (
    <div className='w-full h-full'>
      {elements}
    </div>
  )
}
