import Cookie from 'js-cookie';
import SSRCookie from 'cookie';
import {
  ADMIN,
  AUTH_CRED,
  ROLE,
  STAFF,
  STORE_OWNER,
  SUPER_ADMIN,
  TOKEN,
} from './constants';

export const allowedRoles = [ADMIN, STAFF];
export const adminAndOwnerOnly = [SUPER_ADMIN, STORE_OWNER];
export const adminOwnerAndStaffOnly = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const adminOnly = [SUPER_ADMIN];
export const ownerOnly = [STORE_OWNER];

export function saveAuthCredentials(token: string, role: string) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, role }));
}

export function setAuthCredentials(
  token: string,
  permissions: any,
  role: string
) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions, role }));
}

export function getAuthCredentials(context?: any): {
  token: string | null;
  permissions: string[] | null;
  role: string | null;
} {
  let authCred;
  if (context) {
    authCred = parseSSRCookie(context)[AUTH_CRED];
  } else {
    authCred = Cookie.get(AUTH_CRED);
  }
  if (authCred) {
    return JSON.parse(authCred);
  }
  return { token: null, permissions: null, role: null };
}

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? '');
}

export function checkRoleAccess(
  _allowedRoles: string[],
  _role: string | undefined | null
) {
  if (_role) {
    return _allowedRoles.includes(_role);
  }
  return false;
}

// export function hasAccess(
//   _allowedRoles: string[],
//   _userPermissions: string[] | undefined | null
// ) {
//   if (_userPermissions) {
//     return Boolean(
//       _allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
//     );
//   }
//   return false;
// }

export function isAuthenticated(_cookies: any) {
  return !!_cookies[TOKEN] && !!_cookies[ROLE];
}
