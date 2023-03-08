# Type validation to an object - JavaScript
In this example, we define a validator object that implements a get and set trap for the Proxy object. The get trap is used to check if a property exists on the object, and the set trap is used to validate the type of the value being set for a property.

The validateObject function takes an object to be validated and a schema that defines the required properties and their types. The function creates a Proxy object with the validator object as the handler, and iterates over each property in the input object, setting the value of each property on the Proxy object. If the type of any property value does not match the expected type from the schema, a TypeError is thrown.

This example can be extended to include other types like arrays, objects, etc. by adding more checks to the set trap.

Using a Proxy in this way provides a sophisticated solution for type validation in JavaScript. It allows us to define a schema and validate an object against that schema, providing an extra layer of protection against type errors.
