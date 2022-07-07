import dynamic from 'next/dynamic';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  allowedRoles,
  checkRoleAccess,
  getAuthCredentials,
  isAuthenticated,
} from '@utils/auth-utils';
import { ROUTES } from '@utils/routes';
import AppLayout from '@components/layouts/app';
const BaseDashboard = dynamic(() => import('@components/dashboard/dashboard'));

export default function Dashboard({ role }: { role: string }) {
  const result = <BaseDashboard />;
  return result;
}

Dashboard.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const { token, role } = getAuthCredentials(ctx);
  if (
    !isAuthenticated({ token, role }) ||
    !checkRoleAccess(allowedRoles, role)
  ) {
    return {
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    };
  }
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
          'table',
          'widgets',
        ])),
        role,
      },
    };
  }
  return {
    props: {
      role,
    },
  };
};
