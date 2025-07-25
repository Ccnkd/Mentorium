import React from "react";

const UnauthorizedModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Access Denied</h2>
        <p className="text-sm text-gray-700 mb-4">
          You do not have permission to view this page.
        </p>
        {/* Optionally: logout button, or go back */}
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedModal;

