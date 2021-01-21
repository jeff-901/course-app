/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
// import sha256 from "../../Mysha256.js";
import Container from "@material-ui/core/Container";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Login(props) {
  const {
    handleSignIn,
    setId,
    correct,
    setCorrect,
    password,
    setPassword,
    setSignup,
  } = props;

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          <LockIcon fontSize="large" />
          SIGN IN
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id"
            label="學號"
            name="id"
            autoComplete="id"
            autoFocus
            onInput={(e) => setId(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            error={!correct}
            fullWidth
            name="password"
            label="密碼"
            type="password"
            id="password"
            autoComplete="current-password"
            onInput={(e) => setPassword(e.target.value)}
            value={password}
            helperText={correct ? "" : "Incorrect Id or password"}
            onClick={() => setCorrect(true)}
          />
          <Button
            className={classes.submitBtn}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Link
            href="#"
            variant="body2"
            onClick={() => {
              setSignup(true);
            }}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </div>
    </Container>
  );
}

export default Login;
