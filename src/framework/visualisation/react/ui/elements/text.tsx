import { Weak } from '../../../../helpers'
import { PropsUITextBodyLarge, PropsUITextBodyMedium, PropsUITextTitle0, PropsUITextTitle1, PropsUITextTitle2, PropsUITextTitle6 } from '../../../../types/elements'

export const BodyLarge = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8 lg:mb-10' }: Weak<PropsUITextBodyLarge>): JSX.Element => {
  return (
    <div className={`text-bodylarge font-body ${color} ${margin}`}>
      {text}
    </div>
  )
}

export const BodyMedium = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8 lg:mb-10' }: Weak<PropsUITextBodyMedium>): JSX.Element => {
  return (
    <div className={`text-bodymedium font-body ${color} ${margin}`}>
      {text}
    </div>
  )
}

export const Title0 = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8 lg:mb-10' }: Weak<PropsUITextTitle0>): JSX.Element => {
  return (
    <div className={`text-title4 font-title4 sm:text-title2 sm:font-title2 lg:text-title0 lg:font-title0 ${color} ${margin}`}>
      {text}
    </div>
  )
}

export const Title1 = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8 lg:mb-10' }: Weak<PropsUITextTitle1>): JSX.Element => {
  return (
    <div className={`text-title3 font-title3 sm:text-title2 lg:text-title1 lg:font-title1 ${color} ${margin}`}>
      {text}
    </div>
  )
}

export const Title2 = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8 lg:mb-10' }: Weak<PropsUITextTitle2>): JSX.Element => {
  return (
    <div className={`text-title4 font-title4 sm:text-title3 sm:font-title3 lg:text-title2 lg:font-title2 ${color} ${margin}`}>
      {text}
    </div>
  )
}

export const Title6 = ({ text, color = 'text-grey1', margin = 'mb-2' }: Weak<PropsUITextTitle6>): JSX.Element => {
  return (
    <div className={`text-title6 font-title6 ${margin} ${color}`}>
      {text}
    </div>
  )
}
