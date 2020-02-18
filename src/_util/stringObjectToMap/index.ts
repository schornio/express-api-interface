import { HTTPBadRequestError } from '../../Error';

const stringObjectToMap = (obj: {
  [k: string]: unknown;
}): Map<string, string> => {
  const propertyNameArray = Object.getOwnPropertyNames(obj);
  const propertyMap = new Map<string, string>();
  for (const propertyName of propertyNameArray) {
    const propertyValue = obj[propertyName];
    if (typeof propertyValue === 'string') {
      propertyMap.set(propertyName, propertyValue);
    } else {
      throw new HTTPBadRequestError();
    }
  }
  return propertyMap;
};

export default stringObjectToMap;
