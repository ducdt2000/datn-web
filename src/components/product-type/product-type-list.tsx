import ActionButtons from '@components/common/action-buttons';
import { Table } from '@components/ui/table';
import { ProductType, ProductTypePaginator } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export type IProps = {
  productTypes?: ProductTypePaginator;
  onPagination: (current: number) => void;
};

const ProductTypeList = ({ productTypes }: IProps) => {
  const { data } = productTypes! ?? [];

  const router = useRouter();

  const { t } = useTranslation();

  const { alignLeft } = useIsRTL();

  let columns = [
    {
      title: t('table:table-item-name'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 200,
      ellipsis: true,
    },
    {
      title: t('table:table-item-code'),
      dataIndex: 'code',
      key: 'code',
      align: alignLeft,
      width: 200,
      ellipsis: true,
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
          deleteModalView="DELETE_PRODUCT_TYPE"
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

export default ProductTypeList;
