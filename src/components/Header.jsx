import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const { productId } = useParams();
  return (
    <AppBar position="static">
      <Toolbar>
        {productId ? (
          <Button component={Link} color="inherit" to="/">
            Назад до списку товарів
          </Button>
        ) : (
          ""
        )}
        <Button
          color="inherit"
          onClick={() => logout()}
          sx={{ marginLeft: "auto" }}
        >
          Вихід
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
