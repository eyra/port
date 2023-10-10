export interface Props {
  page: number
  setPage: (page: number) => void
  nPages: number
}

export const Pagination = ({ page, setPage, nPages }: Props): JSX.Element => {
  function activeButton (active: boolean): string {
    if (active) return 'text-primary'
    return 'text-grey3 hover:cursor-default'
  }

  return (
    <div className={`flex items-center gap-1 lg:gap-3 p-3 ${nPages <= 1 ? 'invisible' : ''}`}>
      <button className={activeButton(page > 0)} onClick={() => setPage(Math.max(page - 10, 0))}>
        {doubleBackward}
      </button>
      <button className={activeButton(page > 0)} onClick={() => setPage(Math.max(page - 1, 0))}>
        {backward}
      </button>
      <div className='text-center min-w-[2rem] font-title6 text-title6 h-5'>{page + 1}</div>
      <button
        className={activeButton(page < nPages - 1)}
        onClick={() => setPage(Math.min(page + 1, nPages - 1))}
      >
        {forward}
      </button>
      <button
        className={activeButton(page < nPages - 1)}
        onClick={() => setPage(Math.min(page + 10, nPages - 1))}
      >
        {doubleForward}
      </button>
    </div>
  )
}

const backward = (
  <svg
    className=' h-4'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 6 10'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M5 1 1 5l4 4'
    />
  </svg>
)
const doubleBackward = (
  <svg
    className='h-4'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 12 10'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M5 1 1 5l4 4m6-8L7 5l4 4'
    />
  </svg>
)
const forward = (
  <svg
    className='h-4 '
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 6 10'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='m1 9 4-4-4-4'
    />
  </svg>
)
const doubleForward = (
  <svg
    className='h-4 '
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 12 10'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='m7 9 4-4-4-4M1 9l4-4-4-4'
    />
  </svg>
)
