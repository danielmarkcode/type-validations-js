const validator = {
  get(target, prop) {
    if (!(prop in target)) {
      throw new TypeError(`Property "${prop}" does not exist on object`);
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (typeof value !== target[prop].type) {
      throw new TypeError(`Invalid type. Expected ${target[prop].type}, but got ${typeof value}`);
    }
    target[prop].value = value;
    return true;
  }
};

function validateObject(obj, schema) {
  const proxy = new Proxy(schema, validator);
  for (let prop in obj) {
    proxy[prop] = obj[prop];
  }
  return proxy;
}

const schema = {
  name: { type: 'string', value: '' },
  age: { type: 'number', value: 0 },
  isAdmin: { type: 'boolean', value: false }
};

const obj = { name: 'John', age: 30, isAdmin: true };
const validatedObj = validateObject(obj, schema);

console.log(validatedObj.name); // 'John'
console.log(validatedObj.age); // 30
console.log(validatedObj.isAdmin); // true

validatedObj.age = '30'; // throws TypeError: Invalid type. Expected number, but got string

validatedObj.foo = 'bar'; // throws TypeError: Property "foo" does not exist on object
