import Link from 'next/link';

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="bg-gray-800 text-white p-4 flex justify-between">
        Add Movie Summary
      </div>
      <main className="p-4 bg-gray-100 min-h-screen">
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
