import * as calc from './calc';

const testSome = [
  {
    arg:  [' 3.14 ', 2],
    res:  []
  },
  {
    arg:  [-3, ' -2.222 '],
    res:  []
  }
];

let fNumber = 0;
for(let f in calc) {
  testSome.forEach(t => {
    let res = calc[f](t.arg[0], t.arg[1]);
    console.log(`Функция ${f}((${t.arg[0]}, ${t.arg[1]}) возвратила ${res}`);
    t.res.push(res);
  })
  fNumber++;
};
