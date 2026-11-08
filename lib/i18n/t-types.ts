/**
 * Minimal translate-function type, compatible with next-intl's `t`.
 * Used by data factories (`memoT((t: TFn) => data)`) that build localized content.
 */
export type TFn = (
  key: string,
  values?: Record<string, string | number>,
) => string;

/**
 * Memoises a data factory per translate function, so repeated calls with the
 * same `t` return the same objects. Without this, identity checks such as
 * `list.indexOf(item)` would fail because every call would build new objects.
 */
export function memoT<R>(factory: (t: TFn) => R): (t: TFn) => R {
  const cache = new WeakMap<object, R>();
  return (t) => {
    if (cache.has(t)) return cache.get(t) as R;
    const value = factory(t);
    cache.set(t, value);
    return value;
  };
}
