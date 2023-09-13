import React from 'react'
import useResponsiveScreen from './ui/hooks/useResponsiveScreenSize'

interface MainProps {
  elements: JSX.Element[]
}

export const Main = ({ elements }: MainProps): JSX.Element => {
  useResponsiveScreen()
  elements = elements.map((element, index) => {
    return { ...element, key: `${index}` }
  })

  return <div className='w-full h-full'>{elements}</div>
}
