interface PageProps {
  body: JSX.Element
  sidebar: JSX.Element
  footer: JSX.Element
}

export const Page = (props: PageProps): JSX.Element => {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-row w-full pt-20 px-8 md:px-14">
        <div className="flex-1">{props.body}</div>
        <div className="basis[w-sidebar] flex-shrink-0">{props.sidebar}</div>
      </div>
      <div className="flex-grow" />
      <div className="h-footer flex-shrink-0">{props.footer}</div>
    </div>
  )
}
