import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import CardMUI from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import CheckIcon from "@material-ui/icons/Check";
import WarningIcon from "@material-ui/icons/Warning";

import { API } from "../config";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 220,
  },
});

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
  // changeCartSize
}) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          href={`/product/${product._id}`}
        >
          View Product
        </Button>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button
          style={{ backgroundColor: "#FF5E33" }}
          variant="contained"
          onClick={addToCart}
          color="primary"
        >
          Add To Cart
        </Button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <Chip
        size="small"
        icon={<CheckIcon />}
        label="In Stock"
        color="primary"
      />
    ) : (
      <Chip
        size="small"
        icon={<WarningIcon />}
        label="Out Of Stock"
        color="secondary"
      />
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Button
          style={{ backgroundColor: "red", color: "white" }}
          variant="contained"
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
        >
          Remove Product
        </Button>
      )
    );
  };
  return (
    <>
      <CardMUI className={classes.card}>
        <CardActionArea>
          {shouldRedirect(redirect)}
          <CardHeader
            title={product.name}
            subheader={moment(product.createdAt).fromNow()}
          />
          <CardMedia
            className={classes.media}
            image={`${API}/product/photo/${product._id}`}
            title={product.name}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <p className="card-p  mt-2">
                {product.description.substring(0, 100)}
              </p>
              <p className="card-p black-10">$ {product.price}</p>
              <p className="black-9">
                Category: {product.category && product.category.name}
              </p>
              <p className="black-8">
                Added on {moment(product.createdAt).fromNow()}
              </p>
            </Typography>
            {showStock(product.quantity)}
          </CardContent>
        </CardActionArea>
        <CardActions>
          {showViewButton(showViewProductButton)}

          {showAddToCartBtn(showAddToCartButton)}

          {showRemoveButton(showRemoveProductButton)}
        </CardActions>
        {showCartUpdateOptions(cartUpdate)}
      </CardMUI>
    </>
  );
};

export default Card;
