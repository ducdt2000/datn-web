import Settings from '@repositories/settings';
import { useQuery } from 'react-query';
import { Settings as TSettings } from '@ts-types/generated';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import setting from './settings.json';

export const fetchSettings = async () => {
  const { data } = await Settings.all(API_ENDPOINTS.SETTINGS);
  return data;
};

export const useSettingsQuery = () => {
  return useQuery<any, Error>([API_ENDPOINTS.SETTINGS], () => setting);
};
