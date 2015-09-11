module.exports = {
  extractSharedJs: true,

  // Not using a feature?
  // Remove the directory configuration from src
  // and dest below to prevent the task from running
  src: {
    root: "src",
    css: "stylesheets",
    fonts: "fonts",
    html: "html",
    iconFont: "icons",
    images: "images",
    js: "javascripts",
    jsEntries: {
      app: ['./app.js'],
      page: ['./page.js']
    },
    svgSprite: "sprites"
  },

  dest: {
    root: "public",
    css: "stylesheets",
    fonts: "fonts",
    html: "",
    iconFont: "fonts",
    iconFontSass: "generated",
    images: "images",
    js: "javascripts",
    svgSprite: "images/spritesheets"
  }
}
