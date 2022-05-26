import formatNumber from "./formatNumber";

const findThreshold = (value) => {
  const threshold = Number(100).toFixed(2) - Number(value).toFixed(2);

  if (threshold <= 0) {
    return false;
  }

  return threshold;
};

const findTax = (amount, limit) => {
  const discount = findThreshold(limit);

  /** FIXME:  I suggest we do not hard code the e-levy rate */
  let tax = Number((1.5 / 100) * Number(amount)).toFixed(2);

  if (discount) {
    if (amount > discount) {
      const base = Number(amount).toFixed(2) - Number(discount).toFixed(2);
      tax = Number((1.5 / 100) * base).toFixed(2);

      return tax;
    } else if (amount < discount) {
      tax = Number(0).toFixed(2);

      return tax;
    }
  }

  return tax;
};

const findTransferRate = (telco, amount) => {
  let charges;

  switch (telco) {
    case "AirtelTigo Money":
    case "MTN Mobile Money":
      /**TODO: What are we doing here? */
      if (amount > 1000) {
        charges = Number(7.5).toFixed(2);
      } else if (amount > 50) {
        charges = Number((0.75 / 100) * amount).toFixed(2);
      } else {
        charges = Number(0.38).toFixed(2);
      }
      break;
    case "Vodafone Cash":
      charges = Number(0).toFixed(2);
      break;
    default:
      // duplicate of line 49 just to fulfil code righteousness 🙄
      charges = Number(0).toFixed(2);
      break;
  }

  return charges;
};

const computeTax = (values) => {
  const { source, amount, limit } = values;
  const actual = Number(amount).toFixed(2);

  const tax = findTax(amount, limit);
  const charges = findTransferRate(source, amount);
  const total = Number(actual) + Number(tax) + Number(charges);

  return {
    total: formatNumber(total),
    actual: formatNumber(actual),
    tax: formatNumber(tax),
    charges: formatNumber(charges),
  };
};

export default computeTax;
