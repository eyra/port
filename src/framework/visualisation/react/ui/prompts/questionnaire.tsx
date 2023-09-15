import React from 'react'
import { ReactFactoryContext } from '../../factory'
import { Weak } from '../../../../helpers'
import TextBundle from '../../../../text_bundle'
import { PrimaryButton } from '../elements/button'
import { PropsUIPromptQuestionnaire } from '../../../../types/prompts'
import { Translator } from '../../../../translator'
import { isPropsUIQuestionMultipleChoice, isPropsUIQuestionMultipleChoiceCheckbox, isPropsUIQuestionOpen } from '../../../../types/elements'
import { MultipleChoiceQuestion } from '../../ui/elements/question_multiple_choice'
import { MultipleChoiceQuestionCheckbox } from '../../ui/elements/question_multiple_choice_checkbox'
import { OpenQuestion } from '../../ui/elements/question_open'

interface Copy {
  description: string
  continueLabel: string
}

type Props = Weak<PropsUIPromptQuestionnaire> & ReactFactoryContext

export const Questionnaire = (props: Props): JSX.Element => {
  const { questions, description, resolve, locale } = props
  const [answers, setAnswers] = React.useState<{}>({})
  const copy = prepareCopy(locale)

  function handleDonate (): void {
    const value = JSON.stringify(answers)
    resolve?.({ __type__: 'PayloadJSON', value })
  }

  // Still here in case case we need a cancel button click event handler
  // function handleCancel (): void {
  //   resolve?.({ __type__: 'PayloadFalse', value: false })
  // }

  const renderQuestion = (item: any): JSX.Element => {
    if (isPropsUIQuestionMultipleChoice(item)) {
      return (
        <div key={item.id}>
          <MultipleChoiceQuestion {...item} locale={locale} parentSetter={setAnswers} />
        </div>
      )
    }
    if (isPropsUIQuestionMultipleChoiceCheckbox(item)) {
      return (
        <div key={item.id}>
          <MultipleChoiceQuestionCheckbox {...item} locale={locale} parentSetter={setAnswers} />
        </div>
      )
    }
    if (isPropsUIQuestionOpen(item)) {
      return (
        <div key={item.id}>
          <OpenQuestion {...item} locale={locale} parentSetter={setAnswers} />
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }

  const renderQuestions = (): JSX.Element[] => {
    return questions.map((item) => renderQuestion(item))
  }

  return (
    <div>
      <div className='flex-wrap text-bodylarge font-body text-grey1 text-left'>
        {copy.description}
      </div>
      <div>
        {renderQuestions()}
      </div>
      <div className='flex flex-row gap-4 mt-4 mb-4'>
        <PrimaryButton label={copy.continueLabel} onClick={handleDonate} color='bg-success text-white' />
      </div>
    </div>
  )

  function prepareCopy (locale: string): Copy {
    return {
      description: Translator.translate(description, locale),
      continueLabel: Translator.translate(continueLabel, locale)
    }
  }
}

const continueLabel = new TextBundle()
  .add('en', 'Continue')
  .add('nl', 'Verder')
