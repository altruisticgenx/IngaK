export type DebouncedFn<T extends (...args: unknown[]) => void> = T & {
  cancel: () => void;
};

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): DebouncedFn<T> {
  let timer: ReturnType<typeof setTimeout>;

  const debounced = ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as DebouncedFn<T>;

  debounced.cancel = () => clearTimeout(timer);

  return debounced;
}
