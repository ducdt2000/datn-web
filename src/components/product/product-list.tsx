import ActionButtons from '@components/common/action-buttons';
import { DateComponent } from '@components/common/date-component';
import Pagination from '@components/ui/pagination';
import { AntdTable } from '@components/ui/table';
import { ProductPaginator } from '@ts-types/generated';
import { Image } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export type IProps = {
  products?: ProductPaginator;
  meta?: any;
  onPagination?: (current: number) => void;
  onOrder?: (by: string | undefined, type: string | undefined) => void;
};

const ProductList = ({ products, onOrder, meta, onPagination }: IProps) => {
  const { data } = products! ?? [];

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
              dataIndex: 'defaultImageLink',
              key: 'defaultImageLink',
              showSorterTooltip: false,
              width: 74,
              render: (imageLink) => (
                <Image
                  src={imageLink}
                  width={42}
                  height={42}
                  alt={'image'}
                  preview={false}
                />
              ),
            },
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
              title: t('table:table-item-code'),
              dataIndex: 'code',
              key: 'code',
              align: 'left',
              width: 100,
              ellipsis: true,
            },
            {
              title: t('table:table-item-productType'),
              dataIndex: 'productType',
              key: 'productType',
              align: 'left',
              width: 100,
              ellipsis: true,
              render: (productType) => productType?.name,
            },
            {
              title: t('table:table-item-brand'),
              dataIndex: 'brand',
              key: 'brand',
              align: 'left',
              width: 100,
              ellipsis: true,
              render: (brand) => brand?.name,
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
              title: t('table:table-item-price'),
              dataIndex: 'price',
              key: 'price',
              sorter: true,
              showSorterTooltip: false,
              align: 'left',
              width: 100,
              ellipsis: true,
              render: (price) => {
                var formater = new Intl.NumberFormat('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                });

                return formater.format(price);
              },
            },
            {
              title: t('table:table-item-starPoint'),
              dataIndex: 'starPoint',
              key: 'startPoint',
              sorter: true,
              showSorterTooltip: false,
              align: 'left',
              width: 100,
              ellipsis: true,
            },
            {
              title: t('table:table-item-countInStock'),
              dataIndex: 'countInStock',
              key: 'countInStock',
              align: 'left',
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
              fixed: 'right',
              width: 80,
              render: (id: string) => (
                <ActionButtons
                  id={id}
                  editUrl={`${router.asPath}/${id}/update`}
                  deleteModalView="DELETE_PRODUCT"
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

export default ProductList;
