function camelToSnake(obj) {
    if (typeof obj !== 'object' || Array.isArray(obj)) {
      throw new Error('Input should be an object');
    }
  
    const snakeCaseObject = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const snakeKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
        snakeCaseObject[snakeKey] = obj[key];
      }
    }
    return snakeCaseObject;
  }

export { camelToSnake}