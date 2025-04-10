import { addAPIProvider } from '@iconify/vue';

/** Setup the iconify offline */
export const setupIconifyOffline = () => {
  const { VITE_ICONIFY_URL } = import.meta.env;

  if (VITE_ICONIFY_URL) {
    addAPIProvider('', { resources: [VITE_ICONIFY_URL] });
  }
};
