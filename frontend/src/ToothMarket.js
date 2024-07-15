import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ToothMarket = () => {
  useEffect(() => {
    // simplified fetch request
    fetch("/api/toothmarket_location", {
      method: "POST",
      body: JSON.stringify({ device_location: "Berlin" }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch(console.error);
  }
  , []);


  return (
    <div>
      <h1>Tooth Market</h1>
      <p>
        Welcome to the Secret Tooth Market! Every second thursday of the month, we
        open our doors to the public to sell our surplus teeth. We have a wide
        selection of teeth available, from baby teeth to wisdom teeth. All of our
        teeth are sourced from local donors and are cleaned and sterilized before
        being sold. Whether you're looking for a replacement tooth or just want to
        add to your collection, the Secret Tooth Market has something for everyone.
      </p>
    </div>
  );
};

export default ToothMarket;
