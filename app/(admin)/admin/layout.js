import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '@/components/AdminHeader'; // Adjust the import path as necessary
// Assuming you have an AdminHeader component

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      <ToastContainer position="top-center" autoClose={2000} />
      <main>{children}</main>
    </>
  );
}
