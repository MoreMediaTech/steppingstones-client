
/**
 * @description Type predicate to narrow an unknown error to `FetchBaseQueryError`
 * @param obj 
 * @returns 
 */
export function isFetchBaseQueryError(obj: unknown): obj is Error {
  return (
    typeof obj === "object" && obj !== null && "data" in obj && "status" in obj
  );
}


/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}
