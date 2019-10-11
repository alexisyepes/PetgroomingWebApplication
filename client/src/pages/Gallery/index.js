import React, { Component } from 'react';
// import { Carousel } from "react-responsive-carousel";
import './style.css';

export default class Gallery extends Component {
  render() {
    return (
      <div>
        <h4 className="phoneEverywhere"><i className="fas fa-phone-square" style={{ marginRight: "10px" }}></i> 905 878 9009</h4>
        <div className="container galleryBox">
          <div className="row">
            <div className="col-md-6">
              <h1>Before</h1>
              <img alt="dog before 1" src="./images/dogBefore1.jpg" className="galleryImages"></img>
            </div>
            <div className="col-md-6">
              <h1 className="galleryTitles">After</h1>
              <img alt="dog before 1" src="./images/dogAfter1.jpg" className="galleryImages"></img>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h1 className="galleryTitles">Before</h1>
              <img alt="dog before 2" src="./images/dogBefore2.jpg" className="galleryImages"></img>
            </div>
            <div className="col-md-6">
              <h1 className="galleryTitles">After</h1>
              <img alt="dog before 2" src="./images/dogAfter2.png" className="galleryImages"></img>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h1 className="galleryTitles">Before</h1>
              <img alt="dog before 3" src="./images/dogBefore3.jpg" className="galleryImages"></img>
            </div>
            <div className="col-md-6">
              <h1>After</h1>
              <img alt="dog before 2" src="./images/dogAfter3.jpg" className="galleryImages"></img>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h1 className="galleryTitles">Before</h1>
              <img alt="cat before 1" src="./images/catBefore1.jpg" className="galleryImages"></img>
            </div>
            <div className="col-md-6">
              <h1 className="galleryTitles">After</h1>
              <img alt="cat before 1" src="./images/catAfter1.jpg" className="galleryImages"></img>
            </div>
          </div>
        </div>
      </div>
    )
  }
}