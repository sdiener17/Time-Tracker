import React, {useState, useEffect} from "react";
import './App.css';
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/homepage/HomePage";
import SemesterPage from "./components/semesterpage/SemesterPage";


export default function App() {
  const [error,setError] = useState(null);


  useEffect(()=>{
    fetch("https://salty-lowlands-88611.herokuapp.com/db", {
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
            console.log("RESULT "+result.results[0].classification);
          } catch (e) {
            console.log("There was an error in try");
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

  return (
    <PageWrapper>

        <Header />
          <div >
            {/* <NavBar /> */}
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <Routes>
              <Route
                exact
                path="/"
                element={<HomePage/>}
              />
              <Route
                exact path="/semesterpage"
                element={<SemesterPage/>}
              />
              

            </Routes>
          </div>
        <div className="separaterBottomFooter" />
        <Footer />
    </PageWrapper>
  );
}


const PageWrapper = styled.div`

`;
