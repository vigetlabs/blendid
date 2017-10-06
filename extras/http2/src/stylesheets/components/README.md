# HTTP2 component styles

HTTP/2 allows for multiplexing, which allows you to sprinkle your CSS files in where they are needed, rather than loading them all in one big CSS file on the initial session to your application.

A recommended way to approach this is for each HTML component (within `src/html/components`) you create a corresponding CSS component within this directory (`src/stylesheets/components`). The CSS component only loads when the HTML template is built on page (see *Using component styles in your HTML templates* below on how to do this).

Every CSS component should import the config files (variables, mixins and functions) so that anything defined there can be used to calculate values within the component.

## Organizing your stylesheets directory
Standard component directory structure should include an index file that imports the config files as well as any files in the directory, usually just one that is either named `_base.scss` or `_[component-name].scss` for easier fuzzy finder location.

For example:

```
/components
  |
  /example-component
  | |
  | index.scss // imports config and any underscored files in this directory
  | _example-component.scss // has all the styles for this component
  |
  /another-component
    |
    index.scss
    // etc
```

## Using component styles in your HTML templates
Using the `css()` macro defined in `src/html/macros/helpers.html` will allow you to easily pull in the styles defined for that component inline. To use simply call `{{ macros.css('example-component') }}` before writing any HTML in the template and it will find pull in the *index file* of that directory.
