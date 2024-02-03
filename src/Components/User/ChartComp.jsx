import React, { useEffect, useState } from "react";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import AllIngred from "./AllIngred";

const ChartComp = ({ data }) => {
  const [ingredientDetails, setIngredientDetails] = useState({});

  const trimIngredientName = (ingredient) => {
    const closingBracketIndex = ingredient.indexOf(")");
    if (closingBracketIndex !== -1) {
      return ingredient.substring(0, closingBracketIndex + 1);
    }
    return ingredient;
  };

  useEffect(() => {
    const details = {};

    Object.keys(data).forEach((classKey) => {
      const classObj = data[classKey];
      Object.keys(classObj).forEach((diseaseKey) => {
        const diseaseObj = classObj[diseaseKey];
        if (diseaseObj.hasOwnProperty("remedyIngredients")) {
          diseaseObj.remedyIngredients.forEach((ingredient) => {
            const trimmedIngredient = trimIngredientName(ingredient);
            if (!details[trimmedIngredient]) {
              details[trimmedIngredient] = {
                count: 1,
                classes: { [classKey]: [diseaseKey] },
              };
            } else {
              details[trimmedIngredient].count++;
              if (!details[trimmedIngredient].classes[classKey]) {
                details[trimmedIngredient].classes[classKey] = [diseaseKey];
              } else {
                details[trimmedIngredient].classes[classKey].push(diseaseKey);
              }
            }
          });
        }
      });
    });

    const detailsArray = Object.entries(details).map(([name, detail]) => ({
      name,
      ...detail,
    }));

    detailsArray.sort((a, b) => b.count - a.count);

    const sortedDetails = {};
    detailsArray.forEach((item) => {
      sortedDetails[item.name] = { ...item };
    });

    setIngredientDetails(sortedDetails);
  }, [data]);

  return (
    <div className="container mx-auto py-4 flex flex-col items-center justify-between"></div>
  );
};

export default ChartComp;
