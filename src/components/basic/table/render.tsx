import { NAvatar, NImage, NSpace, NTag } from 'naive-ui'
import { unref } from "vue";
import { ITableColumn, OptionsType } from "./index";

export function generateTableColumnRender(field: ITableColumn) {
  let res: any;
  switch (field.type) {
    case "switch":
      res = (data: any) => {
        const selectedValues = data[field.field];
        const options = unref(field?.typeOptions?.options);
        if (options && options.length > 0) {
          return (
            <NSpace size='small' justify='center'>
              {
                options
                  .filter((item: OptionsType) => item.value === selectedValues)
                  .map((item: OptionsType, index: number) => (
                    <NTag
                      key={ index }
                      round
                      type={ item.type ?? 'primary' }
                      size='small'
                    >
                      { item.label }
                    </NTag>
                  ))
              }
            </NSpace>
          )
        }
        return <span>{ selectedValues }</span>;
      };
      break;
    case "select":
      res = (data: any) => {
        const selectedValues = data[field.field];
        const options = unref(field?.typeOptions?.options);
        if (options && options.length > 0) {
          return (
            <NSpace size='small' justify='center'>
              {
                options
                  .filter((item: OptionsType) =>
                    field?.typeOptions?.multiple
                      ? selectedValues?.includes(item.value)
                      : item.value === selectedValues
                  )
                  .map((item: OptionsType, index: number) => (
                    <NTag
                      key={ index }
                      round
                      type={ item.type ?? 'primary' }
                      size='small'
                    >
                      { item.label }
                    </NTag>
                  ))
              }
            </NSpace>
          );
        }
        return <span>{ selectedValues }</span>;
      };
      break;
    case "date":
    case "datetime":
      res = (data: any) => {
        return (
          <span>{ data[field.field] }</span>
        )
      }
      break
    case "avatar":
      res = (data: any) => {
        return (
          <NAvatar
            round
            size={ field?.typeOptions?.size }
            src={ data[field.field] }
          />
        )
      }
      break
    case "image":
      res = (data: any) => {
        return (
          <NImage
            src={ data[field.field] }
            width={ field.width }
            height={ field.height }
          />
        )
      }
      break
    case "tag":
      res = (data: any) => {
        return (
          <NTag
            round
            type={ field?.typeOptions?.type ?? 'primary' }
            size={ field?.typeOptions?.size ?? 'small' }
          >
            { data[field.field] }
          </NTag>
        )
      }
      break
    default:
      res = (data: any) => {
        return (
          <span>{ data[field.field] }{ field.suffix }</span>
        )
      }
  }
  return res;
}
