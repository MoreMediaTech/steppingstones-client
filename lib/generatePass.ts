export function generatePass(passwordLength: number) {
  const numberChars = '0123456789'
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz'
  const specialChars = '!@#$&_+?-='
  const allChars = numberChars + upperChars + lowerChars + specialChars
  let randPasswordArray = Array(passwordLength)
  randPasswordArray[0] = numberChars
  randPasswordArray[1] = upperChars
  randPasswordArray[2] = lowerChars
  randPasswordArray[3] = specialChars
  randPasswordArray = randPasswordArray.fill(allChars, 3)
  return shuffleArray(
    randPasswordArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)]
    })
  ).join('')
}

function shuffleArray(array: any[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}