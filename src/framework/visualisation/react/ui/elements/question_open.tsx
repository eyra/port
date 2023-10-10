import React from 'react'
import { PropsUIQuestionOpen } from '../../../../types/elements'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'

import { Title3 } from './text'

interface parentSetter {
  parentSetter: (arg: any) => any
}

type Props = PropsUIQuestionOpen & parentSetter & ReactFactoryContext

export const OpenQuestion = (props: Props): JSX.Element => {
  const { question, id, parentSetter, locale } = props
  const [userAnswer, setUserAnswer] = React.useState<string>('')
  const copy = prepareCopy(locale)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserAnswer(event.target.value)
  }

  const setParentState = (): any => {
    parentSetter((prevState: any) => {
      prevState[id] = userAnswer
      return prevState
    })
  }

  React.useEffect(() => {
    setParentState()
  })

  return (
    <div className='p-4'>
      <Title3 text={copy.question} />
      <input
        type='text'
        value={userAnswer}
        onChange={handleInputChange}
        className='w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md resize-none h-16'
      />
    </div>
  )

  function prepareCopy (locale: string): Copy {
    return {
      question: Translator.translate(question, locale)
    }
  }
}

interface Copy {
  question: string
}
