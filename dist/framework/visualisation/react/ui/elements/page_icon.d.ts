/// <reference types="react" />
interface PropsUIPageIcon {
    index: number;
    selected: boolean;
    onClick: () => void;
}
type Props = PropsUIPageIcon;
export declare const PageIcon: ({ index, selected, onClick }: Props) => JSX.Element;
export {};
