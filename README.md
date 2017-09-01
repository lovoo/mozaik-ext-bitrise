# Mozaïk bitrise widgets

[![License][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
![widget count][widget-count-image]

## Bitrise Client Configuration

In order to use the Mozaïk bitrise widgets, you must configure its **client**.

### parameters

key             | env key                         | required | description
----------------|---------------------------------|----------|-----------------------------------
`token`         | BITRISE_API_TOKEN               | yes      | *The Bitrise API Token*

### usage

```javascript
{
  //…
  api: {
    bitrise: {
        token: 'token'
    }
  }
}
```

## Widgets

### Bitrise Build history

![bitrise build history](https://github.com/lovoo/mozaik-ext-bitrise/blob/master/preview/bitrise.build_history.png)

> Display bitrise repo build history

#### parameters

key          | required | description
-------------|----------|---------------
`slug`       | yes      | *app slug*
`limit`      | no       | *Limit the fetched builds*

#### usage

```javascript
{
  type: 'bitrise.build_history',
  slug: '<app slug>',
  limit: 10,
  columns: 1, rows: 1, x: 0, y: 0
}
```

[license-image]: https://img.shields.io/github/license/lovoo/mozaik-ext-bitrise.svg?style=flat-square
[license-url]: https://github.com/lovoo/mozaik-ext-bitrise/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/mozaik-ext-bitrise.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/mozaik-ext-bitrise
[widget-count-image]: https://img.shields.io/badge/widgets-x1-green.svg?style=flat-square
