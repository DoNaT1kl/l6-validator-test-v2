export default class FunctionSchema {
  constructor(validator = [(item) => typeof item === 'function'], context = {}, value = null, args = []) {
    this.validators = [...validator];
    this.context = context;
    this.value = value;
    this.args = args;
  }

  isValid(func) {
    if (this.value) {
      if (typeof func === 'function') {
        return func.call(this.context, ...this.args) === this.value;
      }

      return false;
    }

    return this.validators.every((validator) => validator(func) === true);
  }

  callWith(context) {
    return new FunctionSchema(this.validators, context, this.value, this.args);
  }

  expect(value) {
    return new FunctionSchema(this.validators, this.context, value, this.args);
  }

  arguments(...args) {
    return new FunctionSchema(this.validators, this.context, this.value, args);
  }
}
