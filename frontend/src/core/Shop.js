// import React, { useState, useEffect } from "react";
// import Slider from "@material-ui/core/Slider";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import Backdrop from "@material-ui/core/Backdrop";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import { makeStyles } from "@material-ui/core/styles";

// import Layout from "./Layout";
// import Card from "./Card";
// import { getCategories, getFilteredProducts } from "./apiCore";
// import Checkbox from "./Checkbox";

// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: "#fff",
//   },
// }));

// const Shop = () => {
//   const classes = useStyles();
//   const [myFilters, setMyFilters] = useState({
//     filters: { category: [], price: [] },
//   });
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState(false);
//   const [limit, setLimit] = useState(6);
//   const [skip, setSkip] = useState(0);
//   const [size, setSize] = useState(0);
//   const [filteredResults, setFilteredResults] = useState([]);

//   const init = () => {
//     setLoading(true);
//     getCategories().then((data) => {
//       if (data.error) {
//         setError(data.error);
//         setLoading(false);
//       } else {
//         setCategories(data);
//         setLoading(false);
//       }
//     });
//   };

//   const loadFilteredResults = (newFilters) => {
//     setLoading(true);
//     getFilteredProducts(skip, limit, newFilters).then((data) => {
//       if (data.error) {
//         setError(data.error);
//         setLoading(false);
//       } else {
//         setFilteredResults(data.data);
//         setSize(data.size);
//         setSkip(0);
//         setLoading(false);
//       }
//     });
//   };

//   const loadMore = () => {
//     let toSkip = skip + limit;
//     setLoadingMore(true);
//     getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
//       if (data.error) {
//         setError(data.error);
//         setLoadingMore(false);
//       } else {
//         setFilteredResults([...filteredResults, ...data.data]);
//         setSize(data.size);
//         setSkip(toSkip);
//         setLoadingMore(false);
//       }
//     });
//   };

//   const loadMoreButton = () => {
//     return (
//       size > 0 &&
//       size >= limit && (
//         <button onClick={loadMore} className="btn btn-warning">
//           Load more
//         </button>
//       )
//     );
//   };

//   useEffect(() => {
//     init();
//     loadFilteredResults(skip, limit, myFilters.filters);
//   }, []);

//   const handleFilters = (filters, filterBy) => {
//     const newFilters = { ...myFilters };
//     newFilters.filters[filterBy] = filters;

//     loadFilteredResults(myFilters.filters);
//     setMyFilters(newFilters);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   return (
//     <div className="row">
//       <div className="col-4">
//         <h4>Filter by categories</h4>
//         <ul>
//           <Checkbox
//             categories={categories}
//             handleFilters={(filters) => handleFilters(filters, "category")}
//           />
//         </ul>

//         <h4>Filter by price range</h4>
//         <div
//           style={{
//             width: "60%",
//             display: "flex",
//             flex: 1,
//             justifyContent: "space-evenly",
//             alignItems: "space-between",
//             flexDirection: "row",
//           }}
//         >
//           <Select
//             native
//             labelId="demo-controlled-open-select-label"
//             id="demo-controlled-open-select"
//             open={open}
//             onClose={handleClose}
//             onOpen={handleOpen}
//             value={priceRange[0]}
//             onChange={(e) => {
//               const newpriceRange = [e.target.value, priceRange[1]];
//               handleFilters(newpriceRange, "price");
//               setPriceRange(newpriceRange);
//             }}
//           >
//             <option value={10}>10$</option>
//             <option value={20}>20$</option>
//             <option value={50}>50$</option>
//             <option value={100}>100$</option>
//             <option value={200}>200$</option>
//           </Select>
//           <span>&nbsp;to&nbsp;</span>
//           <Select
//             native
//             labelId="demo-controlled-open-select-label"
//             id="demo-controlled-open-select"
//             open={open}
//             onClose={handleClose}
//             onOpen={handleOpen}
//             value={priceRange[1]}
//             onChange={(e) => {
//               const newpriceRange = [priceRange[0], e.target.value];
//               handleFilters(newpriceRange, "price");
//               setPriceRange(newpriceRange);
//             }}
//           >
//             <option value={1000}>1000$</option>
//             <option value={500}>500$</option>
//             <option value={200}>200$</option>
//             <option value={100}>100$</option>
//           </Select>
//         </div>
//         <div style={{ width: "60%" }}>
//           <Slider
//             value={priceRange}
//             onChange={(event, newValue) => {
//               handleFilters(newValue, "price");
//               setPriceRange(newValue);
//             }}
//             valueLabelDisplay="auto"
//             aria-labelledby="range-slider"
//             min={10}
//             max={1000}
//           />
//         </div>
//       </div>

//       <div className="col-8">
//         <h2 className="mb-4">Products</h2>
//         <div className="row">
//           {loading && (
//             <div
//               style={{
//                 display: "flex",
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <CircularProgress />
//             </div>
//           )}
//           {filteredResults.length === 0 && (
//             <div
//               style={{
//                 display: "flex",
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <b>No Results Found...</b>
//             </div>
//           )}
//           {!loading &&
//             filteredResults.map((product, i) => (
//               <div key={i} className="col-4 mb-3">
//                 <Card product={product} />
//               </div>
//             ))}
//         </div>
//         <hr />
//         <div
//           style={{
//             display: "flex",
//             flex: 1,
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           {!loading && loadMoreButton()}
//           {loadingMore && <CircularProgress size={30} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;

import React from "react";
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

const drawerWidth = 240;

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
  },
}));

function Shop(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
}

Shop.propTypes = {
  container: PropTypes.any,
};

export default Shop;
