import ActionButtons from '@components/common/action-buttons';
import { DateComponent } from '@components/common/date-component';
import { AntdTable } from '@components/ui/table';
import { BrandPaginator } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export type IProps = {
  brands?: BrandPaginator;
  onPagination?: (current: number) => void;
  onOrder?: (by: string | undefined, type: string | undefined) => void;
};

const BrandList = ({ brands, onOrder }: IProps) => {
  const { data } = brands! ?? [];

  const router = useRouter();

  const { t } = useTranslation();

  const handleOnChange = (pagination: any, filter: any, sorter: any) => {
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
              width: 100,
              ellipsis: true,
            },
            {
              title: t('table:table-item-slug'),
              dataIndex: 'slug',
              key: 'slug',
              align: 'left',
              width: 100,
              ellipsis: true,
            },
            {
              title: t('table:table-item-type'),
              dataIndex: 'type',
              key: 'type',
              align: 'left',
              sorter: true,
              showSorterTooltip: false,
              width: 100,
              ellipsis: true,
            },
            {
              title: t('table:table-item-createdAt'),
              dataIndex: 'createdAt',
              key: 'createdAt',
              align: 'left',
              sorter: true,
              showSorterTooltip: false,
              width: 100,
              ellipsis: true,
              render: (createdAt: Date) => <DateComponent date={createdAt} />,
            },
            {
              title: t('table:table-item-updatedAt'),
              dataIndex: 'updatedAt',
              key: 'updatedAt',
              sorter: true,
              showSorterTooltip: false,
              align: 'left',
              width: 100,
              ellipsis: true,
              render: (updatedAt: Date) => <DateComponent date={updatedAt} />,
            },
            {
              title: t('table:table-item-actions'),
              key: 'actions',
              dataIndex: 'id',
              align: 'left',
              width: 80,
              render: (id: string) => (
                <ActionButtons
                  id={id}
                  editUrl={`${router.asPath}/${id}/update`}
                  deleteModalView="DELETE_BRAND"
                />
              ),
            },
          ]}
          dataSource={data}
          locale={{ emptyText: <span>{t('table:empty-table-data')}</span> }}
          rowKey="id"
          scroll={{ x: 900 }}
          pagination={false}
        ></AntdTable>
      </div>
    </>
  );
};

export default BrandList;
