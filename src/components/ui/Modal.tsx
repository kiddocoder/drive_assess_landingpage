
import { X } from "lucide-react";
import React from "react";

export default function Modal({
    children,
    onClose,
}: {
    children: React.ReactNode;
    onClose: () => void;
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose} // close when clicking background
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()} // prevent closing on inside click
            >
                <button
                    className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <X className="" />
                </button>
                {children}
            </div>
        </div>
    );
}
