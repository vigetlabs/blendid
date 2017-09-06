# HTTP2 modules styles

Each HTML module you create should have a corresponding CSS directory within modules.

Every module should import the config files (variables, mixins and functions) so that anything defined there can be used to calculate values within the module.

Standard module directory structure should include an index file that imports the config files as well as any files in the directory, usually just one that is either named `_base.scss` or `_[module-name].scss` for easier fuzzy finder location.

For example:

```
/modules
  |
  /example-module
  | |
  | index.scss // imports config and any underscored files in this directory
  | _example-module.scss // has all the styles for this module
  |
  /another-module
    |
    index.scss
    // etc
```
