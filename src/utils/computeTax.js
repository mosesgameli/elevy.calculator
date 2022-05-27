import formatNumber from "./formatNumber";

const findThreshold = (value) => {
  const threshold = Number(100).toFixed(2) - Number(value).toFixed(2);

  if (threshold <= 0) {
    return false;
  }

  return threshold;
};

const findTax = (amount, limit) => {
  // if discount is not a falsy value, it is always less than 100
  const discount = findThreshold(limit);

  let tax = Number((1.5 / 100) * Number(amount)).toFixed(2);

  if (discount) {
    if (amount > discount) {
      // when amount to be sent is greater than discount available,
      // the taxable base is the difference between amount and discount
      const base = Number(amount).toFixed(2) - Number(discount).toFixed(2);
      tax = Number((1.5 / 100) * base).toFixed(2);

      return tax;
    } else if (amount <= discount) {
      // when amount to be sent is less than discount available,
      // the total amount is less than the GHS 100 free tier.
      tax = Number(0).toFixed(2);

      return tax;
    }
  }

  return tax;
};

const findTransferRate = (telco, amount) => {
  let charges;

  switch (telco) {
    // granted that AirtelTigo and MTN have same charge rates.
    case "AirtelTigo Money":
    case "MTN Mobile Money":
      // charge rate may be fixed or a calculated percentage
      // ref => https://mtn.com.gh/insight/momo-tariffs
      if (amount > 1000) {
        charges = Number(7.5).toFixed(2);
      } else if (amount > 50) {
        charges = Number((0.75 / 100) * amount).toFixed(2);
      } else {
        charges = Number(0.38).toFixed(2);
      }
      break;
    case "Vodafone Cash":
      // up Vodafone ✌🏾! no transfer charges
      charges = Number(0).toFixed(2);
      break;
    default:
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
