import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { normalizeAttrs } from './propNormalizer'

describe('propNormalizer', () => {
  describe('normalizeAttrs - unit tests', () => {
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
      consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
      consoleWarnSpy.mockRestore()
    })

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
      it('should warn when both kebab-case and camelCase versions are provided', () => {
        const input = {
          'secret-key': 'demoKey',
          secretKey: '234'
        }

        normalizeAttrs(input)

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "[seatsio-vue] Warning: Duplicate prop detected for 'secretKey'. " +
          "Both 'secret-key' and 'secretKey' were provided. " +
          "Using value from 'secretKey'."
        )
      })

      it('should use the last provided value when duplicates exist', () => {
        const input = {
          'workspace-key': 'firstValue',
          workspaceKey: 'secondValue'
        }

        const result = normalizeAttrs(input)

        expect(result.workspaceKey).toBe('secondValue')
      })

      it('should not warn when different props normalize to different camelCase keys', () => {
        const input = {
          'workspace-key': 'value1',
          'event-key': 'value2',
          region: 'eu'
        }

        normalizeAttrs(input)

        expect(consoleWarnSpy).not.toHaveBeenCalled()
      })
    })
  })
})
