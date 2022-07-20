import { AntdTable } from '@components/ui/table';
import { Warehouse } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';

const WarehouseItemList = ({ warehouse }: { warehouse: Warehouse }) => {
  const { t } = useTranslation();

  const data = warehouse.items;

  return (
    <AntdTable
      columns={[
        {
          title: t('table:table-item-code'),
          dataIndex: 'code',
          key: 'code',
          align: 'left',
          fixed: 'left',
          width: 100,
          ellipsis: true,
        },
        {
          title: t('table:table-item-name'),
          dataIndex: 'name',
          key: 'name',
          align: 'left',
          fixed: 'left',
          width: 100,
          ellipsis: true,
        },
        {
          title: t('table:table-item-amount'),
          dataIndex: 'amount',
          key: 'amount',
          align: 'left',
          fixed: 'left',
          width: 100,
          ellipsis: true,
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
  );
};

export default WarehouseItemList;
