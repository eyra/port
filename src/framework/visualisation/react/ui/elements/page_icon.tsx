interface PropsUIPageIcon {
  index: number
  selected: boolean
  onClick: () => void
}

type Props = PropsUIPageIcon

export const PageIcon = ({ index, selected, onClick }: Props): JSX.Element => {
  function width (): string {
    if (index > 999) return 'w-10'
    if (index > 99) return 'w-9'
    return 'w-8'
  }

  return (
    <div className={`rounded ${width()} h-8 cursor-pointer flex-shrink-0 overflow-hidden ${selected ? 'bg-primary' : 'bg-grey5 '}`} onClick={onClick}>
      <div className='flex flex-row items-center justify-center w-full h-full'>
        <div className={`text-label font-label ${selected ? 'text-white' : 'text-grey2'}`}>
          {`${index}`}
        </div>
      </div>
    </div>
  )
}
