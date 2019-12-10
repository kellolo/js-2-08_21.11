//задание 1
let text = `Quotes tagged as 'english' Showing 1-30 of 381. 'Emotions, in my experience, aren't covered by single words. I don't believe in "sadness,' 'joy,' or 'regret.' `

const regExp1 = /'/g;

const regExp2 = /"([a-z])/g;

text = text.replace(regExp1, `"` );
text = text.replace(regExp2, `'`)

console.log(text);