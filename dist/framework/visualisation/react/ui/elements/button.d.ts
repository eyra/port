/// <reference types="react" />
import { Weak } from '../../../../helpers';
import { PropsUIButtonBack, PropsUIButtonForward, PropsUIButtonLabel, PropsUIButtonPrimary, PropsUIButtonSecundary } from '../../../../types/elements';
export declare const PrimaryButton: ({ label, color, onClick }: Weak<PropsUIButtonPrimary>) => JSX.Element;
export declare const SecondaryButton: ({ label, color, onClick }: Weak<PropsUIButtonSecundary>) => JSX.Element;
export declare const BackButton: ({ label, onClick }: Weak<PropsUIButtonBack>) => JSX.Element;
export declare const ForwardButton: ({ label, onClick }: Weak<PropsUIButtonForward>) => JSX.Element;
export declare const LabelButton: ({ label, color, onClick }: Weak<PropsUIButtonLabel>) => JSX.Element;
