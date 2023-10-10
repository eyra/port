import React from 'react'
import { PropsUIQuestionMultipleChoiceCheckbox } from '../../../../types/elements'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'
import { Title3 } from './text'

interface parentSetter {
  parentSetter: (arg: any) => any
}

type Props = PropsUIQuestionMultipleChoiceCheckbox & parentSetter & ReactFactoryContext

export const MultipleChoiceQuestionCheckbox = (props: Props): JSX.Element => {
  const { question, choices, id, parentSetter, locale } = props
  const [selectedChoices, setSelectedChoices] = React.useState<string[]>([])

  const copy = prepareCopy(locale)

  const setParentState = (): any => {
    parentSetter((prevState: any) => {
      prevState[id] = selectedChoices
      return prevState
    })
  }

  React.useEffect(() => {
    setParentState()
  })

  const handleChoiceSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = event.target
    if (checked) {
      setSelectedChoices((prevSelectedChoices) => [
        ...prevSelectedChoices,
        value
      ])
    } else {
      setSelectedChoices((prevSelectedChoices) =>
        prevSelectedChoices.filter((choice) => choice !== value)
      )
    }
  }

  return (
    <div className='p-4'>
      <Title3 text={copy.question} />
      <ul className='mt-4 space-y-1'>
        {copy.choices.map((choice, index) => (
          <li key={index}>
            <label className='flex items-center'>
              <input
                type='checkbox'
                name='choice'
                value={choice}
                checked={selectedChoices.includes(choice)}
                onChange={handleChoiceSelect}
                className='mr-1 form-checkbox'
              />
              {choice}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  function prepareCopy (locale: string): Copy {
    return {
      choices: choices.map((choice) => Translator.translate(choice, locale)),
      question: Translator.translate(question, locale)
    }
  }
}

interface Copy {
  choices: string[]
  question: string
}
