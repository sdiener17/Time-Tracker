import React, {useState, useEffect} from "react";
import styled from "styled-components";

export default function HomePage(){
    const [error, setError] = useState(false);
    const [averagePerDayAll, setAveragePerDayAll] = useState(null);

    useEffect(()=>{
        fetch("https://salty-lowlands-88611.herokuapp.com/averageperdayall", {
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
            let apda = parseFloat(result.results[0].averagehoursspent).toFixed(4);
            setAveragePerDayAll(apda);
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
            <div>
                Average Time Spent on Schoolwork Per Day Across All Semesters: {averagePerDayAll}
            </div>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display:flex;
    flex-direction:column;
`;