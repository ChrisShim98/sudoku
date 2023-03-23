import React, { useState, useEffect } from "react";
import Button from "../button";

const SudokuBoard = () => {
  let blankGrid = [];
  let randomArr = [];

  // Difficulty
  const difficultyRange = {
    testing: 5,
    beginner: 15,
    intermediate: 30,
    expert: 60,
  };

  const [difficulty, setDifficulty] = useState(
    parseInt(localStorage.getItem("difficulty")) !== null
      ? parseInt(localStorage.getItem("difficulty"))
      : difficultyRange["testing"]
  );

  function fillSudokuBoard() {
    let FillingGrid = new Array(9).fill().map(() => new Array(9).fill(0));
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // shuffle the numbers
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    // fill the board with the shuffled numbers
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // find the valid numbers for this cell
        const validNums = getValidNumbers(FillingGrid, row, col, nums);

        if (validNums.length === 0) {
          // backtrack if there are no valid numbers
          return fillSudokuBoard();
        }

        // randomly select a number from the valid numbers
        const numIndex = Math.floor(Math.random() * validNums.length);
        const num = validNums[numIndex];

        FillingGrid[row][col] = num;
      }
    }
    // Setting blankGrid
    blankGrid = FillingGrid;
    // Difficulty Setting
    ClearValues(difficulty);
  }

  function getValidNumbers(board, row, col, nums) {
    const usedNums = new Set();

    // check row
    for (let c = 0; c < 9; c++) {
      if (board[row][c] !== 0) {
        usedNums.add(board[row][c]);
      }
    }

    // check column
    for (let r = 0; r < 9; r++) {
      if (board[r][col] !== 0) {
        usedNums.add(board[r][col]);
      }
    }

    // check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[boxRow + r][boxCol + c] !== 0) {
          usedNums.add(board[boxRow + r][boxCol + c]);
        }
      }
    }

    return nums.filter((num) => !usedNums.has(num));
  }

  // Randomly turns some of the values into 0
  function ClearValues(amountToClear) {
    for (let i = 0; i <= amountToClear; i++) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      blankGrid[row][col] = 0;
    }
  }

  // Set Grid
  const [grid, setGrid] = useState(blankGrid);
  // Set popup submit feature
  const [popup, setPopup] = useState("");

  // Initialize Board only if no data was found
  // Store source of truth in local storage
  if (localStorage.getItem("randGrid") != null) {
    let storageArr = localStorage
      .getItem("randGrid")
      .split("[")
      .join("")
      .split("]")
      .join("")
      .split(",");
    let storageIndex = 0;
    for (let i = 0; i < 9; i++) {
      blankGrid.push([]);
      randomArr.push([]);
      for (let j = 0; j < 9; j++) {
        blankGrid[i].push(parseInt([storageArr[storageIndex]]));
        randomArr[i].push(parseInt([storageArr[storageIndex]]));
        storageIndex++;
      }
    }
  } else {
    fillSudokuBoard();
    localStorage.setItem("randGrid", JSON.stringify(blankGrid));
    localStorage.setItem("difficulty", difficulty);
  }

  // Set up board on front-end
  let tableRows = [];
  for (let i = 0; i < grid.length; i++) {
    const tableCells = [];
    for (let j = 0; j < grid[i].length; j++) {
      tableCells.push(
        <td
          key={i + "" + j}
          className={
            randomArr[i][j] === 0 &&
            (i === 3 || i === 6) &&
            (j === 2 || j === 5)
              ? "border w-6 h-6 bg-fuchsia-100 border-t-black border-t-2 border-r-2 border-r-black"
              : randomArr[i][j] === 0 && (i === 3 || i === 6)
              ? "border w-6 h-6 bg-fuchsia-100 border-t-black border-t-2"
              : randomArr[i][j] === 0 && (j === 2 || j === 5)
              ? "border w-6 h-6 bg-fuchsia-100 border-r-2 border-r-black"
              : randomArr[i][j] === 0
              ? "border w-6 h-6 bg-fuchsia-100"
              : (i === 3 || i === 6) && (j === 2 || j === 5)
              ? "px-2 py-2 text-center w-6 h-6 bg-fuchsia-600 text-white border-t-black border-t-2 border-r-2 border-r-black border"
              : i === 3 || i === 6
              ? "px-2 py-2 text-center w-6 h-6 bg-fuchsia-600 text-white border-t-black border-t-2 border"
              : j === 2 || j === 5
              ? "px-2 py-2 text-center w-6 h-6 bg-fuchsia-600 text-white border-r-2 border-r-black border"
              : "px-2 py-2 text-center w-6 h-6 border bg-fuchsia-600 text-white"
          }
        >
          {randomArr[i][j] === 0 ? (
            <input
              type="text"
              value={grid[i][j]}
              className={
                grid[i][j] === 0
                  ? "text-red-600 bg-fuchsia-100 w-full h-full caret-transparent cursor-pointer text-center"
                  : "w-full h-full bg-fuchsia-100 caret-transparent cursor-pointer text-center"
              }
              onChange={(e) => updateCell(i, j, grid[i][j], e.target.value)}
            />
          ) : (
            <p className="pointer-events-none">{grid[i][j]}</p>
          )}
        </td>
      );
    }
    tableRows.push(<tr key={i}>{tableCells}</tr>);
  }

  function updateCell(row, column, currentValue, newValue) {
    let updatedValue = newValue.split("");
    for (let i = 0; i < updatedValue.length; i++) {
      if (!/[0-9]/g.test(updatedValue[i])) {
        updatedValue = 0;
        break;
      }
    }

    if (updatedValue.length > 1) {
      updatedValue.splice(newValue.indexOf("" + currentValue), 1);
      updatedValue = parseInt(updatedValue.join(""));
    } else {
      if (updatedValue.length !== 0) {
        updatedValue = parseInt(updatedValue);
      } else {
        updatedValue = 0;
      }
    }

    let newGrid = grid;
    newGrid[row].splice(column + 1, 0, updatedValue);
    newGrid[row].splice(column, 1);

    setGrid([...newGrid]);
  }

  function resetBoard() {
    localStorage.removeItem("randGrid");
    fillSudokuBoard();
    localStorage.setItem("randGrid", JSON.stringify(blankGrid));
    localStorage.setItem("difficulty", difficulty);
    setGrid(blankGrid);
  }

  function submitBoard() {
    // Check that the board is a 9x9 array
    if (grid.length !== 9 || grid.some((row) => row.length !== 9)) {
      setPopup("tryAgain");
      setTimeout(() => {
        setPopup("");
      }, 2000);
      return false;
    }

    // Check that each row contains all digits from 1 to 9
    for (let i = 0; i < 9; i++) {
      const row = grid[i];
      if (!isSubsetOf(row, [1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        setPopup("tryAgain");
        setTimeout(() => {
          setPopup("");
        }, 2000);
        return false;
      }
    }

    // Check that each column contains all digits from 1 to 9
    for (let i = 0; i < 9; i++) {
      const column = grid.map((row) => row[i]);
      if (!isSubsetOf(column, [1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        setPopup("tryAgain");
        setTimeout(() => {
          setPopup("");
        }, 2000);
        return false;
      }
    }

    // Check that each 3x3 subgrid contains all digits from 1 to 9
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        const subgrid = [];
        for (let k = i; k < i + 3; k++) {
          for (let l = j; l < j + 3; l++) {
            subgrid.push(grid[k][l]);
          }
        }
        if (!isSubsetOf(subgrid, [1, 2, 3, 4, 5, 6, 7, 8, 9])) {
          setPopup("tryAgain");
          setTimeout(() => {
            setPopup("");
          }, 2000);
          return false;
        }
      }
    }

    // If all checks pass, the board is correct
    setPopup("correct");
    setTimeout(() => {
      setPopup("");
    }, 2000);
    return true;
  }

  function isSubsetOf(arr1, arr2) {
    return arr1.every((val) => arr2.includes(val));
  }

  //Reset if difficulty is changed
  useEffect(() => {
    if (isNaN(difficulty)) {
      setDifficulty(5);
    }
    if (parseInt(localStorage.getItem("difficulty")) !== difficulty) {
      resetBoard();
    }
  }, [difficulty]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col lg:flex-row text-gray-500 gap-2">
        <h3 className="lg:pr-2 text-black text-center lg:text-left">
          Difficulty:
        </h3>
        <button
          className={difficulty === 5 ? "text-black" : "hover:text-black"}
          onClick={() => setDifficulty(difficultyRange["testing"])}
        >
          Testing
        </button>
        <button
          className={difficulty === 15 ? "text-black" : "hover:text-black"}
          onClick={() => setDifficulty(difficultyRange["beginner"])}
        >
          Beginner
        </button>
        <button
          className={difficulty === 30 ? "text-black" : "hover:text-black"}
          onClick={() => setDifficulty(difficultyRange["intermediate"])}
        >
          Intermediate
        </button>
        <button
          className={difficulty === 60 ? "text-black" : "hover:text-black"}
          onClick={() => setDifficulty(difficultyRange["expert"])}
        >
          Expert
        </button>
      </div>

      <table className="table-fixed relative border-collapse border-2 border-black">
        <tbody>{tableRows}</tbody>
      </table>

      {/* Submit Status Popup */}
      <div
        className={
          popup === "tryAgain" || popup === "correct"
            ? "fixed lg:absolute bg-[#0000004f] w-[80vw] lg:w-[30vw] h-[70vh] blur-xl duration-1000 opacity-100"
            : "fixed lg:absolute bg-[#0000004f] w-[80vw] lg:w-[30vw] h-[70vh] blur-xl duration-1000 opacity-0 hidden"
        }
      ></div>
      <div
        className={
          popup === "tryAgain" || popup === "correct"
            ? "fixed lg:absolute bg-[#000] lg:w-[30vw] h-[10vh] left-0 lg:left-auto right-0 lg:right-auto mx-auto top-0 bottom-0 my-auto flex justify-center items-center duration-500 opacity-100"
            : "fixed lg:absolute bg-[#000] lg:w-[30vw] h-[10vh] left-0 lg:left-auto right-0 lg:right-auto mx-auto top-0 bottom-0 my-auto justify-center items-center duration-500 opacity-0 hidden"
        }
      >
        <h3
          className={
            popup === "tryAgain" ? "text-red-600 text-4xl block" : "hidden"
          }
        >
          Try Again
        </h3>
        <h3
          className={
            popup === "correct" ? "text-green-600 text-4xl block" : "hidden"
          }
        >
          Awesome!
        </h3>
      </div>

      <div className="flex place-content-center gap-8 pt-2">
        <Button text="Reset" clickFunction={resetBoard} />
        <Button text="Submit" clickFunction={submitBoard} />
      </div>
    </div>
  );
};

export default SudokuBoard;
