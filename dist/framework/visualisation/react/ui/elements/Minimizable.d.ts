import { ReactNode } from 'react';
interface Props {
    children: ReactNode;
    size?: string;
    fullSize?: boolean;
    minimized?: ReactNode;
}
export declare const Minimizable: ({ children, size, fullSize, minimized }: Props) => JSX.Element;
export {};
