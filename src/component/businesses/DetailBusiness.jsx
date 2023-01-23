/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

function DetailBusiness() {
  const params = useParams();
  const [detail, setDetail] = useState("");
  const [listDetail, setListDetail] = useState([]);
  //   console.log(params.id);

  useEffect(() => {
    fetchDetailBusiness();
    fetchListReviewBusiness();
  }, []);

  const fetchDetailBusiness = async () => {
    const apiKey = `Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx`;
    let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${params.id}`;
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const { data } = await axios.get(`${queryURL}`, config);

    setDetail(data);
    // console.log(data);
  };

  const settings = {
    centerPadding: "60px",
    className: "center",
    centerMode: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    margin: "10px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchListReviewBusiness = async () => {
    const apiKey = `Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx`;
    let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${params.id}/reviews?limit=20&sort_by=yelp_sort`;
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const { data } = await axios.get(`${queryURL}`, config);

    setListDetail(data?.reviews);
    // console.log(listDetail);
  };
  return (
    <Fragment>
      <div className="container" style={{ padding: "20px" }}>
        <div className="card" style={{ marginTop: "80px" }}>
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <div>Detail</div>
              <div>
                <Link to="/" className="btn btn-danger btn-sm">
                  Back
                </Link>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div
              className="mb-3 abch"
              style={{ maxWidth: "445px", margin: "auto" }}
            >
              <h2 className="text-center">Image</h2>
              <Slider {...settings}>
                {detail?.photos?.map((row, key) => {
                  return (
                    <Fragment key={key}>
                      <div>
                        <img
                          width="300px"
                          height="150px"
                          src={`${row}`}
                          alt="a"
                        />
                      </div>
                    </Fragment>
                  );
                })}
              </Slider>
            </div>
            <table className="table w-100">
              <thead>
                <tr>
                  <td>
                    rating <span style={{ float: "right" }}>:</span>
                  </td>
                  <th>{detail?.rating}</th>
                </tr>
                <tr>
                  <td>
                    Maps <span style={{ float: "right" }}>:</span>
                  </td>
                  <th>
                    <a
                      clasasName="btn btn-primary"
                      target="_blank"
                      href={`https://www.google.com/maps/search/${detail?.coordinates?.latitude},+${detail?.coordinates?.longitude}/@${detail?.coordinates?.latitude},${detail?.coordinates?.longitude}z`}
                    >
                      Show{" "}
                    </a>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="row">
          {listDetail?.map((row, key) => {
            return (
              <div key={key} className="col-lg-4 col-md-4 col-sm-12 col-xl-4">
                <div className="card mt-2">
                  <div className="card-header">List review</div>
                  <div className="card-body">
                    <div className="text-center">
                      <img
                        className="rounded-circle mt-2 mb-2"
                        width="60px"
                        height="60px"
                        src={`${row.user.image_url}`}
                        alt={row.user.name}
                      />
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <td>
                            Name <span style={{ float: "right" }}>:</span>
                          </td>
                          <th>{row.user.name}</th>
                        </tr>
                        <tr>
                          <td>
                            Rating <span style={{ float: "right" }}>:</span>
                          </td>
                          <th>{row.rating}</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="card-footer" style={{ padding: "15px" }}>
                      <div>
                        <b>Comment:</b>
                      </div>
                      <p> {row.text}</p>
                      <div className="w-100">
                        <a
                          className="btn btn-primary btn-sm w-100"
                          href={`${row.url}`}
                          target="_blank"
                        >
                          Link
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default DetailBusiness;
