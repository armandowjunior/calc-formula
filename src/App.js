import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [expression, setExpression] = useState("0");
  const [answer, setAnswer] = useState("0");
  const [dec, setDec] = useState(false);

  const clear = () => {
    setExpression("0");
    setAnswer("0");
    setDec(false);
  };

  const backspace = () => {
    if (expression === "0" || expression === "") return;
    setExpression((prev) => {
      return prev.slice(0, -1);
    });
  };

  const handleClick = (num) => () => {
    if (num === ".") setDec(true);
    if (num === "." && dec) return;
    if (/[+*-]/.test(num)) setDec(false);
    setExpression(
      (prev) =>
        prev === "0"
          ? // if the previous value is 0, and you input 0, just input the 0;
            num
          : (prev + num).replace(/[+*-/](?=[+*/])|[-](?=[-])/, "")
      // regex - look ahead, if there is a sequence of [+*-/] with [+*/] or [-] with [-], replace the first with a ";"
    );
  };

  const compute = () => {
    //the regex - if there is a operation sign at the start or end of the string, replace it by a "";
    let result = eval(expression.replace(/^[*/]|[+*-/]$/, ""));
    setAnswer(result.toString());
    setExpression(result.toString());
  };

  return (
    <div className="App">
      <h2 id="display">{expression}</h2>
      <h2 id="display2">{answer}</h2>
      <button onClick={clear} id="clear">
        AC
      </button>
      <button onClick={backspace} id="del">
        DEL
      </button>
      <button onClick={handleClick("/")} id="divide">
        /
      </button>
      <button onClick={handleClick("*")} id="multiply">
        x
      </button>
      <button onClick={handleClick("7")} id="seven">
        7
      </button>
      <button onClick={handleClick("8")} id="eight">
        8
      </button>
      <button onClick={handleClick("9")} id="nine">
        9
      </button>
      <button onClick={handleClick("-")} id="subtract">
        -
      </button>
      <button onClick={handleClick("4")} id="four">
        4
      </button>
      <button onClick={handleClick("5")} id="five">
        5
      </button>
      <button onClick={handleClick("6")} id="six">
        6
      </button>
      <button onClick={handleClick("+")} id="add">
        +
      </button>
      <div className="wrapper-parent">
        <div className="wrapper-child-one">
          <button onClick={handleClick("1")} id="one">
            1
          </button>
          <button onClick={handleClick("2")} id="two">
            2
          </button>
          <button onClick={handleClick("3")} id="three">
            3
          </button>
          <button onClick={handleClick("0")} id="zero">
            0
          </button>
          <button onClick={handleClick(".")} id="decimal">
            .
          </button>
        </div>
        <div className="wrapper-child-two">
          <button onClick={compute} id="equals">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
