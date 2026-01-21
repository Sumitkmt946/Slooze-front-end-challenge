import React, { useState } from "react";
import PageLayout from "../../components/layout";
import { ADD_URL } from "../../constant";
import { FiImage } from "react-icons/fi";

export default function Addproduct() {
  const [error, setError] = useState("");
  const [type, setType] = useState("success");
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 0,
    weight: 0,
    price: 0,
    description: "", // Visual only
    tags: "", // Visual only
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Construct payload matching existing backend expectation
    const payload = {
      name: formData.name,
      quantity: Number(formData.quantity),
      weight: Number(formData.weight),
      price: Number(formData.price),
      category: formData.category
    };

    try {
      const response = await fetch(ADD_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" } // Ensure generic header
      });

      if (response.ok) {
        setType("success");
        setError("Product added successfully!");
        setFormData({ name: "", category: "", quantity: 0, weight: 0, price: 0, description: "", tags: "" });
      } else {
        setType("error");
        setError("Failed to add product");
      }
    } catch (error) {
      setType("error");
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display dark:text-white">Add New Product</h1>
            <p className="text-text-gray text-sm mt-1">Create new product item for the store</p>
          </div>

          <div className="flex items-center gap-4">
            <button type="button" className="px-6 py-2.5 rounded-xl border border-error text-error font-medium hover:bg-error/5 transition-colors">
              Discard
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save Product"}
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
                    placeholder="e.g. Nike Air Max"
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
                <div>
                  <label className="block text-sm font-medium text-text-gray mb-2">Discount (%)</label>
                  <input
                    type="number"
                    disabled
                    placeholder="0%"
                    className="w-full px-4 py-3 bg-bg-main dark:bg-gray-700 rounded-xl outline-none opacity-60 cursor-not-allowed dark:text-white"
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
                <p className="text-sm font-medium dark:text-white">Drag and drop image here</p>
                <p className="text-xs text-text-gray mt-1">or click to browse</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-6 dark:text-white">Thumbnail</h3>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer min-h-[150px]">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-xl flex items-center justify-center text-gray-400 mb-4">
                  <FiImage className="text-2xl" />
                </div>
                <p className="text-sm font-medium dark:text-white">Drag and drop thumbnail</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </PageLayout>
  );
}
