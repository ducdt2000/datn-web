import moment from 'moment';

export const DateComponent = ({
  format = 'DD/MM/yyyy',
  date,
}: {
  format?: string;
  date: Date;
}) => <span>{moment(date).format(format)}</span>;
