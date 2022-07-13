import Modal from '@components/ui/modal/modal';
import dynamic from 'next/dynamic';
import { useModalAction, useModalState } from './modal.context';
const ProductTypeDeleteView = dynamic(
  () => import('@components/product-type/product-type-delete')
);

const BrandDeleteView = dynamic(() => import('@components/brand/brand-delete'));

const ManagedModal = () => {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'DELETE_PRODUCT_TYPE' && <ProductTypeDeleteView />}
      {view === 'DELETE_BRAND' && <BrandDeleteView />}
    </Modal>
  );
};

export default ManagedModal;
