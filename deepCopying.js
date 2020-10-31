const getType = (data) => {
  const isArray = Array.isArray(data);

  if (isArray) {
    return 'array';
  }
  return 'object';
};

const copyObject = (obj, callback) => {
  let newObj = {};
  const keys = Object.keys(obj);

  keys.forEach((key) => {
    if (getType(obj[key]) === 'array') {
      newObj[key] = callback(obj[key]);
    } else {
      newObj[key] = `${obj[key]}-copied`;
    }
  });

  return { ...newObj };
};

const copyArr = (data) => {
  let newData = getType(data) === 'array' ? [] : {};
  let counter = 0;

  function intercepter() {
    if (data.length > counter || Object.keys(data).length > counter) {
      switch (true) {
        case Array.isArray(data[counter]):
          newData[counter] = copyArr(data[counter]);
          break;
        case typeof data[counter] === 'object':
          newData[counter] = copyObject(data[counter], copyArr);
          break;
        default:
          if (getType(newData) === 'object') {
            newData = copyObject(data, copyArr);
          } else {
            newData[counter] = `${data[counter]}-copied`;
          }
      }

      counter++;
      return intercepter();
    }

    return newData;
  }

  return intercepter();
};

const arr = [
  [{ id: 'call' }],
  3,
  '4',
  ['a', { id: 10, clue: ['bca', { id: 1000 }] }],
];

const obj = { a: 'b', b: ['a', { id: 'po', smth: ['bcfgtr'] }] };

const newArr = copyArr(arr);
const newObj = copyArr(obj);

console.log(newArr, newObj);
