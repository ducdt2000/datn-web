import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import { useDeleteBrandMutation } from '@data/brands/use-delete-brand.mutation';

const BrandDeleteView = () => {
  const { mutate: deleteBrand, isLoading: loading } = useDeleteBrandMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  async function handleDelete() {
    deleteBrand(data);
    closeModal();
  }
  return (
    <ConfirmationCard
      description={'delete-item-confirm'}
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default BrandDeleteView;
