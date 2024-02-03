import ChartComp from "@/Components/User/ChartComp";
import Users from "@/Containers/Users";
import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Charts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const collectionData1 = await fetchCollectionData(
          "Cardiovascular and General"
        );
        const collectionData2 = await fetchCollectionData("Digestive");
        const collectionData3 = await fetchCollectionData("Musculoskeletal");
        const collectionData4 = await fetchCollectionData("Reproductive");
        const collectionData5 = await fetchCollectionData("Respiratory");
        const collectionData6 = await fetchCollectionData("Skin and Hair");

        // Combine data from all collections into one array Cardiovascular and General

        const combinedData = {
          "Cardiovascular and General": collectionData1,
          Digestive: collectionData2,
          Musculoskeletal: collectionData3,
          Reproductive: collectionData4,
          Respiratory: collectionData5,
          "Skin and Hair": collectionData6,
        };

        setData(combinedData);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  async function fetchCollectionData(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));

      const categoryData = {};

      querySnapshot.forEach((doc) => {
        categoryData[doc.id] = doc.data();
      });

      return categoryData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  if (!data) {
    return "Loading...";
  }
  // console.log(data)

  return (
    <div className="pt-6">
      <div className=" w-full border-b-2 text-start mb-8">
        <h1 className="text-xl font-bold mb-4 text-gray-500">
          Select to View Activities of Businesses
        </h1>
      </div>
      <Users />
      <ChartComp data={data} />
    </div>
  );
};

export default Charts;
