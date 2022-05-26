const formatNumber = (str) => {
  let num = Number(str).toFixed(2);
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
};

export default formatNumber;
