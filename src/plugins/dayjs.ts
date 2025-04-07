import { extend } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { setDayjsLocale } from '@/locales/dayjs';

export const setupDayjs = () => {
  extend(localeData);

  setDayjsLocale();
};
