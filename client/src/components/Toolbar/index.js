import React from 'react';
import '../SideDrawer/DrawerToggleButton';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

// Redux and authentication with FB
// import SignedInLinks from '../SignComponents/SignedInLinks';
// import SignedOutLinks from '../SignComponents/SignedOutLinks';
// import { connect } from 'react-redux';
// Redux and authentication with FB


import './style.css';

function toolbar(props) { 

  // const { auth } = props;
  // // console.log(auth);
  // const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
  
  return(
  
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div />
      <div className="toolbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <div className="toolbar__logo">
        <a href="/"><i className="fas fa-home homeIcon"></i> Amazing Pet Grooming <i className="fas fa-paw"></i></a>
      </div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
        <ul>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/gallery">Gallery</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/auth/login">Admin</a>
          </li>
          {/* <li>
            {links}
          </li> */}
        </ul>
      </div>
    </nav>
  </header>
)
}
export default toolbar;

// const mapStateToProps = (state) => {
//   // console.log(state);
//   return {
//     auth: state.firebase.auth
//   }
// }

// export default connect(mapStateToProps)(toolbar)
