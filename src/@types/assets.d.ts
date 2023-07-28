// add any format of image
declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

// add scss
declare module '*.scss' {
  const content: any;
  export default content;
}

// lodash.debounce в 2023-м году имеет старые типы которые на React18 не налазят, обнов больше нет
// поэтому это один из вариантов, как исправить ошибку типизации
declare module 'lodash.debounce' {
  const content: any;
  export default content;
}
