import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center p-4 fixed bottom-0 w-full">
      <div className="flex items-center space-x-4 bg-gray-900 shadow-lg rounded-full px-6 py-3">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`flex items-center font-bold text-xl space-x-1 textbtn ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:text-blue-600"
            }`}
        >
          <ChevronLeft size={18} /> <span>Previous</span>
        </button>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`flex items-center font-bold text-xl space-x-1 textbtn ${page === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:text-blue-600"
            }`}
        >
          <span>Next</span> <ChevronRight size={18} />
        </button>

        {/* Results Count */}
        <span className="txt ml-4">
          Showing {page} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default Pagination;
