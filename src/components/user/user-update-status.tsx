import ConfirmationCard from '@components/common/confirmation-card';
import { SettingsIcon } from '@components/icons/sidebar';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import { useUpdateUserStatusMutation } from '@data/user/use-update-status-user.mutation';

const UserUpdateStatusView = () => {
  const { mutate: updateUserStatus, isLoading: loading } =
    useUpdateUserStatusMutation();

  const { data } = useModalState();
  const type = data?.type;
  const userId = data?.id;

  const { closeModal } = useModalAction();

  async function handleUpdate() {
    updateUserStatus({
      variables: { type, input: { userId } },
    });
    closeModal();
  }
  return (
    <ConfirmationCard
      isDelete={false}
      icon={<SettingsIcon className="mt-4 w-12 h-12 m-auto text-accent" />}
      title={type === 'lock' ? 'user-lock-confirm' : 'user-unlock-confirm'}
      description={'update-userStatus-confirm'}
      onCancel={closeModal}
      onAccept={handleUpdate}
      acceptBtnLoading={loading}
    />
  );
};

export default UserUpdateStatusView;
