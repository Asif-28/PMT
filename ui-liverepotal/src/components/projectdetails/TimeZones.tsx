import React from "react";
import ct from "countries-and-timezones";

const TimeZones = () => {
  const country = ct.getCountry("DE");
  console.log(country);
  return <div>{/* <h1> {country}</h1> */}</div>;
};

export default TimeZones;
