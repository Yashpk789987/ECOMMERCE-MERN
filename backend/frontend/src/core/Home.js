import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import SkeletonRow from "./SkeletonRow";
import Grid from "@material-ui/core/Grid";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    setLoading(true);
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setProductsBySell(data);
        setLoading(false);
      }
    });
  };

  const loadProductsByArrival = () => {
    setLoading(true);
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setProductsByArrival(data);
        setLoading(false);
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
      {loading ? (
        <SkeletonRow width={425} />
      ) : (
        <Grid container style={{ padding: "2%" }} spacing={4}>
          {productsByArrival.map((product, i) => (
            <Grid item key={i} style={{ width: 425 }}>
              <Card product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      <br />
      <h2 style={{ paddingLeft: "2%" }}>Best Sellers</h2>
      {loading ? (
        <SkeletonRow width={425} />
      ) : (
        <Grid container style={{ padding: "2%" }} spacing={4}>
          {productsBySell.map((product, i) => (
            <Grid item key={i} style={{ width: 425 }}>
              <Card product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Home;
