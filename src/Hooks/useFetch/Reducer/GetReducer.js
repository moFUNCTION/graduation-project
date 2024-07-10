export const INITIAL_STATE = {
  loading: true,
  data: undefined,
  error: undefined,
};
export const GetReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        data: undefined,
        error: undefined,
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        data: action.payload,
        error: undefined,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        data: undefined,
        error: action.payload,
      };
  }
};
