import ActionButtons from '@components/common/action-buttons';
import { DateComponent } from '@components/common/date-component';
import Pagination from '@components/ui/pagination';
import { AntdTable } from '@components/ui/table';
import { UserPaginator, USER_ACTIVE } from '@ts-types/generated';
import { Image } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { siteSettings } from '@settings/site.settings';
import { GENDER } from '@ts-types/generated';
import { CheckMarkCircle } from '@components/icons/checkmark-circle';
import { BanUser } from '@components/icons/ban-user';

const genderMap = new Map<number, string>();
genderMap.set(GENDER.FEMALE, 'Female');
genderMap.set(GENDER.MALE, 'Male');
genderMap.set(GENDER.OTHER, 'Other');

export type IProps = {
  users?: UserPaginator;
  meta?: any;
  onPagination?: (current: number) => void;
  onOrder?: (by: string | undefined, type: string | undefined) => void;
};

const UserList = ({ users, onOrder, meta, onPagination }: IProps) => {
  const { data } = users! ?? [];

  const router = useRouter();

  const { t } = useTranslation();

  const handleOnChange = (_pagination: any, _filter: any, sorter: any) => {
    if (onOrder) {
      onOrder(
        sorter.field,
        sorter.order === 'descend'
          ? 'DESC'
          : sorter.order === 'ascend'
          ? 'ASC'
          : undefined
      );
    }
  };

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <div className="flex justify-end items-center">
          <Pagination total={meta?.meta?.count} onChange={onPagination} />
        </div>
        <AntdTable
          onChange={handleOnChange}
          columns={[
            {
              title: t('table:table-item-image'),
              dataIndex: 'avatarLink',
              key: 'avatarLink',
              showSorterTooltip: false,
              fixed: 'left',

              width: 42,
              render: (imageLink) => (
                <Image
                  src={imageLink ?? siteSettings?.avatar?.placeholder}
                  width={42}
                  height={42}
                  alt={'image'}
                  preview={false}
                />
              ),
            },
            {
              title: t('table:table-item-name'),
              dataIndex: 'fullname',
              key: 'fullname',
              sorter: true,
              showSorterTooltip: false,
              align: 'left',
              fixed: 'left',
              width: 100,
              ellipsis: true,
            },
            {
              title: t('table:table-item-username'),
              dataIndex: 'username',
              key: 'username',
              align: 'left',
              fixed: 'left',

              width: 100,
              ellipsis: true,
            },
            {
              title: t('table:table-item-email'),
              dataIndex: 'email',
              key: 'email',
              align: 'left',
              fixed: 'left',

              width: 100,
              ellipsis: true,
            },
            {
              title: t('table:table-item-role'),
              dataIndex: 'role',
              key: 'role',
              align: 'left',
              fixed: 'left',
              width: 50,
              ellipsis: true,
            },
            {
              title: t('table:table-item-gender'),
              dataIndex: 'gender',
              key: 'gender',
              fixed: 'left',
              align: 'left',
              width: 50,
              ellipsis: true,
              render: (value: number) => {
                return <> {genderMap.get(value)}</>;
              },
            },
            {
              title: t('table:table-item-status'),
              dataIndex: 'isActive',
              key: 'isActive',
              fixed: 'left',
              align: 'left',
              width: 40,
              ellipsis: true,
              render: (value: number) => {
                return (
                  <>
                    {value === USER_ACTIVE.ACTIVE ? (
                      <div className="text-accent transition duration-200 hover:text-accent focus:outline-none">
                        <CheckMarkCircle width={20} />
                      </div>
                    ) : (
                      <div className=" text-red-500 transition duration-200 hover:text-red-600 focus:outline-none">
                        <BanUser width={20} />
                      </div>
                    )}
                  </>
                );
              },
            },
            {
              title: t('table:table-item-birthday'),
              dataIndex: 'birthday',
              key: 'birthday',
              showSorterTooltip: false,
              align: 'left',
              fixed: 'left',
              width: 100,
              ellipsis: true,
              render: (birthday: Date) => <DateComponent date={birthday} />,
            },
            {
              title: t('table:table-item-createdAt'),
              dataIndex: 'createdAt',
              key: 'createdAt',
              align: 'left',
              sorter: true,
              fixed: 'left',
              showSorterTooltip: false,
              width: 100,
              ellipsis: true,
              render: (createdAt: Date) => <DateComponent date={createdAt} />,
            },
            {
              title: t('table:table-item-actions'),
              key: 'actions',
              dataIndex: 'id',
              align: 'left',
              fixed: 'right',
              width: 60,
              render: (id: string, { isActive }) => (
                <ActionButtons
                  detailsUrl={`${router.asPath}/${id}/update`}
                  id={id}
                  userStatus={true}
                  isUserActive={isActive === USER_ACTIVE.ACTIVE}
                />
              ),
            },
          ]}
          dataSource={data}
          locale={{
            emptyText: <span>{t('table:empty-table-data')}</span>,
          }}
          rowKey="id"
          scroll={{ x: 900 }}
          pagination={false}
        ></AntdTable>
      </div>
    </>
  );
};

export default UserList;
