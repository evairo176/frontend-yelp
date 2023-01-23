import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";

function ListReview() {
  const params = useParams();
  const [detail, setDetail] = useState("");
  useEffect(() => {
    fetchListReviewBusiness();
  }, []);

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

    setDetail(data?.reviews);
    // console.log(data);
  };

  const columns = [
    {
      name: "user",
      selector: (row) => (
        <div className="d-flex align-items-center">
          <div className="img mr-2">
            <img
              src={`${row.user.image_url}`}
              className="rounded-circle mr-2"
              alt=""
              width="40px"
            />
          </div>
          <div className="profile">
            <p>{row.user.name}</p>
            <p>{row.user.profile_url}</p>
          </div>
        </div>
      ),
      sortable: true,
      center: true,
      maxWidth: "500px",
    },
    {
      name: "rating",
      selector: (row) => row.rating,
      sortable: true,
      center: true,
      maxWidth: "100px",
    },
    {
      name: "text",
      selector: (row) => row.text,
      sortable: true,
      center: true,
      maxWidth: "500px",
    },
    {
      name: "url",
      selector: (row) => row.url,
      sortable: true,
      center: true,
      maxWidth: "500px",
    },
  ];
  return (
    <Fragment>
      <div className="container">
        <div className="card" style={{ marginTop: "80px" }}>
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <div>List Review</div>
              <div>
                <Link to="/" className="btn btn-danger btn-sm">
                  Back
                </Link>
              </div>
            </div>
          </div>
          <div className="card-body">
            <DataTable
              responsive={true}
              striped={true}
              //   style={{ whiteSpace: "unset" }}
              highlightOnHover
              columns={columns}
              data={detail}
              pagination
              whiteSpace={false}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ListReview;
