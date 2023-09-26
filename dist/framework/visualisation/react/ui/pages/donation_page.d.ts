/// <reference types="react" />
import { Weak } from '../../../../helpers';
import { PropsUIPageDonation } from '../../../../types/pages';
import { ReactFactoryContext } from '../../factory';
type Props = Weak<PropsUIPageDonation> & ReactFactoryContext;
export declare const DonationPage: (props: Props) => JSX.Element;
export {};
