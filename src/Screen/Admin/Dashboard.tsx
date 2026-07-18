import { useEffect, useState } from "react";
import { Package, Grid2x2, MessageSquare } from "lucide-react";
import { API_BASE } from "../../Constent/Constent";


function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalDocument: 0,
    totalCatgroy: 0,
    totalEnquiry: 0,
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/dashboard`)
      .then((res) => res.json())
      .then((data) => setDashboard(data.data))
      .catch(console.error);
  }, []);

  const cards = [
    {
      title: "Total Products",
      value: dashboard.totalDocument,
      icon: Package,
      bg: "bg-blue-500",
    },
    {
      title: "Total Categories",
      value: dashboard.totalCatgroy,
      icon: Grid2x2,
      bg: "bg-green-500",
    },
    {
      title: "Total Enquiries",
      value: dashboard.totalEnquiry,
      icon: MessageSquare,
      bg: "bg-orange-500",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-10 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards?.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition"
            >
              <div>
                <p className="text-gray-500">{item.title}</p>
                <h2 className="text-4xl font-bold mt-2">{item.value}</h2>
              </div>

              <div className={`${item.bg} p-4 rounded-full text-white`}>
                <Icon size={30} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;