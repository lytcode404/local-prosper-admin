const Table = ({ data }) => {
  console.log("Data inside Table component:", data);
  if (!data && data.length === 0) {
    <div>loading..</div>;
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Company Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {data.map((client) => (
              <tr key={client.id} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    <div className="relative w-8 h-8 mr-3 rounded-full">
                      <div
                        className="w-8 h-8 flex items-center justify-center rounded-full"
                        style={{ backgroundColor: getRandomColor() }}
                      >
                        <p className="text-white text-sm">
                          {client.userName?.charAt(0).toUpperCase()}
                        </p>
                      </div>
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{client.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {client.role}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">${client.companyName}</td>
                <td className="px-4 py-3 text-xs">
                  <span
                    className={`px-2 py-1 font-semibold leading-tight ${
                      client.status === "Active"
                        ? "text-green-700 bg-green-100"
                        : "text-red-700 bg-red-100"
                    } rounded-full dark:bg-green-700 dark:text-green-100`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{client.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-4 text-sm">
                    <button
                      className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                      aria-label="Edit"
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
