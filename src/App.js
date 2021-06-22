import logo from './logo.svg';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import Web3 from 'web3';
import { Alert } from './abi/abi-alert';
import './App.css';
import { makeStyles, Container, Grid, TextField, Button} from '@material-ui/core';
import Title from "./components/Title"
import { flexbox } from '@material-ui/system';

const web3 = new Web3(Web3.givenProvider);
const contractAdress = "0x5b060E84B1F3C554f432879AfcA2dEBf269fdB28";
const alertContract = new web3.eth.Contract(Alert, contractAdress);

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "200px 0",
  },
  alertForm: {
    display: 'flex',
    flexDirection: 'column',
    borderColor: theme.palette.primary.main,
    border: '2px',
  },
  textInput: {
    marginBottom: '1rem',
  },
  formButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    marginBottom: '2rem',
  },
  readBox: {
    border: '2px solid #000',
    borderColor: theme.palette.primary.main,
    borderRadius: "10px",
  },
  readButton: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.primary,
  }

}))

function App() {
  const classes = useStyles();
  const [alert, setAlert] = useState({ id: 0, claim: "Claim not set yet" });
  const [blockchainClaim, setBlockchainClaim] = useState("Claim no set yet");

  const createAlert = async (t) => {
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await alertContract.methods.create(alert.id, alert.claim).estimateGas();
    const post = await alertContract.methods.create(alert.id, alert.claim).send({
      from: account,
      gas,
    });
  };
  
  const updateClaim = async (t) => {
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await alertContract.methods.updateClaim(alert.claim).estimateGas();
    const post = await alertContract.methods.updateClaim(alert.claim).send({
      from: account,
      gas: gas,
    })
  };

  const getAlertClaim = async (t) => {
    t.preventDefault();
    const post = await alertContract.methods.getClaim().call();
    setBlockchainClaim(post);
  };
 
  return (  
    <Container maxWidth="lg" className={classes.container}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item lg={4}></Grid>
        <Grid item xs={12} lg={4}>
          <form className={classes.alertForm} noValidate autoComplete="off">
            <TextField 
              id="claim-input" 
              className={classes.textInput}
              label="Claim" 
              variant="outlined" 
              onChange={(t) => setAlert({
                id: uuidv4(),
                claim: t.target.value
              })} 
            />
            <Button className={classes.formButton} color="primary" onClick={createAlert}>Create alert</Button>
            <Button className={classes.formButton} color="primary" onClick={updateClaim}>Update claim</Button>
          </form>
        </Grid>
        <Grid item lg={4}></Grid>
        <Grid item lg={4}></Grid>
        <Grid item xs={12} lg={4} className={classes.readBox}>
          <Button className={classes.readButton} color="primary" onClick={getAlertClaim}>
            Read alert from the blockchain
          </Button>
          <Title>{blockchainClaim}</Title>
          <p>The claim id is {alert.id}</p>
        </Grid>
        <Grid item lg={4}></Grid>
      </Grid>     
    </Container>
  );
}

export default App;
