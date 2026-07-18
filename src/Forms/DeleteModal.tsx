import { Trash2 } from "lucide-react";

type DeleteModalProps = {
  title?: string;
  message?: string;
  onClose?: () => void;
  data?: {
    _id: string;
  };
  onSuccess?: () => void;
  onok?:()=>void;
};

export default function DeleteModal({
  title,
  message,
  onClose,
  onok
}: DeleteModalProps) {

  return (
    <div className="w-sm max-w-md rounded-2xl bg-white p-8">
      {/* Icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
        <Trash2 size={36} className="text-red-600" />
      </div>

      {/* Title */}
      <h2 className="mt-6 text-center text-2xl font-bold text-gray-800">
        {title}
      </h2>

      {/* Message */}
      <p className="mt-3 text-center text-gray-500">
        {message}
      </p>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={onClose}
          className="flex-1 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={onok}
          className="flex-1 rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}