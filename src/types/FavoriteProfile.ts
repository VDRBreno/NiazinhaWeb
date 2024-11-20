import schemaValidator from '@/utils/schemaValidator';

export function isArrayOfFavoriteProfile(array: unknown[]): array is IFavoriteProfile[] {
  for(const item of array) {
    if(typeof item!=='object')
      return false;

    if(!isFavoriteProfile(item))
      return false;
  }
  
  return true;
}

export function isFavoriteProfile(data: unknown): data is IFavoriteProfile {
  if(!data || typeof data!=='object')
    return false;

  const schema = {
    'uid': 'string',
    'name': 'string',
    'nickname': 'string',
    'avatar': 'string'
  }

  const isValidSchema = schemaValidator(schema, data);

  return isValidSchema;
}

export interface IFavoriteProfile {
  uid: string;
  name: string;
  nickname: string;
  avatar: string;
}