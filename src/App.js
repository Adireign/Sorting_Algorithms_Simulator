import React, { Component } from "react";

// import Foo from "./Components/Button";
import Bubble_Sort from "./algorithms/Bubble_Sort";
import Insertion_Sort from "./algorithms/Insertion_Sort";
import Selection_Sort from "./algorithms/Selection_Sort";
import Backward from "@material-ui/icons/SkipPreviousRounded";
import Play from "@material-ui/icons/PlayCircleOutlineRounded";
import Forward from "@material-ui/icons/SkipNextRounded";
import RotateLeft from "@material-ui/icons/RotateLeft";
import Visual from "./Components/Visual";
import "./App.css";

class App extends Component {
  state = {
    // initials..
    algorithm: "Insertion Sort",
    css: [],
    array: [],
    arraySteps: [],
    colorSteps: [],
    currentStep: 0,
    count: 20,
    delay: 50,
    timeouts: [],
    cval: 0,
  };

  ALGORITHMS = {
    "Bubble Sort": Bubble_Sort,
    "Insertion Sort": Insertion_Sort,
    "Selection Sort": Selection_Sort,
  };

  componentDidMount() {
    this.Insertion_Sort_generateRandomArray();
  }

  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();

    this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);

    this.setState({
      arraySteps: steps,
      colorSteps: colorSteps,
    });
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: [],
    });
  };

  clearcss = () => {
    let blankKey = new Array(this.state.count).fill(0);

    this.setState({
      css: blankKey,
      colorSteps: [blankKey],
    });
  };

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  Bubble_Sort_generateRandomArray = () => {
    this.clearTimeouts();
    this.clearcss();
    this.setState({
      algorithm: "Bubble Sort",
    });
    const count = this.state.count;
    const temp = [];

    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(50, 200));
    }

    this.setState(
      {
        array: temp,
        arraySteps: [temp],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };
  Selection_Sort_generateRandomArray = () => {
    
    this.setState({
      algorithm: "Selection Sort",
    });

    this.clearcss();
    this.clearTimeouts();
    const temp = [];
    const count = this.state.count;

    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(50, 200));
    }

    this.setState(
      {
        array: temp,
        arraySteps: [temp],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  Insertion_Sort_generateRandomArray = () => {
    this.clearTimeouts();
    this.clearcss();
    this.setState({
      algorithm: "Insertion Sort",
    });
    const count = this.state.count;
    const temp = [];

    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(40, 200));
    }

    this.setState(
      {
        array: temp,
        arraySteps: [temp],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  changeArray = (index, value) => {
    let arr = this.state.array;
    arr[index] = value;
    this.setState(
      {
        array: arr,
        arraySteps: [arr],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) return;
    currentStep -= 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      css: this.state.colorSteps[currentStep],
    });
  };

  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.state.arraySteps.length - 1) return;
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      css: this.state.colorSteps[currentStep],
    });
  };

  start = () => {
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;

    this.clearTimeouts();

    let timeouts = [];
    let i = 0;

    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          css: colorSteps[currentStep],
          currentStep: currentStep + 1,
        });
        timeouts.push(timeout);
      }, this.state.delay * i);
      i++;
    }

    this.setState({
      timeouts: timeouts,
    });
  };

  render() {
    let bars = this.state.array.map((value, index) => (
      <Visual
        key={index}
        index={index}
        length={value}
        color={this.state.css[index]}
        changeArray={this.changeArray}
      />
    ));

    let Selection_Sort_playButton;
    let Insertion_Sort_playButton;
    let Bubble_Sort_playButton;

    if (this.state.arraySteps.length === this.state.currentStep) {
      Selection_Sort_playButton = (
        <button
          className="controller"
          onClick={this.Selection_Sort_generateRandomArray}
        >
          <RotateLeft />
        </button>
      );
    } else {
      Selection_Sort_playButton = (
        <button className="controller" onClick={this.start}>
          <Play />
        </button>
      );
    }

    if (this.state.arraySteps.length === this.state.currentStep) {
      Insertion_Sort_playButton = (
        <button
          className="controller"
          onClick={this.Insertion_Sort_generateRandomArray}
        >
          <RotateLeft />
        </button>
      );
    } else {
      Insertion_Sort_playButton = (
        <button className="controller" onClick={this.start}>
          <Play />
        </button>
      );
    }
    if (this.state.arraySteps.length === this.state.currentStep) {
      Bubble_Sort_playButton = (
        <button
          className="controller"
          onClick={this.Bubble_Sort_generateRandomArray}
        >
          <RotateLeft />
        </button>
      );
    } else {
      Bubble_Sort_playButton = (
        <button className="controller" onClick={this.start}>
          <Play />
        </button>
      );
    }
    let value;

    return (
      <div className="app">
        <div className="control-pannel">
          <div className="control-buttons">
            <button className="controller" onClick={this.previousStep}>
              <Backward />
            </button>

            <div className="ss">
              {Selection_Sort_playButton}
              Selection Sort
            </div>
            <div className="is">
              {Insertion_Sort_playButton}
              Insertion Sort
            </div>
            <div className="bs">
              {Bubble_Sort_playButton}
              Bubble Sort
            </div>

            <button className="controller" onClick={this.nextStep}>
              <Forward />
            </button>
          </div>
        </div>
        <div className="frame">
          <div className="barsDiv container card">{bars}</div>
        </div>
        {/* <div className="Array_Size">
          <h3>Enter the Size of Array</h3>
          <input value={value} onChange={(e) => {this.setState({
          cval: {value},
        });
        }} />
        <button onClick={(e) => {this.setState({
          cval: {value},
        });
        }}></button>
        </div> */}
      </div>
    );
  }
}

export default App;
