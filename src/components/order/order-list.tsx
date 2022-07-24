import Pagination from '@components/ui/pagination';
import dayjs from 'dayjs';
import { Table } from '@components/ui/table';
import ActionButtons from '@components/common/action-buttons';
import usePrice from '@utils/use-price';
import { formatAddress } from '@utils/format-address';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { OrderPaginator, OrderStatus, UserAddress } from '@ts-types/generated';
// import InvoicePdf from './invoice-pdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@utils/locals';
import { ORDER_STATUS_COLOR, ORDER_STATUS_NAME } from '@ts-types/custom.types';

type IProps = {
  orders: OrderPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const OrderList = ({ orders, onPagination }: IProps) => {
  const { data, paginatorInfo } = orders! ?? {};
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;
  const router = useRouter();
  const { alignLeft } = useIsRTL();

  data.forEach((item: any) => {
    const { price } = usePrice({
      amount: item.bill,
    });

    const { price: total } = usePrice({
      amount: item.bill,
    });

    item.priceString = price;
    item.totalString = total;
  });

  console.log('thisisitems22', data);

  const columns = [
    {
      title: t('table:table-item-id'),
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 150,
    },
    {
      title: t('table:table-item-total'),
      dataIndex: 'totalString',
      key: 'totalString',
      align: 'center',
      width: 120,
      render: (value: any) => {
        return <span className="whitespace-nowrap">{value}</span>;
      },
    },
    {
      title: t('table:table-item-order-date'),
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return (
          <span className="whitespace-nowrap">
            {dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}
          </span>
        );
      },
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'status',
      key: 'status',
      align: alignLeft,
      render: (status: any) => (
        <span
          className="whitespace-nowrap font-semibold"
          style={{ color: ORDER_STATUS_COLOR[status] }}
        >
          {ORDER_STATUS_NAME[status]}
        </span>
      ),
    },
    {
      title: t('table:table-item-shipping-address'),
      dataIndex: 'shipping_address',
      key: 'shipping_address',
      align: alignLeft,
      render: (_: any, record: any) => (
        <div>
          {formatAddress(record?.address, record?.district, record?.address)}
        </div>
      ),
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      width: 100,
      render: (id: string) => (
        <ActionButtons id={id} detailsUrl={`${router.asPath}/${id}`} />
      ),
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={data}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => '',
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo?.total}
            current={paginatorInfo?.currentPage}
            pageSize={paginatorInfo?.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default OrderList;
