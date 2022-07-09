import ActionButtons from '@components/common/action-buttons';
import { DateComponent } from '@components/common/date-component';
import { Table } from '@components/ui/table';
import { Brand, BrandPaginator } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export type IProps = {
  brands?: BrandPaginator;
  onPagination?: (current: number) => void;
};

const BrandList = ({ brands }: IProps) => {
  const { data } = brands! ?? [];

  const router = useRouter();

  const { t } = useTranslation();

  const { alignLeft } = useIsRTL();

  let columns = [
    {
      title: t('table:table-item-name'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 100,
      ellipsis: true,
    },
    {
      title: t('table:table-item-slug'),
      dataIndex: 'slug',
      key: 'slug',
      align: alignLeft,
      width: 100,
      ellipsis: true,
    },
    {
      title: t('table:table-item-type'),
      dataIndex: 'type',
      key: 'type',
      align: alignLeft,
      width: 100,
      ellipsis: true,
    },
    {
      title: t('table:table-item-createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: alignLeft,
      width: 100,
      ellipsis: true,
      render: (createdAt: Date) => <DateComponent date={createdAt} />,
    },
    {
      title: t('table:table-item-updatedAt'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: alignLeft,
      width: 100,
      ellipsis: true,
      render: (updatedAt: Date) => <DateComponent date={updatedAt} />,
    },
    {
      title: t('table:table-item-actions'),
      key: 'actions',
      dataIndex: 'id',
      align: alignLeft,
      width: 80,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${router.asPath}/${id}/update`}
          deleteModalView="DELETE_BRAND"
        />
      ),
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={data}
          rowKey="id"
          scroll={{ x: 900 }}
        ></Table>
      </div>
    </>
  );
};

export default BrandList;
