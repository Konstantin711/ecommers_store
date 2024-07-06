import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import { getAdminPageData } from '../../redux/actions/adminPageActions'



function AdminPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminPageData());
  }, [dispatch]);


  return (
    <>
      <p> --- Зробіть ваш вибір</p>
    </>
  );
}

export default AdminPage;