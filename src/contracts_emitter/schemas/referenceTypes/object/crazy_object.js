// @flow
export const base = {
  a: {
    b: {
      c: {
        d: {
          e: 1,
          f: 'f',
        },
        f: {
          a: 1,
          b: 'str',
        },
      },
      f1: false,
    },
    f3: {
      f1: false,
      f4: 14,
      f5: 's',
    },
  },
  b: [1, 2, 3],
  c: [
    {
      a: 1,
      b: false,
      c: 's',
    },
  ],
};

export const schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'object',
  title: 'The Root Schema',
  required: ['a', 'b', 'c'],
  properties: {
    a: {
      $id: '#/properties/a',
      type: 'object',
      title: 'The A Schema',
      required: ['b', 'f3'],
      properties: {
        b: {
          $id: '#/properties/a/properties/b',
          type: 'object',
          title: 'The B Schema',
          required: ['c', 'f1'],
          properties: {
            c: {
              $id: '#/properties/a/properties/b/properties/c',
              type: 'object',
              title: 'The C Schema',
              required: ['d', 'f'],
              properties: {
                d: {
                  $id: '#/properties/a/properties/b/properties/c/properties/d',
                  type: 'object',
                  title: 'The D Schema',
                  required: ['e', 'f'],
                  properties: {
                    e: {
                      $id:
                        '#/properties/a/properties/b/properties/c/properties/d/properties/e',
                      type: 'integer',
                      title: 'The E Schema',
                      default: 0,
                      examples: [1],
                    },
                    f: {
                      $id:
                        '#/properties/a/properties/b/properties/c/properties/d/properties/f',
                      type: 'string',
                      title: 'The F Schema',
                      default: '',
                      examples: ['f'],
                      pattern: '^(.*)$',
                    },
                  },
                },
                f: {
                  $id: '#/properties/a/properties/b/properties/c/properties/f',
                  type: 'object',
                  title: 'The F Schema',
                  required: ['a', 'b'],
                  properties: {
                    a: {
                      $id:
                        '#/properties/a/properties/b/properties/c/properties/f/properties/a',
                      type: 'integer',
                      title: 'The A Schema',
                      default: 0,
                      examples: [1],
                    },
                    b: {
                      $id:
                        '#/properties/a/properties/b/properties/c/properties/f/properties/b',
                      type: 'string',
                      title: 'The B Schema',
                      default: '',
                      examples: ['str'],
                      pattern: '^(.*)$',
                    },
                  },
                },
              },
            },
            f1: {
              $id: '#/properties/a/properties/b/properties/f1',
              type: 'boolean',
              title: 'The F1 Schema',
              default: false,
              examples: [false],
            },
          },
        },
        f3: {
          $id: '#/properties/a/properties/f3',
          type: 'object',
          title: 'The F3 Schema',
          required: ['f1', 'f4', 'f5'],
          properties: {
            f1: {
              $id: '#/properties/a/properties/f3/properties/f1',
              type: 'boolean',
              title: 'The F1 Schema',
              default: false,
              examples: [false],
            },
            f4: {
              $id: '#/properties/a/properties/f3/properties/f4',
              type: 'integer',
              title: 'The F4 Schema',
              default: 0,
              examples: [14],
            },
            f5: {
              $id: '#/properties/a/properties/f3/properties/f5',
              type: 'string',
              title: 'The F5 Schema',
              default: '',
              examples: ['s'],
              pattern: '^(.*)$',
            },
          },
        },
      },
    },
    b: {
      $id: '#/properties/b',
      type: 'array',
      title: 'The B Schema',
      items: {
        $id: '#/properties/b/items',
        type: 'integer',
        title: 'The Items Schema',
        default: 0,
        examples: [1, 2, 3],
      },
    },
    c: {
      $id: '#/properties/c',
      type: 'array',
      title: 'The C Schema',
      items: {
        $id: '#/properties/c/items',
        type: 'object',
        title: 'The Items Schema',
        required: ['a', 'b', 'c'],
        properties: {
          a: {
            $id: '#/properties/c/items/properties/a',
            type: 'integer',
            title: 'The A Schema',
            default: 0,
            examples: [1],
          },
          b: {
            $id: '#/properties/c/items/properties/b',
            type: 'boolean',
            title: 'The B Schema',
            default: false,
            examples: [false],
          },
          c: {
            $id: '#/properties/c/items/properties/c',
            type: 'string',
            title: 'The C Schema',
            default: '',
            examples: ['s'],
            pattern: '^(.*)$',
          },
        },
      },
    },
  },
};
export const base1 = {
  c: {
    d: {
      e: 1,
      f: 'f',
    },
    f: {
      a: 1,
      b: 'str',
    },
  },
  f1: false,
};

export const contract = `isObject({
  a: isObject({
    b: isObject({
      c: isObject({
        d: isObject({
          e: isNumber,
          f: isString,
        }),
        f: isObject({
          a: isNumber,
          b: isString,
        }),
      }),
      f1: isBoolean,
    }),
    f3: isObject({
      f1: isBoolean,
      f4: isNumber,
      f5: isString,
    }),
  }),
  b: isArray(isNumber),
  c: isArray(
    isObject({
      a: isNumber,
      b: isBoolean,
      c: isString,
    }),
  ),
});
`;
