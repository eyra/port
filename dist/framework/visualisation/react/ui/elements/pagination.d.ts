/// <reference types="react" />
export interface Props {
    page: number;
    setPage: (page: number) => void;
    nPages: number;
}
export declare const Pagination: ({ page, setPage, nPages }: Props) => JSX.Element;
