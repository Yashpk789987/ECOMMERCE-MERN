import React, { useState, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Shop = () => {
  const classes = useStyles();
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    setLoading(true);
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setCategories(data);
        setLoading(false);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    setLoading(true);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
        setLoading(false);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    setLoadingMore(true);
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoadingMore(false);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
        setLoadingMore(false);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="row">
      <div className="col-4">
        <h4>Filter by categories</h4>
        <ul>
          <Checkbox
            categories={categories}
            handleFilters={(filters) => handleFilters(filters, "category")}
          />
        </ul>

        <h4>Filter by price range</h4>
        <div
          style={{
            width: "60%",
            display: "flex",
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "space-between",
            flexDirection: "row",
          }}
        >
          <Select
            native
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={priceRange[0]}
            onChange={(e) => {
              const newpriceRange = [e.target.value, priceRange[1]];
              handleFilters(newpriceRange, "price");
              setPriceRange(newpriceRange);
            }}
          >
            <option value={10}>10$</option>
            <option value={20}>20$</option>
            <option value={50}>50$</option>
            <option value={100}>100$</option>
            <option value={200}>200$</option>
          </Select>
          <span>&nbsp;to&nbsp;</span>
          <Select
            native
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={priceRange[1]}
            onChange={(e) => {
              const newpriceRange = [priceRange[0], e.target.value];
              handleFilters(newpriceRange, "price");
              setPriceRange(newpriceRange);
            }}
          >
            <option value={1000}>1000$</option>
            <option value={500}>500$</option>
            <option value={200}>200$</option>
            <option value={100}>100$</option>
          </Select>
        </div>
        <div style={{ width: "60%" }}>
          <Slider
            value={priceRange}
            onChange={(event, newValue) => {
              handleFilters(newValue, "price");
              setPriceRange(newValue);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={10}
            max={1000}
          />
        </div>
      </div>

      <div className="col-8">
        <h2 className="mb-4">Products</h2>
        <div className="row">
          {loading && (
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}
          {filteredResults.length === 0 && (
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <b>No Results Found...</b>
            </div>
          )}
          {!loading &&
            filteredResults.map((product, i) => (
              <div key={i} className="col-4 mb-3">
                <Card product={product} />
              </div>
            ))}
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {!loading && loadMoreButton()}
          {loadingMore && <CircularProgress size={30} />}
        </div>
      </div>
    </div>
  );
};

export default Shop;
