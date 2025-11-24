export const isNonNullable = <I>(input: I): input is NonNullable<I> =>
  input !== undefined && input !== null

export function assert<I>(input: I, message = 'Assertion failed'): asserts input {
  if (isNonNullable(input)) {
    return
  }

  throw new Error(message)
}
