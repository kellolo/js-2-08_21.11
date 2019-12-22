const calc = require ('../src/calc' );

//----------------------------------------------------------------------------//
const testUndefined = [
  {
    arg:  [undefined, 2],
    res:  NaN
  },
  {
    arg:  [3, undefined],
    res:  NaN
  }
];

for(let f in calc) {
  testUndefined.forEach(t => {
    describe(`Функция ${f}()` , () => {
      it(`должна возвращать ${t.res} при аргументах (${t.arg[0]}, ${t.arg[1]})` , () => {
        expect(calc[f](t.arg[0], t.arg[1])).toBeNaN()
      })
    });
 })
};

//----------------------------------------------------------------------------//
const testNull = [
  {
    arg:  [null, 2],
    res:  [2, -2, 0, 0, 0]
  },
  {
    arg:  [3, null],
    res:  [3, 3, 0, Infinity, 1]
  }
];

let fNumber = 0;
for(let f in calc) {
  testNull.forEach(t => {
    describe(`Функция ${f}()` , () => {
      let realThing = t.res[fNumber];
      it(`должна возвращать ${realThing} при аргументах (${t.arg[0]}, ${t.arg[1]})` , () => {
        expect(calc[f](t.arg[0], t.arg[1])).toBe(realThing);
      })
    });
 })
 fNumber++;
};

//----------------------------------------------------------------------------//
const testString = [
  {
    arg:  [" + 3 ", 2],
    res:  [5, 1, 6, 1.5, 9]
  },
  {
    arg:  [-3, " -2 "],
    res:  [-5, -1, 6, 1.5, 1]
  }
];

fNumber = 0;
for(let f in calc) {
  testNull.forEach(t => {
    describe(`Функция ${f}()` , () => {
      let realThing = t.res[fNumber];
      it(`должна возвращать ${realThing} при аргументах (${t.arg[0]}, ${t.arg[1]})` , () => {
        expect(calc[f](t.arg[0], t.arg[1])).toBe(realThing);
      })
    });
 })
 fNumber++;
};
//----------------------------------------------------------------------------//
const testNumber = [
  {
    arg:  [3, 2],
    res:  [5, 1, 6, 1.5, 9]
  },
  {
    arg:  [-3, -2],
    res:  [-5, -1, 6, 1.5, 1]
  }
];

fNumber = 0;
for(let f in calc) {
  testNull.forEach(t => {
    describe(`Функция ${f}()` , () => {
      let realThing = t.res[fNumber];
      it(`должна возвращать ${realThing} при аргументах (${t.arg[0]}, ${t.arg[1]})` , () => {
        expect(calc[f](t.arg[0], t.arg[1])).toBe(realThing);
      })
    });
 })
 fNumber++;
};
//----------------------------------------------------------------------------//
