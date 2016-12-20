module.exports = function(extensions) {
    if( typeof extensions !== "string" && extensions.length > 1 ) {
        extensions = '{' + extensions + '}'
    }

    return extensions;
}
