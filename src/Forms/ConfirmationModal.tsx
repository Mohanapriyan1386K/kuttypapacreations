export default function ConfirmationModal({
  onOk,
  onClose,
}: {
  onOk?: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86l-8 14A1 1 0 003.14 19h17.72a1 1 0 00.85-1.5l-8-14a1 1 0 00-1.72 0z"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 className="mt-6 text-center text-2xl font-bold text-gray-800">
        Confirm Logout
      </h2>

      {/* Description */}
      <p className="mt-3 text-center text-gray-500">
        Are you sure you want to logout from your account?
        <br />
        You will need to login again to continue.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={onClose}
          className="flex-1 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            onOk?.();
            onClose?.();
          }}
          className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}