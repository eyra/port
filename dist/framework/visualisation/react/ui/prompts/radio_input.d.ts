/// <reference types="react" />
import { Weak } from '../../../../helpers';
import { ReactFactoryContext } from '../../factory';
import { PropsUIPromptRadioInput } from '../../../../types/prompts';
declare type Props = Weak<PropsUIPromptRadioInput> & ReactFactoryContext;
export declare const RadioInputFactory: (props: Props) => JSX.Element;
export declare const RadioInput: (props: Props) => JSX.Element;
export interface RadioItemProps {
    id: number;
    value: string;
    selected: boolean;
    onSelect: (id: number) => void;
}
export declare const RadioItem: ({ id, value, selected, onSelect }: RadioItemProps) => JSX.Element;
export {};
