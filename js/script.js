// Task - 1 

function calculateFibByRecursion(sequenceLength) {
  return sequenceLength <= 1 ? sequenceLength : calculateFibByRecursion(sequenceLength - 1) + calculateFibByRecursion(sequenceLength - 2);
};

function calculateFibByCycle(sequenceLength) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= sequenceLength; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
};

const benchmark = (fooCalc, method, sequenceLength = 20, ammoutOfIteration = 50) => {
  const start = performance.now();

  for (let i = 1; i <= ammoutOfIteration; i++) {
    fooCalc(sequenceLength);
  }

  const finish = (performance.now() - start).toFixed(4);

  console.log(`${method} working on this: ${finish} ms `);

}

// recursion works much more slower because every recursion iteration create it`s own lexical environment. And this process need more and more memory. So if you need to calculate long sequence and many times it takes huge time. in JS limit for recursion iterations set on 10 000 times.
benchmark(calculateFibByCycle, 'cycle');
benchmark(calculateFibByRecursion, 'recursion');

// Task - 2

function parseJSON(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
}

console.log(parseJSON('{"role":"Student", "company":"EPAM","mentor":"Cool mentor"}'));
console.log(parseJSON('role:Student, company:EPAM,mentor:Cool mentor'));
//parseJSON('{"role":"Student", "company":"EPAM","mentor":"Cool mentor"}'); //object
//parseJSON('role:Student, company:EPAM,mentor:Cool mentor'); //null

// Task - 3

const dataParser = json => {
  const response = JSON.parse(json);
  if (!response.name && !response.company) {
    throw new Error('No name and company data');
  }
  return response;
}

function parseJSONGlobal(json) {
  try {
    return dataParser(json);
  } catch (error) {
    throw error;
  }
}

window.onerror = (message, url, line) => {
  console.log(`${message} on ${line} in ${url}\n`)
}


console.log(parseJSONGlobal('{"name":"Student", "company":"EPAM"}')); //object
console.log(parseJSONGlobal('name: Student, company: EPAM')); // error
console.log(parseJSONGlobal('{"name":"Student", "surname":"Cool"}')); // error
console.log(parseJSONGlobal('{"name":"Vasya", "company":"Apple"}')); //object