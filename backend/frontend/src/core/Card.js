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
import TextField from "@material-ui/core/TextField";
import RemoveIcon from "@material-ui/icons/Remove";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { IconButton } from "@material-ui/core";

import { SideBySideMagnifier } from "react-image-magnifiers";
import { API } from "../config";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const zoom = {
  width: 400,
  height: 250,
  zoomWidth: 500,
  img: "https://wallpapercave.com/wp/k5kfZYR.jpg",
};

const useStyles = makeStyles({
  card: {
    maxWidth: 600,
  },
  media: {
    height: 220,
  },
});

const Card = ({
  product,
  mediaHeight = 220,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
  children,
  // changeCartSize
}) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton, cartUpdate) => {
    return (
      showViewProductButton &&
      !cartUpdate && (
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

  const handleChange = (productId, value) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(value < 1 || value > 9 ? 1 : value);
    if (value >= 1 && value <= 9) {
      updateItem(productId, value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div
            style={{
              display: "flex",
              flex: 1,
              width: 225,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <IconButton
              disabled={parseInt(count) === 1}
              onClick={() => handleChange(product._id, parseInt(count) - 1)}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              style={{ width: 100, WebkitAppearance: "none", margin: 0 }}
              id="filled-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={count}
              onChange={(e) => handleChange(product._id, e.target.value)}
              variant="outlined"
            />
            <IconButton
              disabled={parseInt(count) === 9}
              onClick={() => handleChange(product._id, parseInt(count) + 1)}
            >
              <AddCircleOutlineRoundedIcon />
            </IconButton>
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
          Remove
        </Button>
      )
    );
  };

  if (children) {
    return (
      <>
        <>
          <CardActionArea>
            {shouldRedirect(redirect)}
            <CardHeader
              title={product.name}
              subheader={moment(product.createdAt).fromNow()}
            />

            {children}
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
            {showCartUpdateOptions(cartUpdate)}
            {showViewButton(showViewProductButton, cartUpdate)}

            {showAddToCartBtn(showAddToCartButton)}

            {showRemoveButton(showRemoveProductButton)}
          </CardActions>
        </>
      </>
    );
  }
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
            style={{ height: mediaHeight }}
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
          {showCartUpdateOptions(cartUpdate)}

          {showViewButton(showViewProductButton, cartUpdate)}

          {showAddToCartBtn(showAddToCartButton)}

          {showRemoveButton(showRemoveProductButton)}
        </CardActions>
      </CardMUI>
    </>
  );
};

export default Card;
