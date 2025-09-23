import React from "react";
import { Link } from "react-router-dom";

const RelatedCard = ({ item }) => {
  return (
    <div className="my-5">
      <Link to={"/productDetails/" + item.id}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-green-600 font-medium">${item.price}</p>
      </Link>
    </div>
  );
};

export default RelatedCard;
