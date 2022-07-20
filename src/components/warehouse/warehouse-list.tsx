import ActionButtons from '@components/common/action-buttons';
import { DateComponent } from '@components/common/date-component';
import Pagination from '@components/ui/pagination';
import { AntdTable } from '@components/ui/table';
import { WarehousePaginator, WAREHOUSE_STATUS } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { siteSettings } from '@settings/site.settings';
import { CheckMarkCircle } from '@components/icons/checkmark-circle';
import { BanUser } from '@components/icons/ban-user';

export type IProps = {
  warehouses?: WarehousePaginator;
  meta?: any;
  onPagination?: (current: number) => void;
  onOrder?: (by: string | undefined, type: string | undefined) => void;
};

const WarehouseList = ({ warehouses, onOrder, meta, onPagination }: IProps) => {
  const { data } = warehouses! ?? [];

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
              title: t('table:table-item-name'),
              dataIndex: 'name',
              key: 'name',
              sorter: true,
              showSorterTooltip: false,
              align: 'left',
              fixed: 'left',
              width: 100,
              ellipsis: true,
            },
            {
              title: t('table:table-item-status'),
              dataIndex: 'status',
              key: 'status',
              fixed: 'left',
              align: 'left',
              width: 40,
              ellipsis: true,
              render: (value: number) => {
                return (
                  <>
                    {value === WAREHOUSE_STATUS.ACTIVE ? (
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
              title: t('table:table-item-createdAt'),
              dataIndex: 'createdAt',
              key: 'createdAt',
              align: 'left',
              fixed: 'left',
              width: 100,
              ellipsis: true,
              render: (createdAt: Date) => <DateComponent date={createdAt} />,
            },
            {
              title: t('table:table-item-updatedAt'),
              dataIndex: 'updatedAt',
              key: 'updatedAt',
              align: 'left',
              fixed: 'left',
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
              render: (id: string, { status }) => (
                <ActionButtons
                  detailsUrl={`${router.asPath}/${id}`}
                  id={id}
                  anyStatus={true}
                  viewModal="BAN_WAREHOUSE"
                  editUrl={`${router.asPath}/${id}/update`}
                  isAnyActive={status === WAREHOUSE_STATUS.ACTIVE}
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

export default WarehouseList;
