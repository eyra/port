import * as React from 'react'
import Translatable from '../../../translatable'

export interface FileInputProps {
  title: any
  description: any
  extensions: string
  locale: string
  resolve: (value: any) => void
}

interface Copy {
  title: string
  description: string
  extensions: string
  selectButton: string
  continueButton: string
  resetButton: string
}

function prepareCopy ({ title, description, extensions, locale }: any): Copy {
  return {
    title: title.en,
    description: description.en,
    extensions: extensions,
    selectButton: selectButtonLabel().text(locale),
    continueButton: continueButtonLabel().text(locale),
    resetButton: resetButtonLabel().text(locale)
  }
}

export const FileInputFactory = (props: FileInputProps): JSX.Element => <FileInput {...props} />

const FileInput = (props: FileInputProps): JSX.Element => {
  const [selectedFile, setSelectedFile] = React.useState<File>()
  const [confirmHidden, setConfirmHidden] = React.useState<boolean>(true)
  const input = React.useRef<HTMLInputElement>(null)

  const { resolve } = props
  const { title, description, extensions, selectButton, continueButton, resetButton } = prepareCopy(props)

  function handleClick (): void {
    input.current?.click()
  }

  function handleReset (): void {
    handleClick()
  }

  function handleSelect (event: React.ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files
    if (files != null && files.length > 0) {
      setSelectedFile(files[0])
      setConfirmHidden(false)
    }
  }

  function handleConfirm (): void {
    resolve(selectedFile)
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
        <div className='mt-8' />
        <div className='flex flex-row'>
          <div className='flex-wrap cursor-pointer'>
            <div id='select-button' className='pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 bg-primary text-white' onClick={handleClick}>
              {selectButton}
            </div>
          </div>
        </div>
        <input ref={input} id='input' type='file' className='hidden' accept={extensions} onChange={handleSelect} />
        <div className='mt-8' />
      </div>

      <div id='confirm-panel' className={confirmHidden ? 'hidden' : ''}>
        <div className='flex flex-row'>
          <div className='flex-wrap bg-grey5 rounded'>
            <div className='flex flex-row h-14 px-5 items-center'>
              <div id='selected-filename' className='flex-wrap text-subhead font-subhead text-grey1'>{selectedFile?.name}</div>
            </div>
          </div>
        </div>
        <div className='mt-8' />
        <div className='text-bodylarge font-body text-grey1 text-left'>
          Continue with the selected file, or select again?
        </div>
        <div className='mt-4' />
        <div className='flex flex-row gap-4'>
          <div id='confirm-button' className='flex-wrap cursor-pointer'>
            <div className='pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 bg-primary text-white' onClick={handleConfirm}>
              {continueButton}
            </div>
          </div>
          <div id='reset-button' className='flex-wrap cursor-pointer'>
            <div className='pt-13px pb-13px active:pt-14px active:pb-3 active:shadow-top2px border-2 font-button text-button rounded bg-opacity-0 pr-4 pl-4 bg-delete text-delete' onClick={handleReset}>
              {resetButton}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const continueButtonLabel = (): Translatable => {
  return new Translatable()
    .add('en', 'Continue')
    .add('nl', 'Doorgaan')
}

const selectButtonLabel = (): Translatable => {
  return new Translatable()
    .add('en', 'Select file')
    .add('nl', 'Selecteer bestand')
}

const resetButtonLabel = (): Translatable => {
  return new Translatable()
    .add('en', 'Select again')
    .add('nl', 'Opnieuw')
}
