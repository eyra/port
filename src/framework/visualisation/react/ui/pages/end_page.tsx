import { Weak } from '../../../../helpers'
import { PropsUIPageEnd } from '../../../../types/pages'
import { ReactFactoryContext } from '../../factory'
import { Page } from './templates/page'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { BodyLarge, Title1 } from '../elements/text'

type Props = Weak<PropsUIPageEnd> & ReactFactoryContext

export const EndPage = (props: Props): JSX.Element => {
  const { title, text } = prepareCopy(props)

  const body: JSX.Element = (
    <>
      <Title1 text={title} />
      <BodyLarge text={text} />
    </>
  )

  return (
    <Page
      body={body}
    />
  )
}

interface Copy {
  title: string
  text: string
}

function prepareCopy ({ locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale),
    text: Translator.translate(text, locale)
  }
}

const title = new TextBundle()
  .add('en', 'Thank you')
  .add('nl', 'Bedankt')

const text = new TextBundle()
  .add('en', 'Thank you for your participation. You can now close the page or refresh to restart the donation flow.')
  .add('nl', 'Hartelijk dank voor uw deelname. U kunt deze pagina nu sluiten of de pagina verversen om de flow nogmaals te doorlopen.')
