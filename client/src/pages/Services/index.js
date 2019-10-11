import React, { Component } from 'react';
import './style.css';

export default class Services extends Component {
  render() {
    return (
      <div>
        <h4 className="phoneEverywhere"><i className="fas fa-phone-square" style={{ marginRight: "10px" }}></i> 905 878 9009</h4>
        <div className="container">
          <img alt="logo" src="./images/logo_300.png" className="logoServices" style={{ width: "150px", marginTop: "7px" }}></img>
          <div className="row servicesBox">
            <div className="col-md-12">
              <h1 className="servicesTitle">Our services include:</h1>
              <hr style={{ background: "white" }}></hr>
              <br />
            </div>
            <div className="row pairs">
            <div className="col-md-3">
                <h2 className="servicesTitles">Haircut</h2>
                <p className="servicesParag">Haircuts and Styling are frequently needed, depending on the breed. Our professional dog/cat groomers
                  have extensive experience in all styles and breeds. We will custom design your dog’s haircut according
                  to your taste.</p>
              </div>
              <div className="col-md-3">
                <img className="servicesImg" alt="bath" src="./images/servs_haircut.jpg"></img>
              </div>
              <div className="col-md-3">
                <h2 className="servicesTitles">Drying and Brushing</h2>
                <p className="servicesParag">Drying and brushing is the most important step in grooming your dog. By removing all matted
                and loose fur before the haircut, your dog will come out looking his best.</p>
              </div>
              <div className="col-md-3">
                <img className="servicesImg" alt="bath" src="./images/brushing.jpg"></img>
              </div>
            </div>

            <div className="row pairs">
              <div className="col-md-3">
                <h2 className="servicesTitles">Ear cleaning</h2>
                <p className="servicesParag">Dog’s ears are very sensitive and susceptible to infection, excessive wax buildup and parasites.
                  A gentle cleaning with proper products will eliminate most problems. Removing the fur by plucking
                  will maintain the ears in a healthy condition.</p>
              </div>
              <div className="col-md-3">
                <img className="servicesImg" alt="bath" src="./images/servs_plucking.jpg"></img>
              </div>
              <div className="col-md-3">
                <h2>Bathing</h2>
                <p className="servicesParag">We bathe your dog with mild shampoos that are safe to use with Front-line and Advantage
                  and other spot–on products. We express the anal gland before bathing. Regular bathing keeps
                your dog’s skin healthy, and his coat clean and shiny.</p>
              </div>
              <div className="col-md-3">
                <img className="servicesImg" alt="bath" src="./images/servs_bathing.jpg"></img>
              </div>
            </div>

            <div className="row pairs">
              <div className="col-md-3">
                <h2 className="servicesTitles">Nail Trimming</h2>
                <p className="servicesParag">Dogs and Cats need to have their nails trimmed every 4-6 weeks in order to maintain their quick nice
                  and short.</p>
              </div>
              <div className="col-md-3">
                <img className="servicesImg" alt="bath" src="./images/nails.jpg"></img>
              </div>
              <div className="col-md-3">
                <h2 className="servicesTitles">Tooth Brushing</h2>
                <p className="servicesParag">Tooth Brushing on a regular basis will reduce tartar and help prevent periodontal disease.</p>
              </div>
              <div className="col-md-3">
                <img className="servicesImg" alt="bath" src="./images/servs_tbrush.jpg"></img>
              </div>
            </div>

            <div className="row pairs">
              <div className="col-md-3">
                <h2 className="servicesTitles">Spa Service</h2>
                <p className="servicesParag">Amazing Pet Grooming has packages to suit different needs and budgets. From basic Bath and Brush
                  to the ultimate Full Service Groom, Amazing Pet Grooming provides options for your pet. Take your
                  pets to the professionals, after all… they deserve it.</p>
              </div>
              <div className="col-md-3">
                <img className="servicesImg" alt="bath" src="./images/servs_spa.jpg"></img>
              </div>
              <div className="col-md-3">
                <h2 className="servicesTitles">De-tangle</h2>
                <p className="servicesParag">De-Tangling services can be provided when coat has been maintained properly by brushing it out regularly.</p>
              </div>
              <div className="col-md-3">
                <img className="servicesImg" alt="bath" src="./images/servs_detangle.jpg"></img>
              </div>
            </div>

            <div className="row pairs">
              <div className="col-md-3">
                <h2 className="servicesTitles">Cat Services</h2>
                <p className="servicesParag">Only the most experienced groomers will be able to handle these precious felines. From the basic nail trim
                  to the premium package that includes a bath and a haircut, cat services are offered at our Milton Location
              </p>
              </div>
              <div className="col-md-8">
                <img alt="bath" src="./images/cat1BeforeandAfter.jpg" className="catPhotoServices"></img>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}