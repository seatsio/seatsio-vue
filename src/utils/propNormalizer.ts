import { camelize } from '@vue/shared';

/**
 * Checks for duplicate prop definitions and logs a warning if found
 * @param camelKey - The camelCase version of the prop name
 * @param currentKey - The current prop key being processed
 * @param keyMapping - Mapping of camelCase keys to their original keys
 */
function checkForDuplicateProp(
  camelKey: string,
  currentKey: string,
  keyMapping: Record<string, string>
): void {
  if (camelKey in keyMapping && currentKey !== keyMapping[camelKey]) {
    console.warn(
      `[seatsio-vue] Warning: Duplicate prop detected for '${camelKey}'. ` +
      `Both '${keyMapping[camelKey]}' and '${currentKey}' were provided. ` +
      `Using value from '${currentKey}'.`
    )
  }
}

/**
 * Normalizes component attributes by converting kebab-case keys to camelCase
 * This enables Vue components to accept props in both kebab-case (Vue convention)
 * and camelCase formats
 * @param attrs - The attributes object to normalize
 * @returns A new object with all keys converted to camelCase
 * @example
 * normalizeAttrs({'workspace-key': 'foo', eventLocation: 'bar'})
 * // returns {workspaceKey: 'foo', eventLocation: 'bar'}
 */
export function normalizeAttrs(attrs: Record<string, any>): Record<string, any> {
  const normalized: Record<string, any> = {}
  const keyMapping: Record<string, string> = {}

  for (const key in attrs) {
    const camelKey = camelize(key)

    checkForDuplicateProp(camelKey, key, keyMapping)

    normalized[camelKey] = attrs[key]
    keyMapping[camelKey] = key
  }

  return normalized
}
