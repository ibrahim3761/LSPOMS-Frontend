import type { FetchError } from "ofetch";

export function getErrorMessage(err: unknown) {
  const e = err as FetchError;
  return (
    e?.data?.message ||
    e?.message ||
    "Something went wrong. Please try again"
  );
}