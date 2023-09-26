/// <reference types="react" />
import { ReactFactoryContext } from '../../factory';
import { Weak } from '../../../../helpers';
import { PropsUIPromptQuestionnaire } from '../../../../types/prompts';
type Props = Weak<PropsUIPromptQuestionnaire> & ReactFactoryContext;
export declare const Questionnaire: (props: Props) => JSX.Element;
export {};
