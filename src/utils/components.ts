export const classNames = (...names: (string | undefined)[]) =>
  names.filter(n => n != null).join(' ')
