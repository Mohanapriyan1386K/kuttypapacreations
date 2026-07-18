import { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../component/PageHeader";
import { Eye } from "lucide-react";
import { useDispatch } from "react-redux";
import { openModal } from "../../Redux/Reducers/ModalReducer";
import { API_BASE } from "../../Constent/Constent";
import PageAnimation from "../../component/PageAnimation";

interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface EnquiryResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count: number;
  data: Enquiry[];
}

export default function EnquiryMangeMent() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getEnquiries = async (): Promise<void> => {
    try {
      setLoading(true);

      const res = await axios.get<EnquiryResponse>(
        `${API_BASE}/api/enquiry?page=${page}&limit=${limit}`,
      );

      setEnquiries(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewModalOpen = (data: any) => {
    dispatch(
      openModal({
        modalname: "ENQUIRYVIEW",
        data: {
          enquiry: data,
          width: "4xl",
        },
      }),
    );
  };

  useEffect(() => {
    getEnquiries();
  }, [page]);

  return (
    <PageAnimation>
      <div className="rounded-xl shadow overflow-hidden mt-20">
        <PageHeader title="Enquiry" onClick={() => {}} />
        <div className="overflow-x-auto mt-5">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    S.No
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-500">
                      No enquiries found.
                    </td>
                  </tr>
                ) : (
                  enquiries?.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-blue-50 even:bg-gray-50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-700">
                        {(page - 1) * limit + index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                            {item.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">{item.phone}</td>

                      <td className="px-6 py-4 text-gray-600">{item.email}</td>

                      <td className="px-6 py-4 max-w-xs">
                        <p
                          className="truncate text-gray-700"
                          title={item.subject}
                        >
                          {item.subject}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "Resolved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center text-gray-600">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleViewModalOpen(item)}
                            className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 border-t">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </PageAnimation>
  );
}
