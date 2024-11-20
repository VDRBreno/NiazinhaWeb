import { IFavoriteProfile, isArrayOfFavoriteProfile } from '@/types/FavoriteProfile';
import { FormattedError } from '@/utils/HandleError';
import validateUID from '@/utils/validateUID';

export const LAST_UID_SEARCHED_STORE_KEY = 'LAST_UID_SEARCHED';
export const FAVORITES_PROFILES_STORE_KEY = 'FAVORITES_PROFILES';

export default function useUserData() {

  console.log('oi from useUserData')

  function getLastUIDSearched() {
    const lastUIDSearchedStored = localStorage.getItem(LAST_UID_SEARCHED_STORE_KEY);
    if(!lastUIDSearchedStored)
      return null;

    if(!validateUID(lastUIDSearchedStored)) {
      localStorage.removeItem(LAST_UID_SEARCHED_STORE_KEY);
      return null;
    }

    return lastUIDSearchedStored;
  }

  function getFavoritesProfiles() {
    const favoritesProfilesStored = localStorage.getItem(FAVORITES_PROFILES_STORE_KEY);
    if(!favoritesProfilesStored)
      return [];

    try {
      const favoritesProfilesParsed = JSON.parse(favoritesProfilesStored);
      if(!Array.isArray(favoritesProfilesParsed))
        throw new FormattedError({
          error: `Expected ${FAVORITES_PROFILES_STORE_KEY} to be array`,
          description: `Invalid type of ${FAVORITES_PROFILES_STORE_KEY}`
        });

      if(!isArrayOfFavoriteProfile(favoritesProfilesParsed))
        throw new FormattedError({
          error: `Expected ${FAVORITES_PROFILES_STORE_KEY} to be array of IFavoriteProfile`,
          description: `Invalid type of ${FAVORITES_PROFILES_STORE_KEY}`
        });

      return favoritesProfilesParsed;
    } catch(error) {
      console.error(error);
      localStorage.removeItem(FAVORITES_PROFILES_STORE_KEY);
      return [];
    }
  }

  function updateFavoriteProfile(profile: IFavoriteProfile) {
    const favoritesProfiles = getFavoritesProfiles();
    const favoritesProfilesUpdated = favoritesProfiles.map(p => p.uid!==profile.uid ?p :profile);
    const favoritesProfilesStringified = JSON.stringify(favoritesProfilesUpdated);
    localStorage.setItem(FAVORITES_PROFILES_STORE_KEY, favoritesProfilesStringified);
  }

  function removeFavoriteProfile(UID: string) {
    const favoritesProfiles = getFavoritesProfiles();
    const favoritesProfilesUpdated = favoritesProfiles.filter(p => p.uid!==UID);
    const favoritesProfilesStringified = JSON.stringify(favoritesProfilesUpdated);
    localStorage.setItem(FAVORITES_PROFILES_STORE_KEY, favoritesProfilesStringified);
  }

  return {
    getLastUIDSearched,
    getFavoritesProfiles,
    updateFavoriteProfile,
    removeFavoriteProfile
  };

}