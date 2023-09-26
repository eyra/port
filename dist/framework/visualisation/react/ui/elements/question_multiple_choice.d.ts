/// <reference types="react" />
import { PropsUIQuestionMultipleChoice } from '../../../../types/elements';
import { ReactFactoryContext } from '../../factory';
interface parentSetter {
    parentSetter: (arg: any) => any;
}
type Props = PropsUIQuestionMultipleChoice & parentSetter & ReactFactoryContext;
export declare const MultipleChoiceQuestion: (props: Props) => JSX.Element;
export {};
