interface FooterProps {
  left?: JSX.Element
  middle?: JSX.Element
  right?: JSX.Element
}

export const Footer = ({ left, middle, right }: FooterProps): JSX.Element => {
  return (
    <>
      <div className='bg-grey4 h-px' />
      <div className='h-full flex flex-col justify-center'>
        <div className='flex flex-row gap-4 px-14'>
          <div className='w-1/3'>
            {left}
          </div>
          <div className='w-1/3'>
            {middle}
          </div>
          <div className='w-1/3'>
            {right}
          </div>
        </div>
      </div>
    </>
  )
}
