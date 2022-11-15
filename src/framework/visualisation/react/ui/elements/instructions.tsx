import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'
import { BodyMedium, Title3 } from './text'
import TwitterSvg from '../../../../../assets/images/twitter.svg'
import FacebookSvg from '../../../../../assets/images/facebook.svg'
import InstagramSvg from '../../../../../assets/images/instagram.svg'
import YoutubeSvg from '../../../../../assets/images/youtube.svg'
import TextBundle from '../../../../text_bundle'

interface InstructionsProps {
  platform: string
}

type Props = InstructionsProps & ReactFactoryContext

export const Instructions = (props: Props): JSX.Element => {
  const { title, text } = prepareCopy(props)
  const platform = props.platform.toLowerCase()

  return (
    <div className='flex flex-col gap-6 p-8 border-2 border-grey4 rounded'>
      <div className='flex flex-row gap-8 items-center'>
        <div className='flex-grow'>
          <Title3 text={title} margin='' />
        </div>
        <div className='h-12'>
          <img className='h-12' src={icon[platform]} />
        </div>
      </div>
      <BodyMedium text={text} color='text-grey2' margin='' />
    </div>
  )
}

interface Copy {
  title: string
  text: string
}

function prepareCopy ({ platform, locale }: Props): Copy {
  const textBundle = text[platform.toLowerCase()]
  return {
    title: Translator.translate(title, locale),
    text: Translator.translate(textBundle, locale)
  }
}

const title = new TextBundle()
  .add('en', 'Instructions')
  .add('nl', 'Instructies')

const twitterText = new TextBundle()
  .add('en', 'If you have received an email with a link to your data from Twitter. Then click on the link and save the file. If you then select this file, profiling information will be extracted from it, which you can then view and donate.')
  .add('nl', 'Als je een email met een link naar jouw gegevens hebt ontvangen van Twitter. Klik dan op de link en sla het bestand op. Als u dit bestand vervolgens selecteert dan wordt daar profiling informatie uit gehaald, die u vervolgens kunt bekijken en doneren.')

const facebookText = new TextBundle()
  .add('en', 'If you have received an email with a link to your data from Facebook. Then click on the link and save the file. If you then select this file, profiling information will be extracted from it, which you can then view and donate.')
  .add('nl', 'Als je een email met een link naar jouw gegevens hebt ontvangen van Facebook. Klik dan op de link en sla het bestand op. Als u dit bestand vervolgens selecteert dan wordt daar profiling informatie uit gehaald, die u vervolgens kunt bekijken en doneren.')

const instagramText = new TextBundle()
  .add('en', 'If you have received an email with a link to your data from Instagram. Then click on the link and save the file. If you then select this file, profiling information will be extracted from it, which you can then view and donate.')
  .add('nl', 'Als je een email met een link naar jouw gegevens hebt ontvangen van Instagram. Klik dan op de link en sla het bestand op. Als u dit bestand vervolgens selecteert dan wordt daar profiling informatie uit gehaald, die u vervolgens kunt bekijken en doneren.')

const youtubeText = new TextBundle()
  .add('en', 'If you have received an email with a link to your data from Google. Then click on the link and save the file. If you then select this file, profiling information will be extracted from it, which you can then view and donate.')
  .add('nl', 'Als je een email met een link naar jouw gegevens hebt ontvangen van Google. Klik dan op de link en sla het bestand op. Als u dit bestand vervolgens selecteert dan wordt daar profiling informatie uit gehaald, die u vervolgens kunt bekijken en doneren.')

const text: Record<string, TextBundle> = {
  twitter: twitterText,
  facebook: facebookText,
  instagram: instagramText,
  youtube: youtubeText
}

const icon: Record<string, string> = {
  twitter: TwitterSvg,
  facebook: FacebookSvg,
  instagram: InstagramSvg,
  youtube: YoutubeSvg
}
