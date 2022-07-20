import ConfirmationCard from '@components/common/confirmation-card';
import { SettingsIcon } from '@components/icons/sidebar';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import { useUpdateWarehouseStatusMutation } from '@data/warehouses/use-update-status-warehouse.mutation';

const WarehouseUpdateStatusView = () => {
  const { mutate: updateWarehouseStatus, isLoading: loading } =
    useUpdateWarehouseStatusMutation();

  const { data } = useModalState();
  const type = data?.type;
  const warehouseId = data?.id;

  const { closeModal } = useModalAction();

  async function handleUpdate() {
    updateWarehouseStatus({
      variables: {
        input: { id: warehouseId, status: type === 'lock' ? 2 : 1 },
      },
    });
    closeModal();
  }
  return (
    <ConfirmationCard
      isDelete={false}
      icon={<SettingsIcon className="mt-4 w-12 h-12 m-auto text-accent" />}
      title={
        type === 'lock' ? 'warehouse-lock-confirm' : 'warehouse-unlock-confirm'
      }
      description={'update-warehouseStatus-confirm'}
      onCancel={closeModal}
      onAccept={handleUpdate}
      acceptBtnLoading={loading}
    />
  );
};

export default WarehouseUpdateStatusView;
