function typeCheck(object) {
  const handler = {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      throw new Error(`Property "${prop}" does not exist.`);
    },
    set(target, prop, value) {
      const type = prop.split(".").pop();
      if (type === "string") {
        if (typeof value !== "string") {
          throw new Error(`Property "${prop}" must be a string.`);
        }
      } else if (type === "int") {
        if (typeof value !== "number" || !Number.isInteger(value)) {
          throw new Error(`Property "${prop}" must be an integer.`);
        }
      } else if (type === "float") {
        if (typeof value !== "number" || Number.isNaN(value)) {
          throw new Error(`Property "${prop}" must be a float.`);
        }
      } else if (type === "number") {
        if (typeof value !== "number" || Number.isNaN(value)) {
          throw new Error(`Property "${prop}" must be a number.`);
        }
      } else if (type === "bool") {
        if (typeof value !== "boolean") {
          throw new Error(`Property "${prop}" must be a boolean.`);
        }
      }

      if (!target.hasOwnProperty(prop) && !prop.endsWith(".any")) {
        // Throw an error if creating a property with an invalid type
        const validTypes = ["string", "int", "float", "number", "bool"];
        if (!validTypes.includes(type)) {
          throw new Error(`Property "${prop}" must have a valid type.`);
        }
      }

      target[prop] = value;
      return true;
    },
  };

  // Validate initial values
  for (const prop in object) {
    const type = prop.split(".").pop();
    if (type === "string") {
      if (typeof object[prop] !== "string") {
        throw new Error(`Property "${prop}" must be a string.`);
      }
    } else if (type === "int") {
      if (typeof object[prop] !== "number" || !Number.isInteger(object[prop])) {
        throw new Error(`Property "${prop}" must be an integer.`);
      }
    } else if (type === "float") {
      if (typeof object[prop] !== "number" || Number.isNaN(object[prop])) {
        throw new Error(`Property "${prop}" must be a float.`);
      }
    } else if (type === "number") {
      if (typeof object[prop] !== "number" || Number.isNaN(object[prop])) {
        throw new Error(`Property "${prop}" must be a number.`);
      }
    } else if (type === "bool") {
      if (typeof object[prop] !== "boolean") {
        throw new Error(`Property "${prop}" must be a boolean.`);
      }
    } else if (object[prop] !== null && typeof object[prop] === "object") {
      // recursively validate complex objects
      typeCheck(object[prop]);
    }
  }

  return new Proxy(object, handler);
}
