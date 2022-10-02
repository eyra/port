/// <reference types="react" />
interface TableProps {
    id: string;
    header: TableHeadProps;
    body: TableBodyProps;
}
export declare const TableFactory: (props: TableProps) => JSX.Element;
export declare const Table: ({ id, header, body }: TableProps) => JSX.Element;
interface TableHeadProps {
    cells: string[];
}
export declare const TableHead: ({ cells }: TableHeadProps) => JSX.Element;
interface TableBodyProps {
    rows: TableRowProps[];
}
export declare const TableBody: ({ rows }: TableBodyProps) => JSX.Element;
interface TableRowProps {
    header?: boolean;
    cells: string[];
}
export declare const TableRow: ({ header, cells }: TableRowProps) => JSX.Element;
interface TableCellProps {
    header?: boolean;
    cell: string;
}
export declare const TableCell: ({ header, cell }: TableCellProps) => JSX.Element;
export {};
