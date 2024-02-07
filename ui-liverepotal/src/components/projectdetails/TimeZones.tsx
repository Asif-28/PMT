"use client";
import React, { useState, useEffect } from "react";
import ct from "countries-and-timezones";
import Image from "next/image";

const TimeZones = () => {
  const [currentDay, setCurrentDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [dayNight, setDayNight] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    const country = ct.getCountry("IN");
    const countryTimezones = country.timezones;
    const initialTimezone = countryTimezones[0];

    const getFormattedDateTime = () => {
      const options = {
        timeZone: initialTimezone,
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

      const [
        currentDayString,
        month,
        dateString,
        atValue,
        timeString,
        dayNight,
      ] = formattedDateTime.split(" ");
      console.log(formattedDateTime);
      setCurrentDay(currentDayString);
      setCurrentMonth(month);
      setCurrentDate(dateString);

      setCurrentTime(timeString);
      setDayNight(dayNight);
      setTimezone(initialTimezone);
    };

    getFormattedDateTime();

    // Set up an interval to update the time every 60 seconds
    const intervalId = setInterval(getFormattedDateTime, 60000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main>
      <div className=" px-10 py-7 shadow-xl rounded-md border border-gray-200 mb-20">
        <div className="pb-7 text-gray-500">Country Info</div>

        <div className="flex gap-8 items-start">
          <div>
            <div className="text-base text-gray-500 font-semibold pb-2">
              {currentDay} {currentDate}
            </div>
            <div className="text-xl sm:text-3xl md:text-5xl text-gray-950 font-semibold pb-2">
              {currentTime} {` `}
              {dayNight}
            </div>
            <div className="text-base text-gray-950 md:text-xl">
              {" "}
              {timezone}
            </div>
          </div>
          {/* flag */}
          <div>
            <Image src={`/flag.png`} alt="flag" width={85} height={50} />
            <h3 className="mt-3 text-center text-gray-500">{`USA`}</h3>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TimeZones;
