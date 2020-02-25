export default {
  SIZE_SM: 576,
  SIZE_MD: 768,
  SIZE_LG: 992,
  SIZE_XL: 1200,
  API_URL:
    process.env.NODE_ENV === 'production'
      ? "https://track-my-work-server.herokuapp.com"
      : `http://localhost:5000`
};
