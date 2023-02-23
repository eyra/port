interface PageProps {
  body: JSX.Element
  footer: JSX.Element
}

export const Page = (props: PageProps): JSX.Element => {
  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <div className='flex flex-row w-full gap-10 pt-20 pr-14'>
        <div className='flex-1 pl-14 w-full'>
          {props.body}
        </div>
      </div>
      <div className='h-footer'>
        {props.footer}
      </ div>
    </div>
  )
}
