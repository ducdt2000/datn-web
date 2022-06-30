import dynamic from 'next/dynamic';
import AdminLayout from './admin';

export default function AppLayout({
  userPermissions,
  ...props
}: {
  userPermissions: string[];
}) {
  return AdminLayout;
}
