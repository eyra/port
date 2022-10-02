import * as React from 'react'

interface MainProps {
  elements: JSX.Element[]
}

export const Main = ({ elements }: MainProps): JSX.Element => {
  elements = elements.map((element, index) => { return { ...element, key: `${index}` } })

  return (
    <div className='flex w-full'>
      <div className='flex-grow m-6 md:8 lg:m-14 max-w-sheet'>
        <div className='w-full'>
          {elements}
        </div>
      </div>
    </div>
  )
}
