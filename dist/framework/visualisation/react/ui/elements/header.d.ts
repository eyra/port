/// <reference types="react" />
import { Weak } from '../../../../helpers';
import { PropsUIHeader } from '../../../../types/elements';
import { ReactFactoryContext } from '../../factory';
type Props = Weak<PropsUIHeader> & ReactFactoryContext;
export declare const Header: (props: Props) => JSX.Element;
export {};
