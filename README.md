# Mozaïk bitrise widgets

[![License][license-image]][license-url]
[![Travis CI][travis-image]][travis-url]
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

![bitrise build history](https://raw.githubusercontent.com/lovoo/mozaik-ext-bitrise/master/preview/bitrise.build_history.png)

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

### Bitrise Single build status

> Display the build status of a single build.

#### parameters

key          | required | description
-------------|----------|---------------
`slug`       | yes      | *app slug*
`workflow`   | yes      | *workflow id*
`title`      | no       | *An optional title*

#### usage

```javascript
{
    type: 'bitrise.single_build_status',
    title: 'An optional title',
    slug: '<app slug>',
    workflow: '<workflow id>',
    columns: 1, rows: 1, x: 0, y: 0
}
```

[travis-image]: https://img.shields.io/travis/lovoo/mozaik-ext-bitrise.svg?style=flat-square
[travis-url]: https://travis-ci.org/lovoo/mozaik-ext-bitrise
[license-image]: https://img.shields.io/github/license/lovoo/mozaik-ext-bitrise.svg?style=flat-square
[license-url]: https://github.com/lovoo/mozaik-ext-bitrise/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/mozaik-ext-bitrise.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/mozaik-ext-bitrise
[widget-count-image]: https://img.shields.io/badge/widgets-x1-green.svg?style=flat-square
