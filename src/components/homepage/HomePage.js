import React, {useState, useEffect} from "react";
import styled from "styled-components";

const maxDayStructure = {
    maxtime:"loading...",
    schooldate:"loading...",
    dayofweek:"loading...",
    weeknumber:"loading..."
}

const maxWeekStructure = {
    hours:"loading...",
    weeknumber: "loading...",
    classification: "loading...",
    season: "loading...",
    semesteryear: "loading..."
}

export default function HomePage(){
    const [error, setError] = useState(false);
    const [averagePerDayAll, setAveragePerDayAll] = useState("loading...");
    const [totalHours, setTotalHours] = useState("loading...");
    const [maxDay, setMaxDay] = useState(maxDayStructure);
    const [maxWeek, setMaxWeek] = useState(maxWeekStructure);

    useEffect(()=>{
        fetch("https://salty-lowlands-88611.herokuapp.com/gethomepageinfo", {
      method: "get",
      headers: {
        //"Content-Type": "application/json",
        //"Access-Control-Allow-Credentials": true,
      },
      //credentials: "include",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log(result);
          try {
            console.log("RESULT "+result.results);
            let apda = parseFloat(result.averagehoursspent).toFixed(4);
            setAveragePerDayAll(apda);
            let ta = parseFloat(result.totalhours).toFixed(4);
            setTotalHours(ta);
            let mhrs = parseFloat(result.maxday.maxtime).toFixed(4);
            setMaxDay({
                maxtime: mhrs,
                schooldate:result.maxday.schooldate,
                dayofweek:result.maxday.dayofweek,
                weeknumber:result.maxday.weeknumber
            });
            let thrs = parseFloat(result.maxweek.hours).toFixed(4);
            setMaxWeek({
                hours:thrs,
                weeknumber:result.maxweek.weeknumber,
                classification:result.maxweek.classification,
                season:result.maxweek.season,
                semesteryear:result.maxweek.semesteryear
            });


          } catch (e) {
            console.log("There was an error in try" + e);
            setError(e);
          }
          //console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
          console.log("ERROR: "+error);
        }
      );
    },[])

    return(
        <PageWrapper>
            <div className="bubble">
                Average Time Spent on Schoolwork Per Day Across All Semesters: {averagePerDayAll} Hours
            </div>
            <div className="bubble">
                Total Time Spent on Schoolwork Across All Semesters: {totalHours} Hours
            </div>
            <div className="bubble">
                Max Time in a Day Spent on Schoolwork: {maxDay.maxtime} Hours on {maxDay.dayofweek}, {maxDay.schooldate}, Week Number: {maxDay.weeknumber}
            </div>
            <div className="bubble">
                Max Average Time in a Week Spent on Schoolwork: {maxWeek.hours} Hours in Week {maxWeek.weeknumber}, {maxWeek.classification} {maxWeek.season} of {maxWeek.semesteryear}
            </div>
            <div className="marginForFooter"/>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;
    padding:10px;
    .bubble{
        background-color: var(--secondarySiteColor);
        width:1000px;
        border-radius: 10px;
        padding:10px;
        margin-bottom:20px;
    }
    .marginForFooter{
        margin-bottom:var(--marginBottom)
    }
`;