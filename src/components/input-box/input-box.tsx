import React, { useState } from "react";

type InputBoxDataType = {
  inputValueCallback: (inputData: string) => void;
  hideInputBoxCallback: () => void;
};
const InputBox: React.FC<InputBoxDataType> = ({ inputValueCallback, hideInputBoxCallback }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const inputValidation = (value: string) => {
    var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
    if (regex.test(value)) {
      inputValueCallback(value);
      hideInputBoxCallback();
    } else {
      setError(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <input
        type="text"
        value={inputValue}
        className="flex p-2 m-2 items-center justify-center"
        onChange={(event) => {
          setInputValue(event.target.value);
          setError(false);
        }}
      />
      <button
        className="p-2 mb-2 text-center items-center bg-buttonBlueColor text-buttonText rounded"
        onClick={() => inputValidation(inputValue)}
      >
        Generate Calendar
      </button>
      {error ? (
        <p className="font-semibold text-errorColor">
          Enter value in the form of DD/MM/YYYY only (Eg. 23/03/2020 or
          03/10/2020)
        </p>
      ) : (
        <p>&nbsp;</p>
      )}
    </div>
  );
};

export default InputBox;