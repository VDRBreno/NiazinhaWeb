export default function schemaValidator(schema: Record<string, string>, data: Record<string, any>) {
  const schemaKeys = Object.keys(schema);
  
  if(schemaKeys.length!==Object.keys(data).length)
    return false;

  for(const key of schemaKeys) {
    if(!data[key])
      return false;

    if(typeof data[key]!==schema[key])
      return false;
  }

  return true;
}