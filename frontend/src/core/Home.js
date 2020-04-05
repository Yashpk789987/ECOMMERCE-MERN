// import React, { useState, useEffect } from 'react';
// import Layout from './Layout';
// import { getProducts } from './apiCore';
// import Card from './Card';
// import Search from './Search';

// const Home = () => {
//     const [productsBySell, setProductsBySell] = useState([]);
//     const [productsByArrival, setProductsByArrival] = useState([]);
//     const [error, setError] = useState(false);

//     const loadProductsBySell = () => {
//         getProducts('sold').then(data => {
//             if (data.error) {
//                 setError(data.error);
//             } else {
//                 setProductsBySell(data);
//             }
//         });
//     };

//     const loadProductsByArrival = () => {
//         getProducts('createdAt').then(data => {
//             console.log(data);
//             if (data.error) {
//                 setError(data.error);
//             } else {
//                 setProductsByArrival(data);
//             }
//         });
//     };

//     useEffect(() => {
//         loadProductsByArrival();
//         loadProductsBySell();
//     }, []);

//     return (
//         <Layout
//             title="FullStack React Node MongoDB Ecommerce App"
//             description="Node React E-commerce App"
//             className="container-fluid"
//         >
//             <Search />
//             <h2 className="mb-4">New Arrivals</h2>
//             <div className="row">
//                 {productsByArrival.map((product, i) => (
//                     <div key={i} className="col-4 mb-3">
//                         <Card product={product} />
//                     </div>
//                 ))}
//             </div>

//             <h2 className="mb-4">Best Sellers</h2>
//             <div className="row">
//                 {productsBySell.map((product, i) => (
//                     <div key={i} className="col-4 mb-3">
//                         <Card product={product} />
//                     </div>
//                 ))}
//             </div>
//         </Layout>
//     );
// };

// export default Home;
import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons() {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        Send
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
      <Button
        variant="contained"
        disabled
        color="secondary"
        className={classes.button}
        startIcon={<KeyboardVoiceIcon />}
      >
        Talk
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </div>
  );
}
