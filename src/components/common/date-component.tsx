import moment from 'moment';

export const DateComponent = ({
  format = 'DD/MM/yyyy',
  date,
  className = '',
  ...props
}: {
  format?: string;
  date: Date;
  className?: string;
}) => (
  <span {...props} className={className}>
    {moment(date).format(format)}
  </span>
);
