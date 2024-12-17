import React from "react";
import "./HomeCaresole.css";
import "../Header/header.css";
import Search from "../../Assests/search-interface-symbol.svg";
import Banner1 from "../../Assests/BannerImage1.png";
import Banner2 from "../../Assests/Banner Image 2.png";
import Banner3 from "../../Assests/Banner Image 3.png";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";

function Mycaresoul(props) {
  return (
    <MDBCarouselItem itemId={props.item}>
      <img src={props.banner} className="d-block w-100 banner" alt="..." />

      <div className="search">
        <h2 className="semibold">Unlocking Insights, Empowering Choices</h2>
        <p className="font-2 opct-2">
          Your Trusted Source for Business Reviews
        </p>
        <div className="col-12 col-lg-8 search-input ">
          <input
            style={{ width: "50%", zIndex: "128", marginRight: "-5px" }}
            type="text"
            placeholder="What?"
            // className=" col-md-6 col-sm-6"
          />
          <div className="search-input where" style={{ width: "50%" }}>
            <input
              style={{ width: "80%", borderRadius: "0px 0px 0px 0px" }}
              type="text"
              placeholder="Where?"
              className=" "
            />
            <button className="" style={{ width: "20%", height: "47px" }}>
              <img src={Search} alt="..." />
            </button>
          </div>
        </div>
        <p className="font-2 opct-2">
          By using this website, you are agreeing to our terms and conditions
        </p>
      </div>
    </MDBCarouselItem>
  );
}

export default function HomeCaresole() {
  return (
    <div className="caresoulOuter">
      <MDBCarousel showIndicators showControls fade>
        <Mycaresoul item={1} banner={Banner1} />
        {/* <Mycaresoul item={2} banner={Banner2} />
        <Mycaresoul item={3} banner={Banner3} /> */}
        {/* <Mycaresoul item={2} />
        <Mycaresoul item={3} /> */}
        {/* <MDBCarouselItem itemId={2}>
        <img src={Banner2} className="d-block w-100" alt="..." />
        <div className="search">
          <h2 className="semibold">Unlocking Insights, Empowering Choices</h2>
          <p className="font-2 opct-2">
            Your Trusted Source for Business Reviews
          </p>
          <div className="search-input">
            <input type="text" placeholder="What?" />
            <input type="text" placeholder="Where?" style={inputStyle} />
            <button>
              <img src={Search} alt="..." />
            </button>
          </div>
          <p className="font-2 opct-2">
            By using this website, you are agreeing to our terms and conditions
          </p>
        </div>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={3}>
        <img src={Banner3} className="d-block w-100" alt="..." />
        <div className="search">
          <h2 className="semibold">Unlocking Insights, Empowering Choices</h2>
          <p className="font-2 opct-2">
            Your Trusted Source for Business Reviews
          </p>
          <div className="search-input">
            <input type="text" placeholder="What?" />
            <input type="text" placeholder="Where?" style={inputStyle} />
            <button>
              <img src={Search} alt="..." />
            </button>
          </div>
          <p className="font-2 opct-2">
            By using this website, you are agreeing to our terms and conditions
          </p>
        </div>
      </MDBCarouselItem> */}
      </MDBCarousel>
    </div>
  );
}
