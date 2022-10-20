import React from "react";
import { MDBNavbar, MDBContainer } from "mdbreact";
import "./Header.css";

function Header(props) {
  const renderUsername = () => {
    const { username, handleSignOut } = props;
    if (username) {
      return (
        <>
          <div>{`Hello ${username}!`}</div>
          <div>
            <a
              href="/#"
              onClick={() => {
                handleSignOut();
              }}
              style={{ color: "red" }}
            >
              Sign Out
            </a>
          </div>
        </>
      );
    }
  };

  return (
    <MDBNavbar
      className="header-main"
      expand="lg"
      light
      color="white"
      fixed="top"
    >
      <MDBContainer className="p-2" fluid>
        <div>Minote</div>
        {renderUsername()}
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;
