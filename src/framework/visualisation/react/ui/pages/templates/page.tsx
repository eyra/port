interface PageProps {
  body: JSX.Element
  sidebar?: JSX.Element
  footer?: JSX.Element
}

export const Page = (props: PageProps): JSX.Element => {
  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <div className='flex flex-row flex-wrap-reverse w-full pt-20 px-8 md:px-14 gap-8 max-w-7xl mx-auto'>
        <div className='flex-1 min-w-[min(100%,400px)] '>{props.body}</div>
        {props.sidebar != null && (
          <div className='mx-auto basis[w-sidebar] flex-shrink-0'>{props.sidebar}</div>
        )}
      </div>
      {props.footer != null && (
        <div className='h-footer flex-shrink-0'>{props.footer}</div>
      )}
    </div>
  )
}
