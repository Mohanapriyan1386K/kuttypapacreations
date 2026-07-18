import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { MODAL_COMPONENT } from "./Modalcomponent";
import { closeModal } from "../Redux/Reducers/ModalReducer";

function GlobalModal() {
  const dispatch = useDispatch();

  const { data, modalname } = useSelector(
    (state: RootState) => state.modal
  );

  const {width}:any=data
  const handleClose = () => dispatch(closeModal());

  //@ts-ignore
  const Component = MODAL_COMPONENT[modalname];

  if (!modalname || !Component) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className={`relative  mx-w-${width} rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden animate-scaleIn`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center text-xl"
        >
          ✕
        </button>

        {/* Scrollable Content */}
        <div className="max-h-[90vh] overflow-y-auto">
          <Component {...data} onClose={handleClose} />
        </div>
      </div>
    </div>
  );
}

export default GlobalModal;