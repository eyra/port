import React from 'react'
import { PropsUIQuestionOpen } from '../../../../types/elements'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'

interface parentSetter {
  parentSetter: (arg: any) => any
}

type Props = PropsUIQuestionOpen & parentSetter & ReactFactoryContext

export const OpenQuestion = (props: Props): JSX.Element => {

  const { question, id, parentSetter, locale } = props
  const [userAnswer, setUserAnswer] = React.useState<string>("");
  const copy = prepareCopy(locale)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const setParentState = ()  => {
    parentSetter((prevState: any) => {
       prevState[id] = userAnswer
       return prevState
    })
  }

  React.useEffect(() => {
      setParentState()
  })

  return (
    <div>
      <h3>{copy.question}</h3>
      <input
        type="text"
        value={userAnswer}
        onChange={handleInputChange}
      />
    </div>
  );

  function prepareCopy (locale: string): Copy {
    return {
      question: Translator.translate(question, locale)
    }
  }
}

interface Copy {
  question: string
}

