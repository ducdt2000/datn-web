import { adminAndOwnerOnly, adminOwnerAndStaffOnly } from '@utils/auth-utils';
import { ROUTES } from '@utils/routes';

export const siteSettings = {
  name: 'PickBazar',
  description: '',
  logo: {
    url: '/logo.svg',
    alt: 'PickBazar',
    href: '/',
    width: 128,
    height: 40,
  },
  defaultLanguage: 'en',
  author: {
    name: 'RedQ, Inc.',
    websiteUrl: 'https://redq.io',
    address: '',
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: ROUTES.PROFILE_UPDATE,
      labelTransKey: 'authorized-nav-item-profile',
    },
    {
      href: ROUTES.LOGOUT,
      labelTransKey: 'authorized-nav-item-logout',
    },
  ],
  currencyCode: 'USD',
  sidebarLinks: {
    admin: [
      {
        href: ROUTES.DASHBOARD,
        label: 'sidebar-nav-item-dashboard',
        icon: 'DashboardIcon',
      },
      {
        href: ROUTES.PRODUCTS,
        label: 'sidebar-nav-item-products',
        icon: 'ProductsIcon',
      },
      {
        href: ROUTES.PRODUCT_TYPES,
        label: 'sidebar-nav-item-productTypes',
        icon: 'CategoriesIcon',
      },
      {
        href: ROUTES.BRANDS,
        label: 'sidebar-nav-item-brands',
        icon: 'CategoriesIcon',
      },
      {
        href: ROUTES.ORDERS,
        label: 'sidebar-nav-item-orders',
        icon: 'OrdersIcon',
      },
      {
        href: ROUTES.USERS,
        label: 'sidebar-nav-item-users',
        icon: 'UsersIcon',
      },
      {
        href: ROUTES.WAREHOUSE,
        label: 'sidebar-nav-item-warehouse',
        icon: 'DashboardIcon',
      },
      {
        href: ROUTES.SETTINGS,
        label: 'sidebar-nav-item-settings',
        icon: 'SettingsIcon',
      },
    ],
    shop: [
      {
        href: (shop: string) => `${ROUTES.DASHBOARD}${shop}`,
        label: 'sidebar-nav-item-dashboard',
        icon: 'DashboardIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.ATTRIBUTES}`,
        label: 'sidebar-nav-item-attributes',
        icon: 'AttributeIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.PRODUCTS}`,
        label: 'sidebar-nav-item-products',
        icon: 'ProductsIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.ORDERS}`,
        label: 'sidebar-nav-item-orders',
        icon: 'OrdersIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.STAFFS}`,
        label: 'sidebar-nav-item-staffs',
        icon: 'UsersIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.WITHDRAWS}`,
        label: 'sidebar-nav-item-withdraws',
        icon: 'AttributeIcon',
        permissions: adminAndOwnerOnly,
      },
    ],
  },
  product: {
    placeholder: '/product-placeholder.svg',
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
};
