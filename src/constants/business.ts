import { transformRecordToI18n } from '@/utils/common';

export const enableStatusRecord: Record<CommonType.EnableStatus, I18n.I18nKey> = {
  '1': 'page.manage.common.status.enable',
  '2': 'page.manage.common.status.disable'
};

export const enableStatusOptions = transformRecordToI18n(enableStatusRecord);

export const userGenderRecord: Record<CommonType.UserGender, I18n.I18nKey> = {
  '1': 'page.manage.user.gender.male',
  '2': 'page.manage.user.gender.female'
};

export const userGenderOptions = transformRecordToI18n(userGenderRecord);

export const menuTypeRecord: Record<CommonType.MenuType, I18n.I18nKey> = {
  '1': 'page.manage.menu.type.directory',
  '2': 'page.manage.menu.type.menu'
};

export const menuTypeOptions = transformRecordToI18n(menuTypeRecord);

export const menuIconTypeRecord: Record<CommonType.IconType, I18n.I18nKey> = {
  '1': 'page.manage.menu.iconType.iconify',
  '2': 'page.manage.menu.iconType.local'
};

export const menuIconTypeOptions = transformRecordToI18n(menuIconTypeRecord);
