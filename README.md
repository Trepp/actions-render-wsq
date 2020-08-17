# GitHub Action to render web sequence diagrams

![build-test](https://github.com/Trepp/actions-render-wsq/workflows/build-test/badge.svg?branch=main)

This action will automatically render images for [web sequence diagrams](https://www.websequencediagrams.com/examples.html) in a given project folder  :rocket:

After the action runs new png images will be created for any *.wsq files in the specified folder. These can then be committed.

## Inputs

### `folder`

**Required** This can be a relative folder starting from the project root. ie: `./docs/diagrams` The action will scan for all files in this folder, but does not look at sub-folders.

### `style`

**Optional** Specify a UI style for how the diagrams will be rendered. Available options include:

* default
* earth
* modern-blue
* mscgen
* omegapple
* qsd
* rose
* roundgreen
* napkin
* magazine
* vs2010
* patent

### `commitFiles`

**Optional** Flag (true, false) to indicate if any new or changed files should automatically be committed.

## Quickstart Development on the Action

If you are new, there's also a simpler introduction.  See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

Install the dependencies

```bash
npm install
```

Build the typescript and package it for distribution

```bash
npm run build && npm run package
```

Run the tests :heavy_check_mark:

```bash
npm test

 PASS  __tests__/main.test.ts
  ✓ renders a diagram (433ms)
  ✓ renders files using local path (283ms)
  ✓ throws unknown style (15ms)

...
```

### Change action.yml

The action.yml contains defines the inputs and output for your action. See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

### Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
import * as core from '@actions/core';
...

async function run() {
  try {
      ...
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

### Publish new version

Actions are run from GitHub repos so we will checkin the packed dist folder.

Then run [ncc](https://github.com/zeit/ncc) and push the results:

```bash
git checkout releases/v1
npm run build
npm run package
git add dist
git commit -a -m "prod dependencies"
git push origin releases/v1
```

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

### Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:

### Usage

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action

```bash
git tag -fa v1 -m "Update v1 tag"
git push origin v1 --force
```
