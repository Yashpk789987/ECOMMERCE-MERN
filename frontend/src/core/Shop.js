import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Card from "./Card";
import SkeletonRow from "./SkeletonRow";
import Checkbox from "./Checkbox";

import { getCategories, getFilteredProducts } from "./apiCore";

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    marginTop: 50,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      marginTop: 50,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingLeft: 1,
  },
}));

function Shop(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
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
    getCategories().then(async (data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        await setCategories(data);
        setLoading(false);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    setLoading(true);
    getFilteredProducts(skip, limit, newFilters).then(async (data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        await setFilteredResults(data.data);
        await setSize(data.size);
        await setSkip(0);
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
        <Button variant="contained" color="primary" onClick={loadMore}>
          Load more
        </Button>
      )
    );
  };

  useEffect(() => {
    async function foo() {
      await init();
      loadFilteredResults(skip, limit, myFilters.filters);
    }
    foo();
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div>
        <center style={{ marginTop: "5%", width: "90%" }}>
          <h4>Apply filters</h4>
        </center>
      </div>
      <Divider />

      <center style={{ marginTop: "5%", width: "90%" }}>
        <h4>filter by category</h4>
      </center>
      <ul>
        <Checkbox
          categories={categories}
          handleFilters={(filters) => handleFilters(filters, "category")}
        />
      </ul>

      <Divider />
      <center style={{ marginTop: "5%", width: "90%" }}>
        <h4>filter by price</h4>
      </center>
      <div
        style={{
          paddingTop: "5%",
          width: "90%",
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
      <div style={{ width: "90%", padding: "8%" }}>
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
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Hidden smUp implementation="css">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <FilterListIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Apply Filters
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <br />
      <main className={classes.content}>
        <div style={{ paddingTop: "5%" }}>
          <Grid container spacing={4}>
            {loading && <SkeletonRow width={342} />}
            {!loading && filteredResults.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "5%",
                  paddingBottom: "5%",
                }}
              >
                <b>No Results Found...</b>
              </div>
            )}
            {!loading &&
              filteredResults.map((product, i) => (
                <Grid item key={i} style={{ width: 345 }}>
                  <Card product={product} />
                </Grid>
              ))}
          </Grid>
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
          <br />
          {loadingMore && <SkeletonRow padding="0%" width={345} />}
        </div>
      </main>
    </div>
  );
}

Shop.propTypes = {
  container: PropTypes.any,
};

export default Shop;
