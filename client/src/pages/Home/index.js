import React, { Component } from 'react';
import CarouselPage from '../../components/CarouselPage';
import './style.css';

export default class Home extends Component {
    render() {
        return (
            <div>
                {/* <h4 className="phoneEverywhere"><i className="fas fa-phone-square" style={{ marginRight: "10px" }}></i> 905 878 9009</h4> */}
                <div className="logoAndPhoneHome">
                    <h4 className="phoneTabletSize"><i className="fas fa-phone-square" style={{ marginRight: "10px" }}></i> 905 878 9009</h4>
                    <img alt="logo" src="./images/logo_300.png" className="logoHome"></img>
                </div>
                <CarouselPage />
                <br></br>
                <div className="container homeBox">
                    <h1 className="titleHome"><i className="fas fa-paw pawHome"></i>
                        See what our customers are saying about us...<i className="fas fa-paw pawHome"></i>
                    </h1>

                    <div className="row">
                        <div className="col-md-12">
                            <a href="https://www.google.com/maps/place/Amazing+Pet+Grooming/@43.5239754,-79.8731451,17z/data=!3m1!4b1!4m5!3m4!1s0x882b6f0649aa7edb:0xa1616d6c9e9e1545!8m2!3d43.5239754!4d-79.8709564?hl=en-CA" target="blank">
                                <img className="googleRev" alt="googleRev1" src="./images/googleRev1.PNG"></img>
                                <img className="googleRev" alt="googleRev2" src="./images/googleRev2.PNG"></img>
                                <img className="googleRev" alt="googleRev3" src="./images/googleRev3.PNG"></img>
                                <img className="googleRev" alt="googleRev4" src="./images/googleRev4.PNG"></img>

                                <h3 className="mobileTitle">Google Reviews</h3>
                                <img alt="googleRev Mobile1" src="./images/mobileReview1.jpg" className="mobile1"></img>
                                <img alt="googleRev Mobile2" src="./images/mobileReview2.jpg" className="mobile1"></img>
                                <img alt="googleRev Mobile3" src="./images/mobileReview3.jpg" className="mobile1"></img>
                                <img alt="googleRev Mobile4" src="./images/mobileReview4.jpg" className="mobile1"></img>
                                <img alt="googleRev Mobile5" src="./images/mobileReview5.jpg" className="mobile1"></img>
                                <img alt="googleRev Mobile6" src="./images/mobileReview6.jpg" className="mobile1"></img>
                                <h6 className="mobileTitle">Click here for more...</h6>

                            </a>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}