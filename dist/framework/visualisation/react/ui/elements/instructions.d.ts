/// <reference types="react" />
import { ReactFactoryContext } from '../../factory';
interface InstructionsProps {
    platform: string;
    locale: string;
}
type Props = InstructionsProps & ReactFactoryContext;
export declare const Instructions: (props: Props) => JSX.Element;
export {};
