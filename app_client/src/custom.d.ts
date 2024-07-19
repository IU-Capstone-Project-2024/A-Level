import { StaticImport } from 'next/dist/shared/lib/get-img-props';

declare module '*.svg' {
  const content: string | StaticImport;
  export default content;
}
