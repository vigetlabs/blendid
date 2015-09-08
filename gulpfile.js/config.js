module.exports = {
  // Task Options  #TODO: Implement these!
  // hash: false,
  // iconFonts: false,
  // sassSyntax: true,
  // svgIcons: true,
  // html: true,
  // react: true,

  // Source Directory Config
  src: {
    root: "./src",
    css: "stylesheets",
    fonts: "fonts",
    html: "html",
    iconFont: "icons",
    images: "images",
    js: "javascripts",
    jsEntries: {
      page1: [ './page1.js' ],
      page2: [ './page2.js' ]
    },
    svgSprite: "sprites"
  },

  // Destination Directory Config
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

// #TODO: use path.resolve everywhere
