/*
Language: Mint
Author: Szikszai Gusztáv <github.com/gdotdesign>
Contributors: Luke Pighetti <github.com/lukepighetti>, Sijawusz Pur Rahnama <sija@sija.pl>
Description: A refreshing programming language for the front-end web.
Website: https://www.mint-lang.com
*/

export default function (hljs) {
  const MINT_CONTAINS = [];

  const MINT_KEYWORDS = {
    keywords: {
      keyword: [
        'const', 'global', 'component', 'store', 'module', 'record', 'enum', 'style',
        'routes', 'provider', 'suite', 'test', 'fun', 'get', 'property', 'state',
        'next', 'try', 'sequence', 'parallel|10', 'if', 'else', 'catch', 'case',
        'connect', 'where', 'when', 'then', 'finally', 'use', 'for', 'of', 'with',
        'as', 'decode', 'encode', 'exposing|10', 'using|10',
      ],
      literal: ['true', 'false'],
    }
  }

  const TAG_INTERNALS = {
    illegal: /</,
    relevance: 0,
    endsWithParent: true,
    contains: [
      {
        begin: '[A-Za-z0-9\\._:-]+',
        className: 'attr',
        relevance: 0,
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            begin: '\\{',
            end: '\\}',
            className: 'tag',
            endsParent: true,
            contains: MINT_CONTAINS,
          },
          {
            className: 'string',
            endsParent: true,
            variants: [
              {
                begin: /"/,
                end: /"/,
              },
              {
                begin: /'/,
                end: /'/,
              },
            ]
          }
        ]
      }
    ]
  };

  MINT_CONTAINS.push(
    ...[
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.REGEXP_MODE,
      {
        begin: '\\b\\d+(\\.\\d+)?',
        end: '\\B|\\b',
        className: 'number',
        relevance: 0,
      },
      {
        begin: '"',
        end: '"',
        className: 'string',
      },
      {
        begin: '\\b[A-Z][A-Za-z0-9]+',
        className: 'type',
        relevance: 0,
      },
      {
        begin: '<{',
        end: '}>',
        className: 'tag',
        contains: MINT_CONTAINS,
      },
      {
        begin: '</?',
        end: '/?>',
        className: 'tag',
        contains: [
          {
            begin: /[^\/><\s]+/,
            className: 'name',
            relevance: 0,
          },
          TAG_INTERNALS,
        ]
      },
      {
        begin: 'style\\s+[a-zA-Z0-9-]+\\s*{',
        end: '}',
        keywords: MINT_KEYWORDS,
        contains: [
          {
            begin: '(?=[-a-zA-Z0-9]+\\s*:\\s*[^\\s;]+)',
            end: ';',
            contains: [
              {
                begin: '[-a-zA-Z0-9]+\\s*',
                end: ':',
                className: 'string',
                excludeEnd: true,
              },
              {
                begin: '[^;]+',
                end: ';',
                excludeEnd: true,
                endsParent: true,
              },
            ]
          }
        ]
      }
    ]
  );

  return {
    name: 'Mint',
    keywords: MINT_KEYWORDS,
    contains: MINT_CONTAINS,
  };
}
