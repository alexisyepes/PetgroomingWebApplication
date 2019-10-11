import React, { Component } from 'react';
import './style.css';

export default class index extends Component {
  render() {
    return (
      <div>
        <h4 className="phoneEverywhere"><i className="fas fa-phone-square" style={{ marginRight: "10px" }}></i> 905 878 9009</h4>
        <img className="lunaAboutUs" alt="lunaAboutUs" src="./images/aboutus.jpg"></img>
        <div className="container aboutContainer">
          <div className="row">
            <div className="col-md-12">
              <h1 className="aboutTitles">About Us</h1>
              <hr style={{ background: "white" }}></hr>
            </div>
            <div className="col-md-12">
              <p className="pagagAbout">
                With over 20 years of experience, you can be sure your dogs and cats are in good hands.
                Our open concept allows you to watch your dog and/or cat being pampered. Our environment
                provides your pets with a unique experience. Stress from other pet groomers goes away.
                Pets are just as happy coming in as they are going home.
              </p>
            </div>
            <div className="col-md-12">
              <hr style={{ background: "white" }}></hr>
              <h1 className="aboutTitles">Meet the Team</h1>
            </div>
            <div className="row paolaBox">
              <div className="col-md-5 ">
                <h1 style={{ textAlign: "center", paddingTop: "20px" }}>Paola</h1>
                <img alt="Paola" src="./images/paola.JPG" className="paola"></img>
              </div>
              <div className="col-md-5 paolaText">
                <p className="paolaParag">Paola, (or "The Cat Whisperer", as some people call her) has been in the pet grooming industry for over 20 years.
                  Graduated from the Nash Pet Grooming Academy in Kentucky, she has dedicated most of her life to work with
                  dogs and cats. She's passionate about nature and animal care. Her vast experience with all kind of dogs and cats is
                  something we have the privilege to share with our customers.
              </p>
              </div>

            </div>
            <div style={{ marginTop: "30px" }} className="row claudiaBox">
              <div className="col-md-5 ">
                <h1 style={{ textAlign: "center", paddingTop: "20px" }}>Claudia</h1>
                <img alt="claudia" src="./images/claudia.jpg" className="claudia"></img>
              </div>
              <div className="col-md-5 claudiaText">
                <p className="claudiaParag">With over 15 years in the animal care field, Claudia has always been passionate about dogs. She strives to make the grooming experience as stress-free as possible.
                She believes it is a must to have a great deal of patience and trust, as well as the ability
                to read the dogs' body language.
              </p>
              </div>
            </div>

            <div style={{ marginTop: "30px" }} className="row claudiaBox">
              <div className="col-md-5 ">
                <h1 style={{ textAlign: "center", paddingTop: "20px" }}>Diana</h1>
                <img alt="diana" src="./images/diana.jpg" className="claudia"></img>
              </div>
              <div className="col-md-5 claudiaText">
                <p className="claudiaParag">Diana has been working around animals for over 20 years. She holds a Veterinarian
                diploma from a Colombian University. Clients have told her that she has a special ability for working with dogs
                that other groomers turn away. She takes great pride in her work and is very much a Quality over Quantity type
                of groomer.  She keeps up to date on the latest grooming trends, equipment, and products by attending trade shows
                and seminars.
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
