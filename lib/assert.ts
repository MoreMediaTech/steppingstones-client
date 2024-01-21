
export function assert(condition: any, msg = 'Generic Assertion'): asserts condition {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`)
  }
}