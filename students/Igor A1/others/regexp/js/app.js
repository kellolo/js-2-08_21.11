const resetId = [
    'txt-test',
    'u_name',
    'u_tel',
    'u_email',
    'u_msg'
  ],
  resetValues = () => resetId.forEach(id => document.getElementById(id).value = ''),
  testId = 'txt-test',
  replaceQuotes = (txt) => txt.replace(/^'|(\s)'/mg, "$1\"").replace(/'$|'(\s)/mg, "\"$1"),
  testBtn = 'btn-test',
  testStr = `'I am' – I'm:  'I'm planning to write a book someday.'
'You are' – You're:  'You're going to have a lot of fun with your new puppy.'
'She is' – She's:  'She's always on time.'
'It is' – It's: 'I can't believe it's snowing again.'
'Do not' – Don't: 'I don't like anchovies.'
'He would' – He'd: 'He'd like to go fishing in Alaska.'
'Let us' – Let's: 'Let's start saving more money each month.'
'She would have' – She would've: 'If she would've paid attention in class, she would have passed.'
'Who is' – Who's: 'Who's there?'
'They had' – They'd: 'They weren't hungry, because they'd already eaten.'`;


window.onload = () => {
  resetValues();
  
  let testTxt = document.getElementById(testId);
  testTxt.value = testStr;
  testTxt.style.color = "red";
  
  let replaceBtn = document.getElementById(testBtn);
  replaceBtn.addEventListener('click', () => {
    testTxt.value = replaceQuotes(testTxt.value);
    testTxt.style.color = "deepskyblue"
  });
};
