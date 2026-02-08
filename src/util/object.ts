/**
 *
 * @param obj Any object
 * @returns The same object but with no properties whose value is `null` or `undefined`
 */
export const removeNullOrUndefinedProperties = <
  TObj extends Record<string, any>,
>(
  obj: TObj,
): TObj => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null,
    ),
  ) as TObj;
};
