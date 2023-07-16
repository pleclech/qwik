import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';
import { viteAdapter, type ServerAdapterOptions } from '../../shared/vite';

/**
 * @alpha
 */
export function bunServerAdapter(opts: BunServerAdapterOptions = {}): any {
  const env = process?.env;
  return viteAdapter({
    name: opts.name || 'bun-server',
    origin: env?.ORIGIN ?? env?.URL ?? 'https://yoursitename.qwik.builder.io',
    ssg: opts.ssg,
    cleanStaticGenerated: true,

    config() {
      return {
        resolve: {
          conditions: ['webworker', 'worker'],
        },
        ssr: {
          target: 'webworker',
          noExternal: true,
        },
        build: {
          ssr: true,
          target: 'esnext',
          rollupOptions: {
            output: {
              format: 'es',
              hoistTransitiveImports: false,
            },
          },
        },
        publicDir: false,
      };
    },
  });
}

/**
 * @alpha
 */
export interface BunServerAdapterOptions extends ServerAdapterOptions {
  name?: string;
}

/**
 * @alpha
 */
export type { StaticGenerateRenderOptions };
