import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <>
        {results.length !== 0 ? <br /> : null}
        <h2 style={{ paddingLeft: "3%" }}>
          {searchMessage(searched, results)}
        </h2>
        <Grid container space={4}>
          {results.map((product, i) => (
            <Grid item style={{ width: 425, padding: "2%" }}>
              <Card key={i} product={product} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <Paper component="form" className={classes.root}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category === "" || !category ? "All" : category}
          onChange={handleChange("category")}
        >
          <MenuItem value={"All"}>All</MenuItem>
          {categories.map((c, i) => (
            <MenuItem key={i} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
        <InputBase
          onChange={handleChange("search")}
          placeholder="Search by name"
          className={classes.input}
          inputProps={{ "aria-label": "search by name" }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
      </Paper>
    </form>
  );

  return (
    <>
      {searchForm()}
      {searchedProducts(results)}
    </>
  );
};

export default Search;
