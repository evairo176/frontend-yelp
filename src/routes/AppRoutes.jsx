import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Business from "../component/businesses/Business";
import DetailBusiness from "../component/businesses/DetailBusiness";
import ListReview from "../component/businesses/ListReview";
import NavbarPublic from "../navbar/NavbarPublic";

function AppRoutes() {
  return (
    <Fragment>
      <NavbarPublic />
      <Routes>
        <Route path="/" element={<Business />} />
        <Route path="/:id" element={<DetailBusiness />} />
        <Route path="/list-review/:id" element={<ListReview />} />
      </Routes>
    </Fragment>
  );
}

export default AppRoutes;
