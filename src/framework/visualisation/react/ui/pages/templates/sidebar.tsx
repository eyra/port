interface SidebarProps {
  logo: string
  content?: JSX.Element
}

export const Sidebar = (props: SidebarProps): JSX.Element => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex-wrap flex flex-row'>
        <div className='flex-grow' />
        <div className='h-logo'>
          <img src={props.logo} />
        </div>
        <div className='flex-grow' />
      </div>
      <div>
        {props.content}
      </div>
    </div>
  )
}
