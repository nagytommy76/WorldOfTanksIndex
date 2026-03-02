export type KeyValuePairs<T> = {
   [Key in keyof T]: [Key, T[Key]]
}[keyof T][]
