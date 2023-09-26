/// <reference types="react" />
import { Weak } from '../../../../helpers';
import { PropsUIPageError } from '../../../../types/pages';
import { ReactFactoryContext } from '../../factory';
type Props = Weak<PropsUIPageError> & ReactFactoryContext;
export declare const ErrorPage: (props: Props) => JSX.Element;
export {};
