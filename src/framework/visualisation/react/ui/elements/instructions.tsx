import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'
import { Title3 } from './text'
import TwitterSvg from '../../../../../assets/images/twitter.svg'
import FacebookSvg from '../../../../../assets/images/facebook.svg'
import InstagramSvg from '../../../../../assets/images/instagram.svg'
import YoutubeSvg from '../../../../../assets/images/youtube.svg'
import TextBundle from '../../../../text_bundle'
import { Bullet } from './bullet'

const linkTwitter: string = 'https://eyra.co'
const linkFacebook: string = 'https://eyra.co'
const linkInstagram: string = 'https://eyra.co'
const linkYoutube: string = 'https://eyra.co'

interface InstructionsProps {
  platform: string
  locale: string
}

type Props = InstructionsProps & ReactFactoryContext

export const Instructions = (props: Props): JSX.Element => {
  const { title } = prepareCopy(props)
  const { locale } = props
  const platform = props.platform.toLowerCase()

  function renderBullets (bullets: string[]): JSX.Element[] {
    return bullets.map((bullet) => renderBullet(bullet))
  }

  function renderContent (): JSX.Element {
    return (
      <>
        <div className='flex flex-col gap-4 text-bodymedium font-body text-grey2'>
          {renderBullets(bullets[platform][locale])}
          {links[platform][locale]}
        </div>
      </>
    )
  }

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
      {renderContent()}
    </div>
  )
}

interface Copy {
  title: string
}

function prepareCopy ({ platform, locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale)
  }
}

const title = new TextBundle()
  .add('en', 'Download')
  .add('nl', 'Download')

function renderBullet (text: string): JSX.Element {
  return (
    <Bullet frameSize='w-5 h-30px'>
      <div>{text}</div>
    </Bullet>
  )
}

const bulletsTwitterEn: string[] = [
  'Check the email that you received from Twitter',
  'Click on the download link and store the file',
  'Choose the stored file and continue'
]

const bulletsTwitterNl: string[] = [
  'Ga naar de email die u ontvangen heeft van Twitter.',
  'Klik op de link "gedownload” en sla het bestand op',
  'Kies het bestand en ga verder.'
]

const bulletsFacebookEn: string[] = [
  'Check the email that you received from Facebook',
  'Click on the download link and store the file',
  'Choose the stored file and continue'
]

const bulletsFacebookNl: string[] = [
  'Ga naar de email die u ontvangen heeft van Facebook.',
  'Klik op de link “Je gegevens downloaden” en sla het bestand op.',
  'Kies het bestand en ga verder.'
]

const bulletsInstagramEn: string[] = [
  'Check the email that you received from Instagram',
  'Click on the download link and store the file',
  'Choose the stored file and continue'
]

const bulletsInstagramNl: string[] = [
  'Ga naar de email die u ontvangen heeft van Instagram.',
  'Klik op de link “Gegevens downloaden” en sla het bestand op.',
  'Kies het bestand en ga verder.'
]

const bulletsYoutubeEn: string[] = [
  'Check the email that you received from Google Takeout',
  'Click on the download link and store the file',
  'Choose the stored file and continue'
]

const bulletsYoutubeNl: string[] = [
  'Ga naar de email die u ontvangen heeft van Google Takeout.',
  'Klik op de link “Je bestanden downloaden” en sla het bestand op.',
  'Kies het bestand en ga verder.'
]

const bullets: Record<string, Record<string, string[]>> = {
  twitter: {
    en: bulletsTwitterEn,
    nl: bulletsTwitterNl
  },
  facebook: {
    en: bulletsFacebookEn,
    nl: bulletsFacebookNl
  },
  instagram: {
    en: bulletsInstagramEn,
    nl: bulletsInstagramNl
  },
  youtube: {
    en: bulletsYoutubeEn,
    nl: bulletsYoutubeNl
  }
}

function linkEn (link: string): JSX.Element {
  return <div>Click <span className='text-primary underline'><a href={link} target='_blank' rel='noreferrer'>here</a></span> for more extensive instructions</div>
}

function linkNl (link: string): JSX.Element {
  return <div>Klik <span className='text-primary underline'><a href={link} target='_blank' rel='noreferrer'>hier</a></span> voor uitgebreidere instructies</div>
}

const links: Record<string, Record<string, JSX.Element>> = {
  twitter: {
    en: linkEn(linkTwitter),
    nl: linkNl(linkTwitter)
  },
  facebook: {
    en: linkEn(linkFacebook),
    nl: linkNl(linkFacebook)
  },
  instagram: {
    en: linkEn(linkInstagram),
    nl: linkNl(linkInstagram)
  },
  youtube: {
    en: linkEn(linkYoutube),
    nl: linkNl(linkYoutube)
  }
}

const icon: Record<string, string> = {
  twitter: TwitterSvg,
  facebook: FacebookSvg,
  instagram: InstagramSvg,
  youtube: YoutubeSvg
}
