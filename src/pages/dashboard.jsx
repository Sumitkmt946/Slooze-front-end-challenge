import React, { useEffect, useState } from "react";
import PageLayout from "../components/layout";
import { Bar } from "react-chartjs-2";
import "../chartConfig";
import { DASHBOARD_URL } from "../constant";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiActivity,
  FiMoreHorizontal,
  FiArrowUp,
  FiArrowDown
} from "react-icons/fi";

// Mock Data for specific design elements
const RECENT_SALES = [
  { name: "Indra Maulara", email: "indra.maulara@gmail.com", amount: "+$1,500.00", avatar: "I" },
  { name: "Sijiiam", email: "sijiiam@gmail.com", amount: "+$1,500.00", avatar: "S" },
  { name: "Paromita", email: "paromita@gmail.com", amount: "+$1,500.00", avatar: "P" },
  { name: "Kavin", email: "kavin@gmail.com", amount: "+$1,500.00", avatar: "K" },
];

export default function Dashboard() {
  const token = sessionStorage.getItem("user");
  const role = token ? JSON.parse(atob(token)).role : "";

  const [productLabel, setProductLabel] = useState([]);
  const [productData, setProductData] = useState([]);

  // Fetch logic preserved
  const fetchData = async () => {
    try {
      const response = await fetch(DASHBOARD_URL);
      const datas = await response.json();
      const name = datas.map((key) => key.name).slice(0, 12); // Show more for the big chart
      const qty = datas.map((key) => key.quantity).slice(0, 12);

      setProductData(qty);
      setProductLabel(name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (role !== "manager" && role !== "admin") {
      // Assuming 'admin' or 'manager' can view dashboard based on previous code logic
      // The original code redirected if not manager. I'll keep it safe.
      if (role !== 'manager') window.location.href = "/product";
    }
    fetchData();
  }, [role]);

  // Chart Configuration
  const overviewChartData = {
    labels: productLabel.length ? productLabel : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: productData.length ? productData : [12, 19, 3, 5, 2, 3],
      backgroundColor: '#3B82F6', // Blue bars
      borderRadius: 4,
      barThickness: 24,
    }]
  };

  const overviewChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: { display: false }, // Hide numbers on bars for cleaner look
    },
    scales: {
      y: {
        grid: { borderDash: [4, 4], drawBorder: false },
        ticks: { display: true }
      },
      x: {
        grid: { display: false },
      }
    }
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Earning"
            value="$112,893.00"
            trend="+12.5%"
            icon={<FiDollarSign />}
            isPositive={true}
          />
          <StatsCard
            title="Total Views"
            value="112,893"
            trend="+12.5%"
            icon={<FiActivity />}
            isPositive={true}
          />
          <StatsCard
            title="Total Sales"
            value="112,893"
            trend="+12.5%"
            icon={<FiShoppingBag />}
            isPositive={true}
          />
          <StatsCard
            title="Subscriptions"
            value="112,893"
            trend="+12.5%"
            icon={<FiUsers />}
            isPositive={true}
          />
        </div>

        {/* Main Section: Chart + List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Overview Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold dark:text-white">Overview</h3>
                <p className="text-text-gray text-sm mt-1">Monthly sales performance</p>
              </div>
              <div className="flex gap-2">
                <select className="bg-gray-50 dark:bg-gray-700 border-none rounded-lg px-4 py-2 text-sm outline-none dark:text-white">
                  <option>Monthly</option>
                  <option>Weekly</option>
                </select>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <Bar data={overviewChartData} options={overviewChartOptions} />
            </div>
          </div>

          {/* Recent Sales List */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold dark:text-white">Recent Sales</h3>
              <button className="text-text-gray hover:text-primary"><FiMoreHorizontal /></button>
            </div>
            <p className="text-text-gray text-xs mb-6">You made 12 sales this month</p>

            <div className="space-y-6">
              {RECENT_SALES.map((sale, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-500 dark:text-gray-300">
                    {sale.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm dark:text-white">{sale.name}</h4>
                    <p className="text-xs text-text-gray">{sale.email}</p>
                  </div>
                  <span className="font-bold text-sm text-green-500">{sale.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Stats Graph (Optional/Mocked from design 'Inventory' / 'Stats') */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Product Inventory</h3>
            <div className="h-[200px]">
              {/* Reusing chart logic but with line or just simpler bar */}
              <Bar
                data={{ ...overviewChartData, datasets: [{ ...overviewChartData.datasets[0], backgroundColor: '#8B5CF6' }] }}
                options={overviewChartOptions}
              />
            </div>
          </div>
          {/* You could place a line chart or other stats here */}
        </div>
      </div>
    </PageLayout>
  );
}

function StatsCard({ title, value, trend, icon, isPositive }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-bg-main dark:bg-gray-700 rounded-xl text-xl text-text-dark dark:text-white">
          {icon}
        </div>
        <span className={`flex items-center text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />}
          {trend}
        </span>
      </div>
      <h3 className="text-text-gray text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl font-bold font-display dark:text-white">{value}</div>
    </div>
  )
}
