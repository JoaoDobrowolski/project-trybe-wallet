export default function toRound(num) { // https://www.delftstack.com/pt/howto/javascript/javascript-round-to-2-decimal-places/#:~:text=decimais%20em%20JavaScript.-,Use%20o%20m%C3%A9todo%20.,ap%C3%B3s%20o%20decimal%20como%20argumento.
  const quinze = 15;
  const centezimo = 0.01;
  const aux = Number((Math.abs(num) * 100).toPrecision(quinze)); // OBS: (Math.round(number + 'e+2') + 'e-2') não é permitido devido ao lint
  return (Math.round(aux) * centezimo * Math.sign(aux));
}
