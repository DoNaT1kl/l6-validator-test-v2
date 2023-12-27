import _ from 'lodash';

export default class ObjectSchema {
  constructor(validator) {
    this.validators = validator;
  }

  shape(fields) {
    return new ObjectSchema(fields);
  }

  isValid(value) {
    const keys = Object.keys(value);

    if (keys.length !== Object.keys(this.validators).length) {
      return false;
    }

    const check = (value, key, validators) => {
      if (typeof value !== 'object' || Array.isArray(value) || value === null) {
        return validators[key].isValid(value);
      }
      const keys = Object.keys(value);
      const validator = validators[key];

      return keys.map((key) => check(value[key], key, validator));
    };

    const res = _.flattenDeep(keys.map((key) => check(value[key], key, this.validators)));

    return res.every((val) => val);
  }
}
