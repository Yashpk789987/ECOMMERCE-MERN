import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        <Grid container>
          {items.map((product, i) => (
            <Grid item style={{ width: 365, padding: "3%" }}>
              <Card
                key={i}
                product={product}
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
                setRun={setRun}
                run={run}
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <Grid container>
      <Grid
        item
        style={{
          paddingTop: "1%",
          width: 800,
        }}
      >
        {items.length > 0 ? showItems(items) : noItemsMessage()}
      </Grid>

      <Grid
        item
        style={{
          paddingTop: "1%",
          paddingLeft: "2%",
          paddingRight: "2%",
          width: 500,
        }}
      >
        <h2>Your cart summary</h2>
        <hr />
        <Checkout products={items} setRun={setRun} run={run} />
      </Grid>
    </Grid>
  );
};

export default Cart;
