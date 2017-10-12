# Contribution Guidelines

Thanks you for considering a contribution to Blendid.

## Getting Started

Before you begin developing on Blendid, you'll need to setup your environment:

1. Install [NodeJS](https://nodejs.org) 6.11.1 or higher.
2. Install [Yarn](https://yarnpkg.com)

All commands should be run using yarn. If you haven't switched to [yarn](https://yarnpkg.com/en/) yet, now's a great time!

> If you are familiar with npm then using yarn should be a breeze. You can keep using npm if you'd prefer but you will miss out on the safety and security of yarn

Install project dependencies with:

```
yarn install
```

That's it! You're all set!

## Deployment

Blendid is distributed via [npm](https://npmjs.com). npm is a package manager for JavaScript.

### Login to the Viget npm account

First, log in to npm using the [Viget](https://www.npmjs.com/~viget) account:

```
npm login
username: viget
password: <secret>
```

### Publishing to npm

1. Update CHANGELOG.md
2. npm version patch
3. npm publish
4. git push origin --tags 
5. Add changelog to associated version tag at https://github.com/vigetlabs/blendid/releases

### What did I just do

1. Tell everyone what they can expect in this release
2. Bumps the version (see [semver.org](http://semver.org/))
3. Publishes the packages to npm. You'll see it [here](https://www.npmjs.com/package/blendid)
4. Pushes the commit you just made to increase the version number and a git tag for that commit
5. Updates release content for the releases page and for RSS feed readers (and bots)

### Reviews

All changes should be submitted through pull request. Ideally, at least two :+1:s should be given before a pull request is merge.
