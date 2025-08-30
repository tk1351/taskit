type OkResultType<T> = { ok: true; data: T };
export type ErrorResultType<E> = { ok: false; error: E };

export type Result<T, E> = OkResultType<T> | ErrorResultType<E>;
