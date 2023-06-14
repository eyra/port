import React from 'react'
import { PropsUIQuestionMultipleChoiceCheckbox } from '../../../../types/elements'
import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'

interface parentSetter {
  parentSetter: (arg: any) => any
}

type Props = PropsUIQuestionMultipleChoiceCheckbox & parentSetter & ReactFactoryContext

export const MultipleChoiceQuestionCheckbox = (props: Props): JSX.Element => {
  const { question, choices, id, parentSetter, locale } = props
  const [selectedChoices, setSelectedChoices] = React.useState<string[]>([]);

  const copy = prepareCopy(locale)

  const setParentState = ()  => {
    parentSetter((prevState: any) => {
       prevState[id] = selectedChoices
       return prevState
    })
  }

  React.useEffect(() => {
      setParentState()
  })


  const handleChoiceSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedChoices((prevSelectedChoices) => [
        ...prevSelectedChoices,
        value,
      ]);
    } else {
      setSelectedChoices((prevSelectedChoices) =>
        prevSelectedChoices.filter((choice) => choice !== value)
      );
    }
  };

  return (
    <div>
      <h3>{copy.question}</h3>
      <ul>
        {copy.choices.map((choice, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                name="choice"
                value={choice}
                checked={selectedChoices.includes(choice)}
                onChange={handleChoiceSelect}
              />
              {choice}
            </label>
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

