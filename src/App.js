import logo from "./logo.svg";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const GET_BIKES = gql`
  query($bikeId: String) {
    bikes(bike_id: $bikeId) {
      bike_id
      vehicle_type
      is_reserved
      is_disabled
    }
  }
`;

function App() {
  const classes = useStyles();

  const [bike_id, setBikeId] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_BIKES, {
    variables: { bikeId: bike_id },
  });

  useEffect(() => {
    console.log("Data", data?.bikes);
  }, [data]);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item style={{ paddingTop: "4rem" }} spacing={5}>
        <TextField
          id="outlined-search"
          label="Bike Id"
          type="search"
          variant="outlined"
          onChange={(event) => {
            setBikeId(event.target.value);
          }}
        />
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Bike Id</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Is Reserved</TableCell>
                <TableCell align="right">Is Disabled</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.bikes.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="right">{row.bike_id}</TableCell>
                  <TableCell align="right">{row.vehicle_type}</TableCell>
                  <TableCell align="right">{row.is_reserved}</TableCell>
                  <TableCell align="right">{row.is_disabled}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default App;
