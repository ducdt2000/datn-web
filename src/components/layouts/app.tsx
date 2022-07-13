import dynamic from 'next/dynamic';

const AdminLayout = dynamic(() => import('@components/layouts/admin'));

export default function AppLayout({ role, ...props }: { role: string }) {
  return <AdminLayout {...props} />;
}
