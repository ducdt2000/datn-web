import { useTranslation } from 'next-i18next';
import Spinner from '@components/ui/loader/spinner/spinner';
import UserDetail from './user-detail';
import { useUserQuery } from '@data/user/user.query';
import { useModalState } from '@components/ui/modal/modal.context';

const UserPopup = () => {
  const { data } = useModalState();

  const { t } = useTranslation();

  const { data: user, isLoading: loading } = useUserQuery(data);

  if (loading || !user)
    return (
      <div className="w-96 flex justify-center items-center h-96 bg-light relative">
        <Spinner text={t('common:text-loading')} />
      </div>
    );

  return <UserDetail user={user} loading={loading} />;
};

export default UserPopup;
