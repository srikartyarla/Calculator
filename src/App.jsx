import { useState } from 'react'
import './App.css'
import Button from '../components/Button';
function calculate(str) {
  const numbers = [];
  const operators = [];

  function precedence(op) {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;

    return 0;
  }

  function operation() {
    const b = numbers.pop();
    const a = numbers.pop();
    const op = operators.pop();

    if (op === "+") numbers.push(a + b);
    if (op === "-") numbers.push(a - b);
    if (op === "*") numbers.push(a * b);
    if (op === "/") numbers.push(a / b);
  }

  let i = 0;

  while (i < str.length) {
    // Number
    if (!isNaN(str[i]) || str[i] === ".") {
  let numStr = "";
  while (i < str.length && (!isNaN(str[i]) || str[i] === ".")) {
    numStr += str[i];
    i++;
  }
  numbers.push(Number(numStr));
  continue;
}

    // Operator
    else {
      while (
        operators.length > 0 &&
        precedence(operators[operators.length - 1]) >= precedence(str[i])
      ) {
        operation();
      }

      operators.push(str[i]);
    }

    i++;
  }
  while (operators.length > 0) {
    operation();
  }

  return numbers[0];
}
  
function App() {
  const [str,setstr] = useState("");
   
  return (
    <>
      <div className="flex justify-center items-center h-screen w-full bg-gray-400 ">
        <div className="flex justify-center items-center flex-col gap-2 bg-white p-2 rounded-2xl">
          <h1 className='text-center font-medium bg-gray-800 rounded-2xl w-full text-white  text-3xl'>Calculator</h1>
          <div className="flex justify-between items-center w-full gap-2">
            <input
              className="p-3 border w-full rounded-2xl"
              type="text"
              value={str}
              readOnly
            />
            <Button value={"C"} className="w-sm rounded-2xl"  onClick={() => setstr("")} />
          </div>
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-3 w-full">
              <Button value={9} onClick={() => setstr((prev) => prev + "9")} />
              <Button value={8} onClick={() => setstr((prev) => prev + "8")} />
              <Button value={7} onClick={() => setstr((prev) => prev + "7")} />
              <Button value={6} onClick={() => setstr((prev) => prev + "6")} />
              <Button value={5} onClick={() => setstr((prev) => prev + "5")} />
              <Button value={4} onClick={() => setstr((prev) => prev + "4")} />
              <Button value={3} onClick={() => setstr((prev) => prev + "3")} />
              <Button value={2} onClick={() => setstr((prev) => prev + "2")} />
              <Button value={1} onClick={() => setstr((prev) => prev + "1")} />
              <Button
                value={0}
                className="w-full col-span-full"
                onClick={() => setstr((prev) => prev + "0")}
              />
            </div>
            <div className="grid grid-cols-1 w-sm">
              <Button
                value={"+"}
                onClick={() => setstr((prev) => prev + "+")}
              />
              <Button
                value={"-"}
                onClick={() => setstr((prev) => prev + "-")}
              />
              <Button
                value={"X"}
                onClick={() => setstr((prev) => prev + "*")}
              />
              <Button
                value={"/"}
                onClick={() => setstr((prev) => prev + "/")}
              />
              <Button
                value={"="}
                onClick={() => setstr((prev) => String(calculate(prev)))}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
