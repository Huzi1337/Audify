const BASE_DELAY = 5000;
const MAX_RETRIES = 5;

export const fetchSpotify = async (props, callback, tryCount = 0) => {
  try {
    return await callback(props);
  } catch (error) {
    console.error("Error:", error.message);

    if (error.message === "Too many requests" && tryCount < MAX_RETRIES) {
      let delay = BASE_DELAY * Math.pow(BASE_DELAY, tryCount);
      return new Promise((resolve) => {
        setTimeout(async () => {
          console.log("Retrying...");
          let result = await fetchSpotify(props, callback, tryCount + 1);
          resolve(result);
        }, delay);
      });
    }
  }
};
