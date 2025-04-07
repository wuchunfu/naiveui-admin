import { transformRecordToOption } from '@/utils/common';

export const GLOBAL_HEADER_MENU_ID = '__GLOBAL_HEADER_MENU__';

export const GLOBAL_SIDER_MENU_ID = '__GLOBAL_SIDER_MENU__';

export const themeSchemaRecord: Record<CommonType.ThemeMode, I18n.I18nKey> = {
  light: 'theme.themeSchema.light',
  dark: 'theme.themeSchema.dark',
  auto: 'theme.themeSchema.auto'
};

export const themeSchemaIcons: Record<CommonType.ThemeMode, string> = {
  light: 'material-symbols:sunny',
  dark: 'material-symbols:nightlight-rounded',
  auto: 'material-symbols:hdr-auto'
};

export const themeSchemaOptions = transformRecordToOption(themeSchemaRecord);

export const loginModuleRecord: Record<CommonType.LoginModule, I18n.I18nKey> = {
  'pwd-login': 'page.login.pwdLogin.title',
  'code-login': 'page.login.codeLogin.title',
  'qrcode-login': 'page.login.qrcodeLogin.title',
  'wechat-login': 'page.login.wechatLogin.title',
  'register': 'page.login.register.title',
  'reset-pwd': 'page.login.resetPwd.title'
};

export const themeLayoutModeRecord: Record<CommonType.ThemeLayoutMode, I18n.I18nKey> = {
  vertical: 'theme.layoutMode.vertical',
  'vertical-mix': 'theme.layoutMode.vertical-mix',
  horizontal: 'theme.layoutMode.horizontal',
  'horizontal-mix': 'theme.layoutMode.horizontal-mix'
};

export const themeLayoutModeOptions = transformRecordToOption(themeLayoutModeRecord);

export const themeScrollModeRecord: Record<CommonType.ThemeScrollMode, I18n.I18nKey> = {
  wrapper: 'theme.scrollMode.wrapper',
  content: 'theme.scrollMode.content'
};

export const themeScrollModeOptions = transformRecordToOption(themeScrollModeRecord);

export const themeTabModeRecord: Record<CommonType.ThemeTabMode, I18n.I18nKey> = {
  chrome: 'theme.tab.mode.chrome',
  button: 'theme.tab.mode.button'
};

export const themeTabModeOptions = transformRecordToOption(themeTabModeRecord);

export const themePageAnimationModeRecord: Record<CommonType.ThemePageAnimateMode, I18n.I18nKey> = {
  'fade-slide': 'theme.page.mode.fade-slide',
  fade: 'theme.page.mode.fade',
  'fade-bottom': 'theme.page.mode.fade-bottom',
  'fade-scale': 'theme.page.mode.fade-scale',
  'zoom-fade': 'theme.page.mode.zoom-fade',
  'zoom-out': 'theme.page.mode.zoom-out',
  none: 'theme.page.mode.none'
};

export const themePageAnimationModeOptions = transformRecordToOption(themePageAnimationModeRecord);
