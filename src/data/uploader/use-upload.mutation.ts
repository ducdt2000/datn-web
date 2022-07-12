import { useMutation, useQueryClient } from 'react-query';
import FileRepository from '@repositories/upload';
import { API_ENDPOINTS } from '@utils/api/endpoints';

export const useUploadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (input: any) => {
      return FileRepository.uploads(
        `${API_ENDPOINTS.PUBLIC_FILE}/uploads`,
        input
      );
    },
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PUBLIC_FILE);
      },
    }
  );
};
