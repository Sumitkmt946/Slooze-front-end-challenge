import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layout";
import { getProducts, deleteProduct } from "../../dataService";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import Swal from "sweetalert2";

export default function ViewProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const datas = await getProducts();
      setData(datas);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6C5DD3', // Primary
      cancelButtonColor: '#FF754C',   // Error
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          fetchData(); // Refresh list
        } catch (error) {
          Swal.fire('Error!', 'Something went wrong.', 'error');
        }
      }
    });
  };

  // Filter logic
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display dark:text-white">Products</h1>
          <p className="text-text-gray text-sm mt-1">Manage your product inventory</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary/20 dark:text-white transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/product/add" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-shadow shadow-lg shadow-primary/25">
            <FiPlus className="text-lg" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="p-6 text-sm font-bold text-text-gray uppercase tracking-wider">Product Name</th>
                <th className="p-6 text-sm font-bold text-text-gray uppercase tracking-wider">Category</th>
                <th className="p-6 text-sm font-bold text-text-gray uppercase tracking-wider">Price</th>
                <th className="p-6 text-sm font-bold text-text-gray uppercase tracking-wider">Stock</th>
                <th className="p-6 text-sm font-bold text-text-gray uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-text-gray">Loading products...</td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((product) => (
                  <tr key={product.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-50 dark:border-gray-700/50 last:border-none">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg">
                          📦
                        </div>
                        <div>
                          <p className="font-bold text-text-dark dark:text-white">{product.name}</p>
                          <p className="text-xs text-text-gray">ID: #{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-sm font-medium text-text-dark dark:text-white">
                      <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold uppercase">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-6 text-sm font-bold text-text-dark dark:text-white">${product.price}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 w-24">
                          <div className="bg-success h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-xs font-medium text-text-gray">{product.quantity} in stock</span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link to={`/product/edit/${product.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <FiEdit className="text-lg" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-text-gray">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredData.length > 0 && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm text-text-gray">
            <span>Showing {filteredData.length} products</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" disabled>Previous</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
