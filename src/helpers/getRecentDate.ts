const getRecentDate = (arrayDate: any) => {
  arrayDate
    .map(function (e: any) {
      return e.MeasureDate;
    })
    .sort()
    .reverse()[0];
};

export default getRecentDate;
