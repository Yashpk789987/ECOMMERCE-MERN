import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMUI from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 220,
  },
});

const CardSkeleton = () => {
  const classes = useStyles();
  return (
    <>
      <CardMUI className={classes.card}>
        <CardHeader
          title={
            <Skeleton
              animation="wave"
              height={20}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={15} width="40%" />}
        />
        <Skeleton animation="wave" variant="rect" className={classes.media} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <Skeleton
              animation="wave"
              height={15}
              width="60%"
              style={{ marginBottom: 3 }}
            />
            <Skeleton
              animation="wave"
              height={15}
              width="60%"
              style={{ marginBottom: 3 }}
            />
            <Skeleton
              animation="wave"
              height={15}
              width="60%"
              style={{ marginBottom: 3 }}
            />
          </Typography>
        </CardContent>
      </CardMUI>
    </>
  );
};

export default CardSkeleton;
