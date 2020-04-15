import React from "react";
import Grid from "@material-ui/core/Grid";
import CardSkeleton from "./CardSkeleton";

export default function SkeletonRow({ width, padding = "2%" }) {
  return (
    <Grid container style={{ padding }} spacing={4}>
      <Grid item key={1} style={{ width }}>
        <CardSkeleton />
      </Grid>
      <Grid item key={2} style={{ width }}>
        <CardSkeleton />
      </Grid>
      <Grid item key={3} style={{ width }}>
        <CardSkeleton />
      </Grid>
    </Grid>
  );
}
