type ColumnType = 'image' | 'switch' | 'select' | 'date' | 'datetime' | 'avatar' | 'string' | 'tag' | 'number'

export type ColorType = 'success' | 'info' | 'warning' | 'error' | 'default'

export interface OptionsType {
  label: string;
  value: string | number;
  type?: ColorType;
}

export interface ITableColumn {
  // 表格字段
  field: string,
  // 表格标题
  title: string,
  type?: ColumnType,
  render?: Function,
  labelWidth?: number,
  height?: number,
  width?: number,
  fixed?: boolean | string,
  tree?: boolean,
  typeOptions?: {
    options?: OptionsType[],
    type?: any,
    multiple?: boolean,
    size?: 'small' | 'medium' | 'large' | number | any,
  },
  hide?: boolean,
  // 结尾
  suffix?: string
}
