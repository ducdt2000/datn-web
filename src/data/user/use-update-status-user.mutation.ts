import { API_ENDPOINTS } from '../../utils/api/endpoints';
import { useMutation, useQueryClient } from 'react-query';
import UserRepository from '@repositories/user';
import { toast } from 'react-toastify';

export interface IUserUpdateStatusVariables {
  variables: {
    type: string;
    input: { userId: string };
  };
}

export const useUpdateUserStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ variables }: IUserUpdateStatusVariables) => {
      if (variables.type === 'lock') {
        return UserRepository.lock(
          `${API_ENDPOINTS.LOCK_ACCOUNT}`,
          variables.input
        );
      } else {
        return UserRepository.unlock(
          `${API_ENDPOINTS.UNLOCK_ACCOUNT}`,
          variables.input
        );
      }
    },
    {
      onSuccess(data) {
        toast.success(data);
      },
      onError(error: any) {
        toast.error(error?.response?.data?.error?.message);
      },
      onSettled() {
        queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      },
    }
  );
};
