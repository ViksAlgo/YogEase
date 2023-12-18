import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import moment from "moment";

const YourClass = () => {
    const [isClassActive, setIsClassActive] = useState(false);
    const [timeLeftHours, setTimeLeftHours] = useState(0);
    const [timeLeftMinutes, setTimeLeftMinutes] = useState(0);
    const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);


    useEffect(() => {
        const userDetails = localStorage.getItem("userDetails");
        const timeSlot = JSON.parse(userDetails).batch.timeSlot;

        const dayToAdd = () => {
            if(moment(timeSlot, 'HH:mm').isBefore(moment(), 'hour')){
                return 1;
            } else {
                return 0;
            }
        }


        if(moment().isSame(moment(timeSlot, 'HH:mm'), 'hour')){
            setIsClassActive(true);
        } else {
            setIsClassActive(false);
            setTimeLeftHours(moment(timeSlot, 'HH:mm').add(dayToAdd(), 'day').diff(moment(), 'hours'));
            setTimeLeftMinutes(moment(timeSlot, 'HH:mm').add(dayToAdd(), 'day').diff(moment(), 'minutes') % 60);
            setTimeLeftSeconds(moment(timeSlot, 'HH:mm').add(dayToAdd(), 'day').diff(moment(), 'seconds') % 60);
        }
        setInterval(() => {
            if(moment().isSame(moment(timeSlot, 'HH:mm'), 'hour')){
                setIsClassActive(true);
            } else {
                setIsClassActive(false);
                setTimeLeftHours(moment(timeSlot, 'HH:mm').add(dayToAdd(), 'day').diff(moment(), 'hours'));
                setTimeLeftMinutes(moment(timeSlot, 'HH:mm').add(dayToAdd(), 'day').diff(moment(), 'minutes') % 60);
                setTimeLeftSeconds(moment(timeSlot, 'HH:mm').add(dayToAdd(), 'day').diff(moment(), 'seconds') % 60);
            }
        }, 1000);

    }, []);

  return (
      <div>
          <Navbar/>
          {isClassActive ? (
              <>
                  <h1 className={"text-4xl font-bold mb-8 text-center mt-16"}>
                      {"Your class is Live"}
                  </h1>
                  <div className="flex justify-center">
                      <iframe width="560" height="315"
                              src="https://www.youtube.com/embed/0et6I930LaU?si=dcgwTvXdBSGvERno"
                              title="YouTube video player" frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen></iframe>
                  </div>
              </>
          ) : (
              <h1 className={"text-4xl font-bold mb-8 text-center mt-16"}>
                  {`Your class will start in ${timeLeftHours} Hours ${timeLeftMinutes} Minutes ${timeLeftSeconds} Seconds`}
              </h1>
          )}
      </div>

  )
};

export default YourClass;
