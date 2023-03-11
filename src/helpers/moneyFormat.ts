const moneyFormat = (money: string) => {
  return money?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default moneyFormat;
