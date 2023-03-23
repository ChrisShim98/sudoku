import React from "react";

const Instructions = () => {
  return (
    <div>
      <h2 className="text-3xl pb-4">How to play</h2>
      <p className="text-gray-900">
        Your objective is to fill every row, column, and 3x3 sub-grid with
        numbers from 1 to 9 without repeating any number in the same row,
        column, or sub-grid.
      </p>
      <div className="bg bg-gray-200">
        <ul className="list-disc py-2 px-2 pl-6">
          <li className="text-gray-900">
            Select a difficulty above the Sudoku grid.
          </li>
          <li className="text-gray-900">
            Replace the zeros with numbers between 1 to 9 that are unique to
            their row, column and sub-grid.
          </li>
          <li className="text-gray-900">
            Start by looking for rows, columns, or sub-grids with only a few
            missing numbers, and then use the process of elimination to fill in
            the missing numbers.
          </li>
          <li className="text-gray-900">Hit submit once completed.</li>
          <li className="text-gray-900">
            Hit reset to start a new puzzle at the same difficulty.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;
