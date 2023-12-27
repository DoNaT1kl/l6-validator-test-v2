export default class StringSchema {
  constructor(validator = [(item) => typeof item === 'string']) {
    this.validators = [...validator];
  }

  isValid(item) {
    return this.validators.every((validator) => validator(item) === true);
  }

  hasSpaces() {
    return new StringSchema([...this.validators, (item) => item.includes(' ')]);
  }
}
