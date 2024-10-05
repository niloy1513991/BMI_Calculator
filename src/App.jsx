import React, { useState } from "react";
import "./App.css"; // Import the custom CSS

const App = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");
  const [weightUnit, setWeightUnit] = useState("lbs"); // State for weight unit selection
  const [heightUnit, setHeightUnit] = useState("in"); // State for height unit selection

  const calcBMI = (e) => {
    e.preventDefault();
    let weightInLbs = weightUnit === "kg" ? weight * 2.20462 : weight; // Convert kg to lbs if necessary
    let heightInInches;

    if (heightUnit === "ft-in") {
      heightInInches = parseInt(heightFeet) * 12 + parseInt(heightInches); // Convert feet and inches to inches
    } else if (heightUnit === "m") {
      heightInInches = height * 39.3701; // Convert meters to inches
    } else {
      heightInInches = height; // Height is already in inches
    }

    if (weightInLbs === 0 || heightInInches === 0) {
      alert(`You must not input '0'`);
      return;
    }

    const calculatedBmi = (
      (weightInLbs / (heightInInches * heightInInches)) *
      703
    ).toFixed(1);
    setBmi(calculatedBmi);

    if (calculatedBmi <= 18.5) {
      setMessage("You are underweight");
    } else if (calculatedBmi > 18.5 && calculatedBmi <= 24.9) {
      setMessage("You have a normal weight");
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      setMessage("You are first stage overweight");
    } else {
      setMessage("You are overweight");
    }
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="container w-96 mx-auto mt-10">
        <h2 className="text-3xl text-blue-600 font-bold text-center m-4">
          BMI Calculator
        </h2>
        <form onSubmit={calcBMI}>
          <div className="mb-6">
            <label className="font-bold text-lg">Weight</label>
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="ml-2 h-10 focus:bg-blue-100 active:bg-blue-200"
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
            <input
              type="text"
              placeholder="Enter weight value"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="ml-2 mt-2 h-10"
            />
          </div>
          <div className="mt-10">
            <label className="font-bold text-lg">Height</label>
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className="ml-2 h-10 focus:bg-blue-100 active:bg-blue-200"
            >
              <option value="in">Inches</option>
              <option value="ft-in">Feet and Inches</option>
              <option value="m">Meters</option>
            </select>
            <div className="h-20 mt-2">
              {heightUnit === "ft-in" && (
                <div className="flex flex-row space-x-2">
                  <input
                    type="text"
                    placeholder="Feet"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    className="w-1/2 h-10"
                  />
                  <input
                    type="text"
                    placeholder="Inches"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    className="w-1/2 h-10"
                  />
                </div>
              )}
              {heightUnit === "in" && (
                <input
                  type="text"
                  placeholder="Enter height in inches"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="ml-2 h-10"
                />
              )}
              {heightUnit === "m" && (
                <input
                  type="text"
                  placeholder="Enter height in meters"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="ml-2 h-10"
                />
              )}
            </div>
          </div>
          <div className="mt-4">
            <button className="btn" type="submit">
              Submit
            </button>
            <button
              className="btn btn-outline ml-2"
              onClick={reload}
              type="button"
            >
              Reload
            </button>
          </div>
          <div className="center">
            <h3>
              Your BMI is: <span className="font-bold text-xl">{bmi}</span>
            </h3>
            <p>{message}</p>
          </div>
          <div className="mx-auto text-center text-slate-700">
            &copy;niloykumarmohonta
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
