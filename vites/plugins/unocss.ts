import process from 'node:process';
import path from 'node:path';
import UnoCss from '@unocss/vite';
import presetIcons from '@unocss/preset-icons';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';

export function setupUnocss(viteEnv: Env.ImportMeta) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX, VITE_ICON_LOCAL_PATH } = viteEnv;

  const srcPath = path.resolve(process.cwd(), 'src');

  const localIconPath = path.join(srcPath, VITE_ICON_LOCAL_PATH);

  /** The name of the local icon collection */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${ VITE_ICON_PREFIX }-`, '');

  return UnoCss({
    presets: [
      presetIcons({
        prefix: `${ VITE_ICON_PREFIX }-`,
        scale: 1,
        extraProperties: {
          display: 'inline-block'
        },
        collections: {
          [collectionName]: FileSystemIconLoader(localIconPath, svg =>
            svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
          )
        },
        warn: true
      })
    ]
  });
}
