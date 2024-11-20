export default function validateUID(uid?: string|null) {
  if(!uid) return false;
  if(uid.length<9) return false;
  if(isNaN(+uid)) return false;
  return true;
}