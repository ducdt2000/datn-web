import dynamic from 'next/dynamic';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@utils/auth-utils';
import { ROUTES } from '@utils/routes';
import AppLayout from '@components/layouts/app';
const BaseDashboard = dynamic(() => import('@components/dashboard/dashboard'));

export default function Dashboard({}: // userPermissions,
{
  //userPermissions: string[];
}) {
  const result = <BaseDashboard />;
  return result;
}

Dashboard.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const { token, permissions } = getAuthCredentials(ctx);
  // if (
  //   !isAuthenticated({ token, permissions }) ||
  //   !hasAccess(allowedRoles, permissions)
  // ) {
  //   return {
  //     redirect: {
  //       destination: ROUTES.LOGIN,
  //       permanent: false,
  //     },
  //   };
  // }
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
          'table',
          'widgets',
        ])),
        userPermissions: permissions,
      },
    };
  }
  return {
    props: {
      userPermissions: permissions,
    },
  };
};
