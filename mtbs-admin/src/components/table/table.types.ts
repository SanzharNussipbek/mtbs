export type Alignment = 'center' | 'inherit' | 'justify' | 'left' | 'right';

export type Column = { title: string; field?: string; align?: Alignment; disableSort?: boolean; width?: number;};

export type Row = { [key: string]: any };
