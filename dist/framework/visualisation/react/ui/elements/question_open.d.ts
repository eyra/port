/// <reference types="react" />
import { PropsUIQuestionOpen } from '../../../../types/elements';
import { ReactFactoryContext } from '../../factory';
interface parentSetter {
    parentSetter: (arg: any) => any;
}
type Props = PropsUIQuestionOpen & parentSetter & ReactFactoryContext;
export declare const OpenQuestion: (props: Props) => JSX.Element;
export {};
