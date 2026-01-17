import ReactDOM from "react-dom";
export default function ConfirmModal({ open,
    title,
    description,
    closebtnName,
    continuebtnName,
    onConfirm,
    onCancel }) {

    if (!open) return null;

    const modalRoot = document.getElementById("modal");
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center " onClick={onCancel}>
            <div className="bg-white rounded-lg p-5 w-[320px]" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-gray-600 mt-2">{description}</p>

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm border rounded"
                    >
                        {closebtnName}
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm bg-purple-500 text-white rounded"
                    >
                        {continuebtnName}
                    </button>
                </div>
            </div>
        </div>,
        modalRoot
    )
}