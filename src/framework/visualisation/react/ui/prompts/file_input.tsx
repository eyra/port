import { Weak } from '../../../../helpers'
import * as React from 'react'
import { Translatable } from '../../../../types/elements'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'
import { PropsUIPromptFileInput } from '../../../../types/prompts'
import { PrimaryButton } from '../elements/button'

type Props = Weak<PropsUIPromptFileInput> & ReactFactoryContext

export const FileInput = (props: Props): JSX.Element => {
  const [selectedFile, setSelectedFile] = React.useState<File>()
  const [confirmHidden, setConfirmHidden] = React.useState<boolean>(true)
  const input = React.useRef<HTMLInputElement>(null)

  const { resolve } = props
  const { title, description, extensions, selectButton, continueButton } = prepareCopy(props)

  function handleClick (): void {
    input.current?.click()
  }

  function handleSelect (event: React.ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files
    if (files != null && files.length > 0) {
      setSelectedFile(files[0])
      setConfirmHidden(false)
    } else {
      console.log('[FileInput] Error selecting file: ' + JSON.stringify(files))
    }
  }

  function handleConfirm (): void {
    if (selectedFile !== undefined) {
      resolve?.({ __type__: 'PayloadFile', value: selectedFile })
    }
  }

  return (
    <>
      <div className='text-title5 font-title5 sm:text-title4 sm:font-title4 lg:text-title3 lg:font-title3 text-grey1'>
        {title}
      </div>
      <div className='mt-8' />

      <div id='select-panel'>
        <div className='flex-wrap text-bodylarge font-body text-grey1 text-left'>
          {description}
        </div>
        <div className='mt-4' />
        <div className='flex flex-row items-center gap-4'>
          <div className='flex-wrap cursor-pointer'>
            <div id='select-button' className='pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 bg-primary text-white' onClick={handleClick}>
              {selectButton}
            </div>
          </div>
          <div className='flex-wrap'>
            <div id='selected-filename' className='flex-wrap text-subhead font-subhead text-grey1'>{selectedFile?.name}</div>
          </div>
        </div>
        <input ref={input} id='input' type='file' className='hidden' accept={extensions} onChange={handleSelect} />
      </div>
      <div className='mt-10' />

      <div className='flex flex-row gap-4 items-center'>
        <div className={confirmHidden ? 'hidden' : ''}>
          <PrimaryButton label={continueButton} onClick={handleConfirm} color='bg-tertiary text-grey1' />
        </div>
      </div>
    </>
  )
}

interface Copy {
  title: string
  description: string
  extensions: string
  selectButton: string
  continueButton: string
}

function prepareCopy ({ title, description, extensions, locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale),
    description: Translator.translate(description, locale),
    extensions: extensions,
    selectButton: Translator.translate(selectButtonLabel(), locale),
    continueButton: Translator.translate(continueButtonLabel(), locale)
  }
}

const continueButtonLabel = (): Translatable => {
  return new TextBundle()
    .add('en', 'Continue')
    .add('nl', 'Doorgaan')
}

const selectButtonLabel = (): Translatable => {
  return new TextBundle()
    .add('en', 'Choose file')
    .add('nl', 'Kies bestand')
}
