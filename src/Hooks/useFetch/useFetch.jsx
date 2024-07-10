import React, { useCallback, useEffect, useReducer } from "react";
import { GetReducer, INITIAL_STATE } from "./Reducer/GetReducer";
import axios from "axios";

export const useFetch = ({
  endpoint,
  method = "GET",
  bodyParams = null,
  headers,
  config = {},
}) => {
  const [data, dispatch] = useReducer(GetReducer, INITIAL_STATE);
  const getData = useCallback(async () => {
    try {
      dispatch({
        type: "FETCH_START",
      });
      const res = await axios({
        url: endpoint,
        method,
        data: bodyParams,
        headers: headers,
      });
      dispatch({
        type: "FETCH_SUCCESS",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "FETCH_ERROR",
        payload: err,
      });
    }
  }, [endpoint, JSON.stringify(bodyParams), JSON.stringify(config)]);
  const HandleRender = () => {
    getData();
  };
  useEffect(() => {
    getData();
  }, [getData]);
  return { ...data, HandleRender };
};
