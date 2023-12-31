import HttpError from "../models/HttpError.js";
import RequestRetryHandler from "../models/RequestRetryHandler.js";

export const fetchSpotify = async (
  fetchFn: () => Promise<any>,
  tryCount = 0
): Promise<any> => {
  try {
    return await fetchFn();
  } catch (error) {
    console.log("Error:", (error as HttpError).message);

    return new RequestRetryHandler({
      tryCount,
      error: error as HttpError,
      fetchFn: () => fetchSpotify(fetchFn, tryCount + 1),
    }).retryRequest();
  }
};
