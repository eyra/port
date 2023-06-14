import React from 'react'
import { PropsUIQuestionMultipleChoice } from '../../../../types/elements'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'

interface parentSetter {
  parentSetter: (arg: any) => any
}

type Props = PropsUIQuestionMultipleChoice & parentSetter & ReactFactoryContext

export const MultipleChoiceQuestion = (props: Props): JSX.Element => {
  const { question, choices, id, parentSetter, locale } = props
  const [selectedChoice, setSelectedChoice] = React.useState<string>("");
  const [checkedArray, setCheckedArray] = React.useState(Array(choices.length).fill(false));

  const copy = prepareCopy(locale)

  const handleChoiceSelect = (choice: string, index: number) => {
    setSelectedChoice(choice)
    setCheckedArray(Array.from({ length: choices.length }, (_, i) => i === index))
  };

  const setParentState = ()  => {
    parentSetter((prevState: any) => {
       prevState[id] = selectedChoice
       return prevState
    })
  }

  React.useEffect(() => {
      setParentState()
  })

  return (
    <div>
      <h3>{copy.question}</h3>
      <ul>
        {copy.choices.map((choice, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name={`${index}-${id}`}
                value={choice}
                checked={checkedArray.at(index)}
                onChange={() => handleChoiceSelect(choice, index)}
              />
            </label>
            {choice}
          </li>
        ))}
      </ul>
    </div>
  );

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

