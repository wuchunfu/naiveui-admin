import { FormItemRule, FormRules, GridItemProps, GridProps } from "naive-ui";
import type { ButtonProps } from 'naive-ui/lib/button';
import { REGEXP_PHONE } from "@/constants/regexp";

export type FiledType =
  'string'
  | 'number'
  | 'select'
  | 'select-user'
  | 'switch'
  | 'date'
  | 'datetime'
  | 'img'
  | 'textarea'
  | 'upload'
  | 'radio'
  | 'tag'
  | 'facility'
  | 'policy'
  | 'map'
  | 'slider'
  | 'crop-img'
  | 'btn-group'
  | 'phone'

export type FiledRuleType = 'string' | 'number' | 'array' | 'boolean' | string | undefined

interface FiledOptions {
  options?: any[],
  required?: boolean,
  placeholder?: string,
  suffix?: string,
  prefix?: string,
  disabled?: boolean,
  multiple?: boolean,
  max?: number,
  min?: number,
  validate?: Array<FormItemRule>,
  clearable?: boolean,
  fixedNumber?: [number, number],

  [key: string]: any;
}

export interface BaseFormItemProps {
  label: string,
  field: string,
  /** 标题解释 */
  labelMessage?: string;
  required?: boolean,
  filedType: FiledType,
  ruleType?: FiledRuleType,
  filedOptions?: FiledOptions,
  slot?: string,
  giProps?: GridItemProps;
  customRule?: Array<FormItemRule>
  isFull?: boolean;
  isSearch?: boolean,
  suffix?: string;
}

export interface BaseFormProps {
  data: Object,
  items: Array<BaseFormItemProps>,
  size?: 'small' | 'medium' | 'large',
  /** 标签的宽度，在 label-placement 是 'left' 的时候可能会有用，'auto' 意味着 label width 会被自动调整*/
  labelWidth?: number | string | 'auto',
  /** 标签显示的位置 */
  labelPlacement?: 'top' | 'left',
  /** 标签的文本对齐方式 */
  labelAlign?: 'left' | 'right',
  /** 是否展示标签 */
  showLabel?: boolean,
  /** 是否展示为行内表单 */
  inline?: boolean,
  /** 是否禁用所有表单项 */
  disabled?: boolean,
  /** 是否full */
  isFull?: boolean;
  /** 是否搜索 搜索模式没有rule */
  isSearch?: boolean;
  gridProps?: GridProps;
  giProps?: GridItemProps;
  /** 默认展示的行数  */
  collapsedRows?: number;
  /** 是否显示操作按钮 */
  showActionGroup?: boolean;
  /** 提交按钮文字 */
  submitText?: string;
  resetText?: string;
  // 确认按钮配置
  submitButtonOptions?: ButtonProps;
  resetButtonOptions?: ButtonProps;
}

// 生成rules
export function generateRules(items: Array<BaseFormItemProps>): FormRules {
  const rules: FormRules = {};
  items.forEach((item: BaseFormItemProps) => {
    let itemRules: any[] = [];
    if (item?.required) {
      let ruleType: FiledRuleType = item?.ruleType
      if (!ruleType) {
        if (['string'].includes(item?.filedType)) {
          ruleType = 'string'
        } else if (['select-user', 'select'].includes(item?.filedType) && item.filedOptions?.multiple) {
          ruleType = 'array'
        } else if (['slider', 'number'].includes(item?.filedType)) {
          ruleType = 'number'
        } else if (item.filedType === 'switch') {
          ruleType = 'boolean'
        } else if (['map'].includes(item.filedType)) {
          ruleType = 'string'
        } else if (['facility', 'policy'].includes(item.filedType)) {
          ruleType = 'array'
        } else {
          ruleType = 'string'
        }
      }
      switch (item.filedType) {
        case "map":
          itemRules.push({
            required: true,
            message: item.label + '为必填项',
            validator: (rule: FormItemRule, value: any) => {
              if (value != undefined && value.address) {
                return Promise.resolve()
              } else {
                return Promise.reject(new Error('请选择地图坐标'))
              }
            },
            trigger: ['blur']
          })
          break;
        case "phone":
          itemRules.push({
            required: true,
            pattern: REGEXP_PHONE,
            message: '手机号码格式不正确',
            trigger: 'input'
          })
          break;
        default:
          if (item.customRule) {
            itemRules.push(...item.customRule)
          } else {
            itemRules.push({
              required: true,
              type: ruleType,
              message: item.label + '为必填项',
              trigger: ['blur']
            })
          }
      }
    }
    rules[item.field] = itemRules;
  });
  return rules;
}
