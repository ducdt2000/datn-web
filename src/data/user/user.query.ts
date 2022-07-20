import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import UserRepository from '@repositories/user';
import { UsersQueryOptionsType, QueryParamsType } from '@ts-types/custom.types';
import { createQueryPath } from '@utils/query';

const fetchUsers = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const url = createQueryPath(API_ENDPOINTS.USERS, params);
  const {
    data: { data, ...rest },
  } = await UserRepository.all(url);

  return { users: { data }, meta: rest };
};

const useManagersQuery = (params: UsersQueryOptionsType, options: any = {}) =>
  useQuery<any, Error>([API_ENDPOINTS.USERS, params], fetchManagers, {
    ...options,
    keepPreviousData: true,
  });

const fetchManagers = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const url = createQueryPath(`${API_ENDPOINTS.USERS}/managers`, params);

  const {
    data: { data, ...rest },
  } = await UserRepository.all(url);

  return { users: { data }, meta: rest };
};

const useUsersQuery = (params: UsersQueryOptionsType, options: any = {}) =>
  useQuery<any, Error>([API_ENDPOINTS.USERS, params], fetchUsers, {
    ...options,
    keepPreviousData: true,
  });

const fetchUser = async (id: string) => {
  const {
    data: { data },
  } = await UserRepository.find(`${API_ENDPOINTS.USERS}/${id}`);
  return data;
};

const useUserQuery = (id: string) => {
  return useQuery<any, Error>([API_ENDPOINTS.USERS, id], () => fetchUser(id));
};

export {
  useUsersQuery,
  fetchUsers,
  useUserQuery,
  fetchUser,
  fetchManagers,
  useManagersQuery,
};
