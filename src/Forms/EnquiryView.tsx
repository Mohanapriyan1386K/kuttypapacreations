import {
  // User,
  Mail,
  Phone,
  CalendarDays,
  MessageSquare,
  FileText,
} from "lucide-react";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Props {
  enquiry: Enquiry;
}

export default function EnquiryView({ enquiry }: Props) {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div>
          <h2 className="text-2xl font-bold">{enquiry.name}</h2>
          <p className="text-blue-100">Customer Enquiry Details</p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            enquiry.status === "Pending"
              ? "bg-yellow-400 text-yellow-900"
              : enquiry.status === "Resolved"
              ? "bg-green-400 text-green-900"
              : "bg-red-400 text-red-900"
          }`}
        >
          {enquiry.status}
        </span>
      </div>

      {/* Information */}
      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-xl border border-gray-200 p-5">
          <div className="mb-2 flex items-center gap-2 text-blue-600">
            <Mail size={18} />
            <span className="font-semibold">Email</span>
          </div>

          <p className="break-all text-gray-700">
            {enquiry.email}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 p-5">
          <div className="mb-2 flex items-center gap-2 text-green-600">
            <Phone size={18} />
            <span className="font-semibold">Phone</span>
          </div>

          <p>{enquiry.phone}</p>
        </div>

        <div className="rounded-xl border border-gray-200 p-5 md:col-span-2">
          <div className="mb-2 flex items-center gap-2 text-purple-600">
            <FileText size={18} />
            <span className="font-semibold">Subject</span>
          </div>

          <p>{enquiry.subject}</p>
        </div>

        <div className="rounded-xl border border-gray-200 p-5 md:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-orange-600">
            <MessageSquare size={18} />
            <span className="font-semibold">Message</span>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 leading-7 text-gray-700">
            {enquiry.message}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 p-5 md:col-span-2">
          <div className="mb-2 flex items-center gap-2 text-gray-600">
            <CalendarDays size={18} />
            <span className="font-semibold">Received On</span>
          </div>

          <p>
            {new Date(enquiry.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}