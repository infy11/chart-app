Array.eq = (a, b) => JSON.stringify(a) === JSON.stringify(b)

String.prototype.titleCase = function() {
  return this.toLowerCase().replace('_', ' ').split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase())
  }).join(' ')
}

