import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import Grid from "@material-ui/core/Grid";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <>
      <Search />
      <br />
      <h2 style={{ paddingLeft: "2%" }}>New Arrivals</h2>
      <Grid container style={{ padding: "2%" }} spacing={4}>
        {productsByArrival.map((product, i) => (
          <Grid item key={i} style={{ width: 425 }}>
            <Card product={product} />
          </Grid>
        ))}
      </Grid>
      <br />
      <h2 style={{ paddingLeft: "2%" }}>Best Sellers</h2>
      <Grid container style={{ padding: "2%" }} spacing={4}>
        {productsBySell.map((product, i) => (
          <Grid item key={i} style={{ width: 425 }}>
            <Card product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
