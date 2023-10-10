/// <reference types="react" />
import { PropsUIQuestionMultipleChoiceCheckbox } from '../../../../types/elements';
import { ReactFactoryContext } from '../../factory';
interface parentSetter {
    parentSetter: (arg: any) => any;
}
type Props = PropsUIQuestionMultipleChoiceCheckbox & parentSetter & ReactFactoryContext;
export declare const MultipleChoiceQuestionCheckbox: (props: Props) => JSX.Element;
export {};
