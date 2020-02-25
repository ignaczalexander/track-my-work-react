const getPeriodsFromLocalStorage = () => {
  try {
    const periods = JSON.parse(localStorage.getItem("periods"));
    if (Array.isArray(periods)) {
      return periods;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
export default getPeriodsFromLocalStorage;
