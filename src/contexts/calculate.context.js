import { createContext, useState, useContext } from "react";
import { useStorage } from "hooks";

const CalculateContext = createContext();

function CalculateProvider({ children }) {
  const [recents, setRecents] = useStorage("#recent$calc", []);
  const [activeStep, setActiveStep] = useState(0);
  const [stepValue, setStepValue] = useState({
    source: "",
    amount: "",
    limit: "0",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setStepValue((prev) => ({
      ...prev,
      source: "",
      amount: "",
      limit: "0",
    }));
  };

  const handleStepValue = (target, value) => {
    setStepValue((prev) => ({
      ...prev,
      [target]: value,
    }));
  };

  const handleSelect = (val) => {
    setStepValue((prev) => ({
      ...prev,
      source: val,
    }));

    handleNext();
  };

  const handleSave = (result) => {
    const slice = { result, data: stepValue };
    const rec = recents;

    if (rec.length >= 10) {
      rec.pop();
    }

    rec.unshift(slice);
    setRecents(rec);

    handleReset();
  };

  return (
    <CalculateContext.Provider
      value={{
        activeStep,
        stepValue,
        handleBack,
        handleNext,
        handleSave,
        handleReset,
        handleSelect,
        handleStepValue,
      }}
    >
      {children}
    </CalculateContext.Provider>
  );
}

function useCalculateContext() {
  return useContext(CalculateContext);
}

export { CalculateProvider, useCalculateContext };
