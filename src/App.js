import React, {useState, useEffect} from "react";
import './App.css';


function App() {
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
    <div className="App">
      <div>Hello world</div>
    </div>
  );
}

export default App;
