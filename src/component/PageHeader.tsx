import { Plus } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  buttonText?: string;
  onClick: () => void;
};

function PageHeader({
  title,
  // subtitle,
  buttonText = "Add New",
  onClick,
}: Props) {
  return (
    <div className="mb-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {title}
          </h1>

          {/* {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )} */}
        </div>

        <button
          onClick={onClick}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-2 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
        >
          <Plus size={18} />
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default PageHeader;