// Main Directory Config (no trailing slashes!)
module.exports = {
  src: {
    root: "./src",
    css: "stylesheets",
    fonts: "fonts",
    html: "html",
    iconFont: "icons",
    js: "javascripts",
    jsEntries: {
      page1: [ './page1.js' ],
      page2: [ './page2.js' ]
    },
    svgSprite: "sprites"
  },

  dest: {
    root: "./public",
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
