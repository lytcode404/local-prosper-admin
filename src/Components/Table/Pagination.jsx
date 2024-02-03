const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t  bg-gray-50 sm:grid-cols-9 dark:text-gray-400">
      <span className="flex items-center col-span-3">
        Showing {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </span>
      <span className="col-span-2" />
      <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Table navigation">
          <ul className="inline-flex items-center">
            <li>
              <button
                className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                aria-label="Previous"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </li>
            {pages.map((page) => (
              <li key={page}>
                <button
                  className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${
                    currentPage === page ? "bg-purple-600 text-white" : ""
                  }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                aria-label="Next"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <svg
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </span>
    </div>
  );
};

export default Pagination;
