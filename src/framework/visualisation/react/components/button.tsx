interface ButtonProps {
  label: string
  color?: string
  onClick: () => void
}

export const PrimaryButtonFactory = (props: ButtonProps): JSX.Element => <PrimaryButton {...props} />

export const PrimaryButton = ({ label, color = 'bg-primary text-white', onClick }: ButtonProps): JSX.Element => {
  return (
    <div className={`pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 cursor-pointer ${color}`} onClick={onClick}>
      <div id='confirm-button' className='flex-wrap'>
        {label}
      </div>
    </div>
  )
}

interface ButtonProps {
  label: string
  color?: string
  onClick: () => void
}

export const SecondaryButtonFactory = (props: ButtonProps): JSX.Element => <SecondaryButton {...props} />

export const SecondaryButton = ({ label, color = 'bg-delete text-delete', onClick }: ButtonProps): JSX.Element => {
  return (
    <div className={`pt-13px pb-13px active:pt-14px active:pb-3 active:shadow-top2px border-2 font-button text-button rounded bg-opacity-0 pr-4 pl-4 ${color}`} onClick={onClick}>
      <div className='flex-wrap'>
        {label}
      </div>
    </div>
  )
}
