# Gulp Shopify Upload Task

Using gulp-starter with Shopify creates a simple workflow that makes iteration loops fairly tight. This directory contains the extra pieces you'll need to get going.

## Overview

It is expected that you're working with a Shopify Theme which should have a folder structure that resembles the following:

```
myproject
  ├── assets
  ├── config
  ├── gulpfile.js
  ├── layout
  ├── locales
  ├── snippets
  ├── src (your uncompiled source files)
  └── templates
```

#### Dependencies

    npm install gulp-shopify-upload --save-dev

#### Gulp Tasks

This example contains two gulp tasks: `shopifywatch` and `shopifydeploy` defined in `gulpfile.js/tasks/shopify.js`. The watch task starts a watching process that monitors at all Shopify directories and uploads saved files (whether they have changed or not). The deploy task simply deploys all files at once.

Not depicted in this example is the integration of these gulp tasks with your configured task pipelines. It is up to you to add `shopifywatch` to a list of tasks executed during development, and `shopifydeploy` to a deploy task.

**One Caveat**: It is true that, during development, you will actually be deploying (uploading) files to the Shopify server that holds your theme files, overwriting what's there. Keep this in mind! Always develop against a test theme on a dev Shopify project and if you're working with a team, take care not to overwrite eachother's work.

#### API Credentials

In order to upload files, the gulp plugin requires your store's API key and API password, along with the store URL. As you can see in `.gitignore`, it is recommended that you ignore the file with the credentials filled in, and only store the example file in source control. Here's the procedure for setting this up (you probably want to include these instructions in _your_ project's README).

1. Copy `shopify_api.json.example` and rename it to `shopify_api.json` in the root directory of your project
2. Fill in the fields with your store's information
3. Make sure to add `shopify_api.json` to your `.gitignore` so that your secret key isn't stored in source control
