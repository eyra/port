import { Weak } from '../../../../helpers'
import * as React from 'react'
import { Translatable } from '../../../../types/elements'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'
import { PropsUIPromptFileInput } from '../../../../types/prompts'
import { PrimaryButton } from '../elements/button'
import { BodyLarge, BodySmall } from '../elements/text'

type Props = Weak<PropsUIPromptFileInput> & ReactFactoryContext

export const FileInput = (props: Props): JSX.Element => {
  const [waiting, setWaiting] = React.useState<boolean>(false)
  const [selectedFile, setSelectedFile] = React.useState<File>()
  const input = React.useRef<HTMLInputElement>(null)

  const { resolve } = props
  const { description, note, placeholder, extensions, selectButton, continueButton } = prepareCopy(props)

  function handleClick (): void {
    input.current?.click()
  }

  function handleSelect (event: React.ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files
    if (files != null && files.length > 0) {
      setSelectedFile(files[0])
    } else {
      console.log('[FileInput] Error selecting file: ' + JSON.stringify(files))
    }
  }

  function handleConfirm (): void {
    if (selectedFile !== undefined && !waiting) {
      setWaiting(true)
      resolve?.({ __type__: 'PayloadFile', value: selectedFile })
    }
  }

  return (
    <>
      <div id='select-panel' className='max-w-3xl'>
        <div className='flex-wrap text-bodylarge font-body text-grey1 text-left'>{description}</div>
        <div className='mt-8' />
        <div className='p-6 border-grey4 border-2 rounded'>
          <input ref={input} id='input' type='file' className='hidden' accept={extensions} onChange={handleSelect} />
          <div className='flex flex-row gap-4 items-center'>
            <BodyLarge text={selectedFile?.name ?? placeholder} margin='' color={selectedFile === undefined ? 'text-grey2' : 'textgrey1'} />
            <div className='flex-grow' />
            <PrimaryButton onClick={handleClick} label={selectButton} color='bg-tertiary text-grey1' />
          </div>
        </div>
        <div className='mt-4' />
        <div className={`${selectedFile === undefined ? 'opacity-30' : 'opacity-100'}`}>
          <BodySmall text={note} margin='' />
          <div className='mt-8' />
          <div className='flex flex-row gap-4'>
            <PrimaryButton label={continueButton} onClick={handleConfirm} enabled={selectedFile !== undefined} spinning={waiting} />
          </div>
        </div>
      </div>
    </>
  )
}

interface Copy {
  description: string
  note: string
  placeholder: string
  extensions: string
  selectButton: string
  continueButton: string
}

function prepareCopy ({ description, extensions, locale }: Props): Copy {
  return {
    description: Translator.translate(description, locale),
    note: Translator.translate(note(), locale),
    placeholder: Translator.translate(placeholder(), locale),
    extensions: extensions,
    selectButton: Translator.translate(selectButtonLabel(), locale),
    continueButton: Translator.translate(continueButtonLabel(), locale)
  }
}

const continueButtonLabel = (): Translatable => {
  return new TextBundle().add('en', 'Continue').add('nl', 'Verder')
}

const selectButtonLabel = (): Translatable => {
  return new TextBundle().add('en', 'Choose file').add('nl', 'Kies bestand')
}

const note = (): Translatable => {
  return new TextBundle()
    .add('en', 'Note: The process to extract the correct data from the file is done on your own computer. No data is stored or sent yet.')
    .add(
      'nl',
      'NB: Het proces om de juiste gegevens uit het bestand te halen gebeurt op uw eigen computer. Er worden nog geen gegevens opgeslagen of verstuurd.'
    )
}

const placeholder = (): Translatable => {
  return new TextBundle().add('en', 'Choose a file').add('nl', 'Kies een bestand')
}
