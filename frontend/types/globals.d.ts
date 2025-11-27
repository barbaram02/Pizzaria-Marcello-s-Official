declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.svg' {
  import { StaticImageData } from 'next/image'
  const content: StaticImageData
  export default content
}