import { PropsUICheckBox } from '../../../../types/elements'
import CheckSvg from '../../../../../assets/images/check.svg'
import CheckActiveSvg from '../../../../../assets/images/check_active.svg'

export const CheckBox = ({
  id,
  selected,
  size = 'w-6 h-6',
  onSelect
}: PropsUICheckBox): JSX.Element => {
  return (
    <div id={id} className='radio-item flex flex-row gap-3 cursor-pointer' onClick={onSelect}>
      <div className={`flex-shrink-0  ${size}`}>
        <img
          src={CheckSvg}
          id={`${id}-off`}
          className={`w-full h-full ${selected ? 'hidden' : ''}`}
        />
        <img
          src={CheckActiveSvg}
          id={`${id}-on`}
          className={`w-full h-full ${selected ? '' : 'hidden'}`}
        />
      </div>
    </div>
  )
}
