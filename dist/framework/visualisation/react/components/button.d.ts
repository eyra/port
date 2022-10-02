/// <reference types="react" />
interface ButtonProps {
    label: string;
    color?: string;
    onClick: () => void;
}
export declare const PrimaryButtonFactory: (props: ButtonProps) => JSX.Element;
export declare const PrimaryButton: ({ label, color, onClick }: ButtonProps) => JSX.Element;
interface ButtonProps {
    label: string;
    color?: string;
    onClick: () => void;
}
export declare const SecondaryButtonFactory: (props: ButtonProps) => JSX.Element;
export declare const SecondaryButton: ({ label, color, onClick }: ButtonProps) => JSX.Element;
export {};
