import { describe, expect, it } from 'vitest'
import { normalizeAttrs } from './propNormalizer'

describe('propNormalizer', () => {
  describe('normalizeAttrs - unit tests', () => {

    it('should convert kebab-case keys to camelCase', () => {
      const input = {
        'workspace-key': 'publicDemoKey',
        'event-key': 'smallTheatreEvent',
        'secret-key': 'demoKey',
        'my-very-long-prop-name': 'value',
      }

      const result = normalizeAttrs(input)

      expect(result).toEqual({
        workspaceKey: 'publicDemoKey',
        eventKey: 'smallTheatreEvent',
        secretKey: 'demoKey',
        myVeryLongPropName: 'value',
      })
    })

    it('should keep camelCase keys as is', () => {
      const input = {
        workspaceKey: 'publicDemoKey',
        eventKey: 'smallTheatreEvent',
        secretKey: 'demoKey'
      }

      const result = normalizeAttrs(input)

      expect(result).toEqual({
        workspaceKey: 'publicDemoKey',
        eventKey: 'smallTheatreEvent',
        secretKey: 'demoKey'
      })
    })

    it('should handle mixed kebab-case and camelCase keys (non-duplicates)', () => {
      const input = {
        'workspace-key': 'publicDemoKey',
        eventKey: 'smallTheatreEvent',
        'chart-js-url': 'https://example.com'
      }

      const result = normalizeAttrs(input)

      expect(result).toEqual({
        workspaceKey: 'publicDemoKey',
        eventKey: 'smallTheatreEvent',
        chartJsUrl: 'https://example.com'
      })
    })

    it('should handle single-word keys', () => {
      const input = {
        region: 'eu',
        event: 'myEvent',
        mode: 'readOnly'
      }

      const result = normalizeAttrs(input)

      expect(result).toEqual({
        region: 'eu',
        event: 'myEvent',
        mode: 'readOnly'
      })
    })

    it('should handle empty object', () => {
      const input = {}

      const result = normalizeAttrs(input)

      expect(result).toEqual({})
    })

    it('should preserve different value types', () => {
      const functionValue = () => 'test'
      const objectValue = { nested: 'value' }
      const arrayValue = [1, 2, 3]

      const input = {
        'string-prop': 'text',
        'number-prop': 42,
        'boolean-prop': true,
        'null-prop': null,
        'undefined-prop': undefined,
        'function-prop': functionValue,
        'object-prop': objectValue,
        'array-prop': arrayValue
      }

      const result = normalizeAttrs(input)

      expect(result).toEqual({
        stringProp: 'text',
        numberProp: 42,
        booleanProp: true,
        nullProp: null,
        undefinedProp: undefined,
        functionProp: functionValue,
        objectProp: objectValue,
        arrayProp: arrayValue
      })
    })

    describe('duplicate prop detection', () => {
      it('should use the last provided value when duplicates exist', () => {
        const input = {
          'workspace-key': 'firstValue',
          workspaceKey: 'secondValue'
        }

        const result = normalizeAttrs(input)

        expect(result.workspaceKey).toBe('secondValue')
      })
    })
  })
})
