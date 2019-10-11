import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";

const CarouselPage = () => {
  return (
    <MDBContainer>
      <MDBCarousel
      activeItem={1}
      length={4}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
    >
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img
              className="d-block w-100"
              src="./images/local4.jpg"
              alt="First slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
            {/* <div style={{ background:"rgba(0,0,0,0.5)", padding: "15px" }}>
            <h3 className="h3-responsive" >Open Concept</h3>
            <h4>Clean and safe environment</h4>
            </div> */}
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
            <img
              className="d-block w-100"
              src="./images/local2.jpg"
              alt="Second slide"
            />
          <MDBMask overlay="black-strong" />
          </MDBView>
          <MDBCarouselCaption>
          {/* <div style={{ background:"rgba(0,0,0,0.5)", padding: "15px" }}>
            <h3 className="h3-responsive" >Open Concept</h3>
            <h4>Clean and safe environment</h4>
            </div> */}
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
            <img
              className="d-block w-100"
              src="./images/local3.jpg"
              alt="Third slide"
            />
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
          {/* <div style={{ background:"rgba(0,0,0,0.5)", padding: "15px" }}>
            <h3 className="h3-responsive" >Open Concept</h3>
            <h4>Clean and safe environment</h4>
            </div> */}
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="4">
          <MDBView>
            <img
              className="d-block w-100"
              src="./images/local1.jpg"
              alt="First slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
           {/* <div style={{ background:"rgba(0,0,0,0.5)", padding: "15px" }}>
            <h3 className="h3-responsive" >Open Concept</h3>
            <h4>Clean and safe environment</h4>
            </div> */}
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
  );
}

export default CarouselPage;