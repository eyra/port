/// <reference types="react" />
import { Weak } from '../../../../helpers';
import { PropsUIButtonBack, PropsUIButtonForward, PropsUIButtonIcon, PropsUIButtonIconBack, PropsUIButtonIconForward, PropsUIButtonIconLabel, PropsUIButtonLabel, PropsUIButtonPrimary, PropsUIButtonSecundary } from '../../../../types/elements';
export declare const PrimaryButton: ({ label, spinning, enabled, color, onClick }: Weak<PropsUIButtonPrimary>) => JSX.Element;
export declare const SecondaryButton: ({ label, color, onClick }: Weak<PropsUIButtonSecundary>) => JSX.Element;
export declare const BackButton: ({ label, onClick }: Weak<PropsUIButtonBack>) => JSX.Element;
export declare const ForwardButton: ({ label, onClick }: Weak<PropsUIButtonForward>) => JSX.Element;
export declare const BackIconButton: ({ onClick }: Weak<PropsUIButtonIconBack>) => JSX.Element;
export declare const ForwardIconButton: ({ onClick }: Weak<PropsUIButtonIconForward>) => JSX.Element;
export declare const IconButton: ({ icon, onClick }: Weak<PropsUIButtonIcon>) => JSX.Element;
export declare const IconLabelButton: ({ icon, label, color, alignment, onClick }: Weak<PropsUIButtonIconLabel>) => JSX.Element;
export declare const LabelButton: ({ label, color, onClick }: Weak<PropsUIButtonLabel>) => JSX.Element;
