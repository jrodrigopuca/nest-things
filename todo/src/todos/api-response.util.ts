// Utilidad para asegurar el formato APIResponse<T> y fusionar metadatos
export type Meta = Record<string, unknown>;
export interface APIResponse<T> {
  data: T;
  meta: Meta;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function toApiResponse<T = unknown>(
  body: unknown,
  extraMeta: Meta = {},
): APIResponse<T> {
  if (
    isPlainObject(body) &&
    'data' in body &&
    'meta' in body &&
    isPlainObject(body.meta)
  ) {
    const b = body as { data: T; meta: Meta };
    return {
      data: b.data,
      meta: { ...b.meta, ...extraMeta },
    };
  }
  return {
    data: body as T,
    meta: { ...extraMeta },
  };
}
