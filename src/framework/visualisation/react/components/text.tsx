
interface TextProps {
  text: string
  color?: string
  margin?: string
}

export const Title0Factory = (props: TextProps): JSX.Element => <Title0 {...props} />
export const Title0 = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8 lg:mb-10' }: TextProps): JSX.Element => {
  return (
    <div className={`text-title4 font-title4 sm:text-title2 sm:font-title2 lg:text-title0 lg:font-title0 ${color} ${margin}`}>
      {text}
    </div>
  )
}

export const Title1Factory = (props: TextProps): JSX.Element => <Title1 {...props} />
export const Title1 = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8 lg:mb-10' }: TextProps): JSX.Element => {
  return (
    <div className={`text-title3 font-title3 sm:text-title2 lg:text-title1 lg:font-title1 ${color} ${margin}`}>
      {text}
    </div>
  )
}

export const Title2Factory = (props: TextProps): JSX.Element => <Title2 {...props} />
export const Title2 = ({ text, color = 'text-grey1', margin = 'mb-6 md:mb-8 lg:mb-10' }: TextProps): JSX.Element => {
  return (
    <div className={`text-title4 font-title4 sm:text-title3 sm:font-title3 lg:text-title2 lg:font-title2 ${color} ${margin}`}>
      {text}
    </div>
  )
}
