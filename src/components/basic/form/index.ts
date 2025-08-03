import type { SelectOption } from 'naive-ui'
import { FormItemRule, FormRules, GridItemProps, GridProps } from "naive-ui";
import type { ButtonProps } from 'naive-ui/lib/button';
import { REGEXP_PHONE } from "@/constants/regexp";
import { cloneDeep } from "lodash-es";

export type FieldType =
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
  | 'password'

export type FiledRuleType = 'string' | 'number' | 'array' | 'boolean' | string | undefined

interface FieldOptions {
  options?: SelectOption[];
  required?: boolean;
  placeholder?: string;
  suffix?: string;
  prefix?: string;
  disabled?: boolean;
  multiple?: boolean;
  max?: number;
  min?: number;
  validate?: Array<FormItemRule>;
  clearable?: boolean;
  fixedNumber?: [number, number];

  [key: string]: any;
}

interface SwitchOptions {
  checkedValue?: string | number | boolean;
  uncheckedValue?: string | number | boolean;
}

export interface BaseFormItemProps {
  field: string;
  fieldType: FieldType;
  label: string;
  /** 标题解释 */
  labelMessage?: string;
  /**
   * 默认值
   */
  defaultValue?: any;
  required?: boolean;
  isSearch?: boolean;
  isFull?: boolean;
  suffix?: string;
  ruleType?: FiledRuleType;
  fieldOptions?: FieldOptions;
  switchOptions?: SwitchOptions;
  customRule?: Array<FormItemRule>;
  giProps?: GridItemProps;
  slot?: string;
}

export interface BaseFormProps {
  data: Object;
  items: Array<BaseFormItemProps>;
  size?: 'small' | 'medium' | 'large';
  /** 标签的宽度，在 label-placement 是 'left' 的时候可能会有用，'auto' 意味着 label width 会被自动调整*/
  labelWidth?: number | string | 'auto';
  /** 标签显示的位置 */
  labelPlacement?: 'top' | 'left';
  /** 标签的文本对齐方式 */
  labelAlign?: 'left' | 'right';
  /** 是否展示标签 */
  showLabel?: boolean;
  /** 是否展示为行内表单 */
  inline?: boolean;
  /** 是否禁用所有表单项 */
  disabled?: boolean;
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
        if (['string'].includes(item?.fieldType)) {
          ruleType = 'string'
        } else if (['select-user', 'select'].includes(item?.fieldType) && item.fieldOptions?.multiple) {
          ruleType = 'array'
        } else if (['slider', 'number'].includes(item?.fieldType)) {
          ruleType = 'number'
        } else if (item.fieldType === 'switch') {
          ruleType = 'boolean'
        } else if (['map'].includes(item.fieldType)) {
          ruleType = 'string'
        } else if (['facility', 'policy'].includes(item.fieldType)) {
          ruleType = 'array'
        } else {
          ruleType = 'string'
        }
      }
      switch (item.fieldType) {
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

/**
 * 初始化表单数据
 *
 * @param rawData
 * @param formItems
 */
export function useFormData(
  rawData: Record<string, any>,
  formItems: Array<{ field: string; defaultValue?: any }>
) {
  const data = {} as Record<string, any>

  for (const item of formItems) {
    if (item.field in rawData) {
      data[item.field] = rawData[item.field]
    } else if (item.defaultValue !== undefined) {
      data[item.field] = cloneDeep(item.defaultValue)
    }
  }
  return data
}
