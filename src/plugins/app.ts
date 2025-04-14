import { App, h } from 'vue';
import { $t } from '@/locales';
import { NButton } from 'naive-ui';

export const setupAppErrorHandle = (app: App) => {
  app.config.errorHandler = (err, vm, info) => {
    // eslint-disable-next-line no-console
    console.error(err, vm, info);
  };
};

export const setupAppVersionNotification = () => {
  let isShow = false;

  document.addEventListener('visibilitychange', async () => {
    const preConditions = [!isShow, document.visibilityState === 'visible', !import.meta.env.VITE_SERVICE_ENV];

    if (!preConditions.every(Boolean)) {
      return;
    }

    const buildTime = await getHtmlBuildTime();

    if (buildTime === BUILD_TIME) {
      return;
    }

    isShow = true;

    const n = window.$notification?.create({
      title: $t('system.updateTitle'),
      content: $t('system.updateContent'),
      action() {
        return h('div', { style: { display: 'flex', justifyContent: 'end', gap: '12px', width: '325px' } }, [
          h(
            NButton,
            {
              onClick() {
                n?.destroy();
              }
            },
            () => $t('system.updateCancel')
          ),
          h(
            NButton,
            {
              type: 'primary',
              onClick() {
                location.reload();
              }
            },
            () => $t('system.updateConfirm')
          )
        ]);
      },
      onClose() {
        isShow = false;
      }
    });
  });
};

const getHtmlBuildTime = async () => {
  const basePath = import.meta.env.VITE_BASE_PATH;

  const res = await fetch(`${ basePath }index.html`);

  const html = await res.text();

  const match = html.match(/<meta name="buildTime" content="(.*)">/);

  return match?.[1] || '';
};
