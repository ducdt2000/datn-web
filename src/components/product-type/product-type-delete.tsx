import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import { useDeleteProductTypeMutation } from '@data/product-types/use-delete-product-type.mutation';

const ProductTypeDeleteView = () => {
  const { mutate: deleteProductType, isLoading: loading } =
    useDeleteProductTypeMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  async function handleDelete() {
    deleteProductType(data);
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

export default ProductTypeDeleteView;
