import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { SideBySideMagnifier } from "react-image-magnifiers";

import Card from "./Card";

import { read, listRelated } from "./apiCore";

import { API } from "../config";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Grid container>
      <Grid
        item
        style={{
          paddingTop: "1%",
          paddingLeft: "2%",
          paddingRight: "2%",
          width: 500,
        }}
      >
        <h4>Product Description</h4>
        {product && product.description && (
          <>
            <Card
              product={product}
              mediaHeight={400}
              showViewProductButton={false}
            >
              <SideBySideMagnifier
                fillAvailableSpace={true}
                // {`${API}/product/photo/${product._id}`}
                largeImageSrc={"https://wallpapercave.com/wp/k5kfZYR.jpg"}
                imageSrc="https://wallpapercave.com/wp/k5kfZYR.jpg"
              />
            </Card>
          </>
        )}
      </Grid>

      <Grid
        item
        style={{
          paddingTop: "1%",
          width: 800,
        }}
      >
        <h4 style={{ paddingLeft: "3%" }}>Related products</h4>
        <div style={{ overflowY: "auto", position: "relative", height: 800 }}>
          <Grid container space={4}>
            {relatedProduct.map((p, i) => (
              <Grid item key={i} style={{ padding: "4%", width: 350 }}>
                <Card product={p} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default Product;
