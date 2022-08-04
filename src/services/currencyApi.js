const getCurrency = async () => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endPoint);
  const currencies = await response.json();
  // return currencies;
  // console.log(Promise.reject(currencies));
  return response.ok ? Promise.resolve(currencies) : Promise.reject(currencies);
};

export default getCurrency;
