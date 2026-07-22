import { CheckCircle, XCircle } from "lucide-react";

export default function ReservationStatusModal({
  open,
  success,
  title,
  message,
  buttonText,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300">

        <div className="p-8 text-center">

          <div className="flex justify-center mb-5">

            {success ? (
              <CheckCircle
                size={70}
                className="text-green-600"
              />
            ) : (
              <XCircle
                size={70}
                className="text-red-600"
              />
            )}

          </div>

          <h2 className="text-2xl font-bold text-navy">
            {title}
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            {message}
          </p>

          <button
            onClick={onClose}
            className="mt-8 w-full rounded-xl bg-burnt py-3 font-semibold text-white transition hover:bg-burnt-light"
          >
            {buttonText}
          </button>

        </div>

      </div>
    </div>
  );
}