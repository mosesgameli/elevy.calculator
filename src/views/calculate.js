import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";

import { Span } from "material";
import { steps, formatNumber } from "utils";
import { RenderVendors, RenderResult, withLayout } from "widgets";
import { useCalculateContext } from "contexts";

function CalculateLevy() {
  const {
    activeStep,
    stepValue,
    handleBack,
    handleSelect,
    handleNext,
    handleStepValue,
  } = useCalculateContext();

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => {
          if (step.group === "source") {
            return (
              <Step key={index}>
                <StepLabel>
                  <Span>{step.label}</Span>
                  <Span
                    sx={{
                      fontWeight: "bold",
                      color: (theme) => theme.palette.primary.main,
                    }}
                  >
                    {stepValue[`${step.value}`]}
                  </Span>
                </StepLabel>
                <StepContent>
                  <Box sx={{ my: 2 }}>
                    <RenderVendors
                      select={stepValue[`${step.value}`]}
                      handleSelect={handleSelect}
                    />

                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={stepValue[`${step.value}`] ? false : true}
                      >
                        Continue
                      </Button>
                    </Box>
                  </Box>
                </StepContent>
              </Step>
            );
          }

          return (
            <Step key={index}>
              <StepLabel
                optional={
                  index === 2 && activeStep === 2 ? (
                    <Typography variant="caption" sx={{ ml: 0.7 }}>
                      {`Enter the amount you sent using ${stepValue.source}
                      today`}
                    </Typography>
                  ) : null
                }
              >
                <Span>{step.label}</Span>
                <Span
                  sx={{
                    fontWeight: "bold",
                    color: (theme) => theme.palette.primary.main,
                  }}
                >
                  {formatNumber(stepValue[`${step.value}`])}
                </Span>
              </StepLabel>
              <StepContent>
                <Box
                  sx={{
                    my: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    type="number"
                    sx={{ mx: 1 }}
                    name={step.value}
                    variant="standard"
                    value={stepValue[`${step.value}`]}
                    onChange={(e) =>
                      handleStepValue(e.target.name, e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography>GHS</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                    <Button
                      disabled={stepValue[`${step.value}`] ? false : true}
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                  </Box>
                </Box>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length && <RenderResult />}
    </Box>
  );
}

export default withLayout(CalculateLevy);
