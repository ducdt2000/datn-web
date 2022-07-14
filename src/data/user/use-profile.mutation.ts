import { useQuery } from 'react-query';
import { API_ENDPOINTS } from './../../utils/api/endpoints';
import User from '@repositories/user';
import { User as TUser } from '../../ts-types/generated';

export const fetchMe = async () => {
  const {
    data: { data },
  } = await User.me(API_ENDPOINTS.ME);
  return data;
};

export const useMeQuery = () => {
  return useQuery<TUser, Error>([API_ENDPOINTS.ME], () => fetchMe());
};
