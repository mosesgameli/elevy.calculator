const steps = [
  {
    group: "source",
    value: "source",
    label: "Select Transfer Source",
    description: `Here you need to select the source your transfer. 
    It could any of the Mobile money platforms or a bank name. No need for account number.`,
  },
  {
    group: "input",
    label: "How much money in GHS",
    value: "amount",
  },
  {
    group: "input",
    label: "How much have you sent today",
    value: "limit",
  },
];

export default steps;
