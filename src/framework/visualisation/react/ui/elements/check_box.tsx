import { PropsUICheckBox } from '../../../../types/elements'
import CheckSvg from '../../../../../assets/images/check.svg'
import CheckActiveSvg from '../../../../../assets/images/check_active.svg'

export const CheckBox = ({ id, selected, onSelect }: PropsUICheckBox): JSX.Element => {
  return (
    <div id={id} className='radio-item flex flex-row gap-3 items-center cursor-pointer' onClick={onSelect}>
      <div className='flex-shrink-0'>
        <img src={CheckSvg} id={`${id}-off`} className={selected ? 'hidden' : ''} />
        <img src={CheckActiveSvg} id={`${id}-on`} className={selected ? '' : 'hidden'} />
      </div>
    </div>
  )
}
