import React, { useEffect, useState, useCallback } from "react";
import PageLayout from "../../components/layout";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../dataService";
import { FiImage, FiArrowLeft } from "react-icons/fi";

export default function Editproduct() {
  const [prodId, setProdId] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState("success");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 0,
    weight: 0,
    price: 0,
    description: "", // Visual only
  });

  const getAllProduct = useCallback(async () => {
    try {
      setProdId(params.id);
      const data = await getProductById(params.id);

      if (data.length > 0) {
        const product = data[0];
        setFormData({
          name: product.name,
          category: product.category,
          quantity: product.quantity,
          weight: product.weight,
          price: product.price,
          description: product.description || ""
        });
      } else {
        setError("Product not found");
        setType("error");
      }
    } catch (e) {
      setError("Error fetching product data");
      setType("error");
    } finally {
      setPageLoading(false);
    }
  }, [params]);

  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      quantity: Number(formData.quantity),
      weight: Number(formData.weight),
      price: Number(formData.price),
      category: formData.category
    };

    try {
      await updateProduct(prodId, payload);
      setType("success");
      setError("Product updated successfully!");
    } catch (error) {
      setType("error");
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <PageLayout>
        <div className="flex h-full items-center justify-center text-text-gray">Loading product...</div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <form onSubmit={handleUpdate} className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => navigate('/product')} className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-gray">
              <FiArrowLeft className="text-xl" />
            </button>
            <div>
              <h1 className="text-2xl font-bold font-display dark:text-white">Edit Product</h1>
              <p className="text-text-gray text-sm mt-1">Update product details</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="button" onClick={() => navigate('/product')} className="px-6 py-2.5 rounded-xl border border-gray-200 text-text-gray font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-70"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </div>

        {error && (
          <div className={`mb-6 p-4 rounded-xl ${type === 'success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-2 space-y-8">
            {/* General Info Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-6 dark:text-white">General Information</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-gray mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bg-main dark:bg-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-gray mb-2">Product Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bg-main dark:bg-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Nail">Nail</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-gray mb-2">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bg-main dark:bg-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-gray mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bg-main dark:bg-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-gray mb-2">Description</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-bg-main dark:bg-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none dark:text-white"
                    placeholder="Product description..."
                  />
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-6 dark:text-white">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-gray mb-2">Base Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bg-main dark:bg-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Images */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-6 dark:text-white">Product Images</h3>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer min-h-[200px]">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-xl flex items-center justify-center text-gray-400 mb-4">
                  <FiImage className="text-2xl" />
                </div>
                <p className="text-sm font-medium dark:text-white">Change Image</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </PageLayout>
  );
}
