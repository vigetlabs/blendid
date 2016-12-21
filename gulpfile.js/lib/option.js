module.exports = function(config) {
    this.get = function(key){
        return resolve(key);
    }

    this.exists = function(key){
        return (resolve(key) !== undefined)
    }

    this.resolve = function(key){
        if( config.options === undefined ) {
            return undefined
        }

        var value = undefined,
            split = key.split('.'),
            i=0

        while( i < split.length && typeof config.options[split[i]] !== "undefined" ) {
            value = config.options[split[i]]
            ++i
        }

        return value
    }

    return this
}
