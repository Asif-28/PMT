"use client";
import React, { useState, useEffect } from "react";
import ct from "countries-and-timezones";

const TimeZones = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const country = ct.getCountry("IN");
    const timezone = country.timezones[0];

    const getFormattedDateTime = () => {
      const options = {
        timeZone: timezone,
        weekday: "long" as const,
        month: "long" as const,
        day: "numeric" as const,
        hour: "numeric" as const,
        minute: "numeric" as const,
      };

      const formattedDateTime = new Intl.DateTimeFormat(
        "en-US",
        options
      ).format(new Date());
      setCurrentDateTime(formattedDateTime);
    };

    getFormattedDateTime();

    // Set up an interval to update the time every 60 seconds
    const intervalId = setInterval(getFormattedDateTime, 60000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return <div>Current date and time: {currentDateTime}</div>;
};

export default TimeZones;
