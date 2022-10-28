import { Weak } from '../../../../helpers'
import { ReactFactoryContext } from '../../factory'
import { PropsUIPromptConfirm } from '../../../../types/prompts'
import { Translator } from '../../../../translator'
import { BodyLarge } from '../elements/text'
import { LabelButton, PrimaryButton } from '../elements/button'

type Props = Weak<PropsUIPromptConfirm> & ReactFactoryContext

export const Confirm = (props: Props): JSX.Element => {
  const { resolve } = props
  const { text, ok, cancel } = prepareCopy(props)

  function handleOk (): void {
    resolve?.({ __type__: 'PayloadTrue', value: true })
  }

  function handleCancel (): void {
    resolve?.({ __type__: 'PayloadFalse', value: false })
  }

  return (
    <>
      <BodyLarge text={text} margin='mb-4' />
      <div className='flex flex-row gap-4'>
        <PrimaryButton label={ok} onClick={handleOk} />
        <LabelButton label={cancel} onClick={handleCancel} />
      </div>
    </>
  )
}

interface Copy {
  text: string
  ok: string
  cancel: string
}

function prepareCopy ({ text, ok, cancel, locale }: Props): Copy {
  return {
    text: Translator.translate(text, locale),
    ok: Translator.translate(ok, locale),
    cancel: Translator.translate(cancel, locale)
  }
}
