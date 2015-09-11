module.exports = function(pattern, number) {
    var string = ''
    while (number > 0){
      number--
      string += pattern
    }
    return string
  }
