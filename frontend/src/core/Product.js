import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { SideBySideMagnifier } from "react-image-magnifiers";

import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import SkeletonRow from "./SkeletonRow";

import { read, listRelated } from "./apiCore";

import { API } from "../config";

const Product = (props) => {
  const [productLoading, setProductLoading] = useState(false);
  const [relatedProductLoading, setRelatedProductLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    setRelatedProductLoading(true);
    setProductLoading(true);
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
        setProductLoading(false);
      } else {
        setProduct(data);
        setProductLoading(false);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
            setRelatedProductLoading(false);
          } else {
            setRelatedProduct(data);
            setRelatedProductLoading(false);
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
        <center>
          <h4>Product Description</h4>
        </center>
        {productLoading && <CardSkeleton />}
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
        <center>
          <h4>Related products</h4>
        </center>

        <div style={{ overflowY: "auto", height: 800 }}>
          {relatedProductLoading && <SkeletonRow width={350} />}
          <Grid container space={4}>
            {relatedProduct.map((p, i) => (
              <Grid item key={i} style={{ padding: "2%", width: 350 }}>
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
