import { camelize } from '@vue/shared';

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

    normalized[camelKey] = attrs[key]
    keyMapping[camelKey] = key
  }

  return normalized
}
