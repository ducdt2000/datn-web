import _ from 'lodash';

export function getDifferentValue(input: any, initialValues: any) {
  const updateInput = {};
  Object.keys(input).forEach((key) => {
    if (!_.isEqual(input[key], initialValues[key])) {
      //@ts-ignore
      updateInput[key] = input[key];
    }
  });

  return updateInput;
}
