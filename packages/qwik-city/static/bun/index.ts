import type { StaticGenerateOptions } from '../types';

export async function generate(_opts: StaticGenerateOptions) {
  console.error(`Bun not implemented`);
  Bun.exit(1);
}

declare const Bun: any;
