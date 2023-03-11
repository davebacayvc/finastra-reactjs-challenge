import axios from "axios";
import { useEffect, useState } from "react";
import ENDPOINTS from "../constants/endpoints";

export type CurrencyType = any;

const useGetCurrency = () => {
  const [currencies, setCurrencies] = useState<CurrencyType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(ENDPOINTS.CURRENCY_TYPE)
      .then((response) => {
        setCurrencies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return {
    currencies,
    loading,
  };
};

export default useGetCurrency;
