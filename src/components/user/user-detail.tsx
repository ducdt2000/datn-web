import { genderMap, User } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useModalAction } from '@components/ui/modal/modal.context';
import Image from 'next/image';
import { siteSettings } from '@settings/site.settings';
import { CheckMarkFill } from '@components/icons/checkmark-circle-fill';
import { CloseFillIcon } from '@components/icons/close-fill';
import { MapPin } from '@components/icons/map-pin';
import { formatAddress } from '@utils/format-address';
import { PhoneIcon } from '@components/icons/phone';
import EmailIcon from '@components/icons/email-icon';
import { UserIcon } from '@components/icons/user-icon';
import BirthdayIcon from '@components/icons/birthday-icon';
import { DateComponent } from '@components/common/date-component';
import { MoreIcon } from '@components/icons/more-icon';

const UserDetail = ({ user, loading }: { user: User; loading: any }) => {
  const { t } = useTranslation();

  const {
    isActive,
    fullname,
    city,
    district,
    address,
    phone,
    email,
    username,
    gender,
    birthday,
    role,
  } = user;

  const router = useRouter();
  const { closeModal } = useModalAction();

  const navigate = (path: string) => {
    router.push(path);
    closeModal();
  };

  return (
    <article className="bg-light w-full max-w-6xl xl:min-w-[1152px] relative z-[51] md:rounded-xl">
      <div className="order-2 xl:order-1 col-span-12 sm:col-span-6 xl:col-span-4 3xl:col-span-3">
        <div className="py-8 px-6 bg-white rounded flex flex-col items-center">
          <div className="w-36 h-36 relative rounded-full mb-5">
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center border border-gray-100 rounded-full">
              <Image
                src={user.avatarLink ?? siteSettings?.avatar?.placeholder}
                layout="fill"
                objectFit="contain"
              />
            </div>
            {isActive ? (
              <div className="w-5 h-5 rounded-full overflow-hidden bg-light absolute bottom-4 end-2">
                <CheckMarkFill width={20} className="me-2 text-accent" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full overflow-hidden bg-light absolute bottom-4 end-2">
                <CloseFillIcon width={20} className="me-2 text-red-500" />
              </div>
            )}
          </div>
          <h1 className="text-xl font-semibold text-heading">{fullname}</h1>
          <div className="flex-col grid grid-cols-4 gap-4">
            <div className="flex w-full justify-start mt-5">
              <span className="text-muted-light mt-0.5 me-2">
                <UserIcon width="16" height="16" />
              </span>
              <a className="text-body text-sm">
                {username ?? t('common:text-no-contact')}
              </a>
            </div>
            <div className="flex w-full justify-start mt-5">
              <span className="text-muted-light mt-0.5 me-2">
                <PhoneIcon width={16} />
              </span>
              <a href={`tel:${phone}`} className="text-body text-sm">
                {phone ?? t('common:text-no-contact')}
              </a>
            </div>
            <div className="flex w-full justify-start mt-5">
              <span className="text-muted-light mt-0.5 me-2">
                <EmailIcon width={16} />
              </span>
              <a href={`mail:${email}`} className="text-body text-sm">
                {email ?? t('common:text-no-contact')}
              </a>
            </div>
            <div className="flex w-full justify-start mt-5">
              <span className="text-muted-light mt-0.5 me-2">
                <MapPin width={16} />
              </span>
              <address className="text-body text-sm not-italic">
                {formatAddress(address, district, city)}
              </address>
            </div>
            <div className="flex w-full justify-start mt-5">
              <span className="text-muted-light mt-0.5 me-2">
                <BirthdayIcon width={16} />
              </span>
              <DateComponent
                className="text-body text-sm not-italic"
                date={birthday}
              />
            </div>
            <div className="flex w-full justify-start mt-5">
              <span className="text-muted-light mt-0.5 me-2">
                <MoreIcon width={16} />
              </span>
              <a className="text-body text-sm">
                {role ?? t('common:text-no-contact')}
              </a>
            </div>
            <div className="flex w-full justify-start mt-5">
              <span className="text-muted-light mt-0.5 me-2">
                <MoreIcon width={16} />
              </span>
              <a className="text-body text-sm">{genderMap.get(gender)}</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default UserDetail;
