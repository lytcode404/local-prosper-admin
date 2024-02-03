import Pagination from "@/Components/Table/Pagination";
import Table from "@/Components/Table/Table";
import { fetchUserstData } from "@/redux/UsersData";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ITEMS_PER_PAGE = 10;

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedData, setFetchedData] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.data);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only fetch data when the status is "idle"
        if (status === "idle") {
          dispatch(fetchUserstData());
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [dispatch, status]);

  useEffect(() => {
    // Check if usersData is available and not null
    if (usersData) {
      // Update fetchedData with usersData
      setFetchedData(usersData);
      console.log("Fetched Data:", fetchedData);
    }
  }, [usersData, fetchedData]);

  useEffect(() => {
    // Calculate the range of data to display based on the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Get the subset of data to display
    const paginatedData = fetchedData.slice(startIndex, endIndex);

    setData(paginatedData);
  }, [currentPage, fetchedData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!fetchedData) {
    return "Loading...";
  }

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        {data && data.length > 0 && <Table data={data} />}
        <Pagination
          totalItems={fetchedData.length}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Users;
