import "./styles/index.css";
import iconArrow from "./assets/images/icon-arrow.svg";
import { useEffect, useState } from "react";

/*
  TODO 
  ( ) condicionales si el día añadido no existe (ej. 31 de febrero)
  ( ) añadir estilos de error si la fecha no es válida (tanto día según mes, número de mes o año)
  ( ) el botón se pulsa si se aprieta 'Enter' (creo que OnKeyDown necesita un onChange)

*/

function App() {
  const [day, setDay] = useState("--");
  const [month, setMonth] = useState("--");
  const [year, setYear] = useState("--");
  const [calcYear, setCalcYear] = useState("--");
  const [calcMonth, setCalcMonth] = useState("--");
  const [calcDay, setCalcDay] = useState("--");

  const date = new Date();
  const actualYear = date.getFullYear();
  const actualMonth = date.getMonth() + 1;
  const actualDay = date.getDate();

  const handleDay = (event) => {
    if (Number(event.target.value) > 0 && Number(event.target.value) < 32) {
      setDay(Number(event.target.value));
    }
  };

  const handleMonth = (event) => {
    if (Number(event.target.value) > 0 && Number(event.target.value) < 13) {
      setMonth(Number(event.target.value));
    }
  };

  const handleYear = (event) => {
    if (
      Number(event.target.value) > 1900 &&
      Number(event.target.value) <= actualYear
    ) {
      setYear(Number(event.target.value));
    }
  };

  const calculator = () => {
    // calc year
    if (year > 1900 && year <= actualYear) {
      if (actualMonth < month) {
        setCalcYear(actualYear - year - 1);
      } else if (actualMonth > month) {
        setCalcYear(actualYear - year);
      } else if (actualMonth === month) {
        if (actualDay < day) {
          setCalcYear(actualYear - year - 1);
        } else if (actualDay >= day) {
          setCalcYear(actualYear - year);
        }
      }
    }

    // calc month
    if (month > 0 && month < 13) {
      if (actualMonth < month && actualDay >= day) {
        setCalcMonth(12 - month + actualMonth);
      } else if (actualMonth <= month && actualDay < day) {
        setCalcMonth(11 - month + actualMonth);
      } else if (actualMonth >= month && actualDay >= day) {
        setCalcMonth(actualMonth - month);
      } else if (actualMonth > month && actualDay < day) {
        setCalcMonth(actualMonth - month - 1);
      }
    }

    // calc day
    if (day > 0 && day < 32) {
      if (
        actualDay < day && actualMonth === 1 ||
        actualDay < day && actualMonth === 2 ||
        actualDay < day && actualMonth === 4 ||
        actualDay < day && actualMonth === 6 ||
        actualDay < day && actualMonth === 8 ||
        actualDay < day && actualMonth === 9 ||
        actualDay < day && actualMonth === 11
      ) {
        // console.log(actualDay + ' es menor que ' + day + ' mes de 31 días')
        setCalcDay(31 - day + actualDay);
      } else if (
        actualDay < day && actualMonth === 5 ||
        actualDay < day && actualMonth === 7 ||
        actualDay < day && actualMonth === 10 ||
        actualDay < day && actualMonth === 12
      ) {
        // console.log(actualDay + ' es menor que ' + day + ' mes de 30 días')
        setCalcDay(30 - day + actualDay);
      } else if (actualDay < day && actualMonth === 3 && actualYear % 4 === 0) {
        // console.log(actualDay + ' es menor que ' + day + 'bisiesto')
        setCalcDay(29 - day + actualDay);
      } else if (actualDay < day && actualMonth === 3 && actualYear % 4 !== 0) {
        // console.log(actualDay + ' es menor que ' + day + 'no bisiesto')
        setCalcDay(28 - day + actualDay);
      } else if (actualDay > day) {
        // console.log(actualDay + ' es menor que ' + day)
        setCalcDay(actualDay - day);
      } else if (actualDay === day) {
        // console.log(actualDay + ' es igual que ' + day)
        setCalcDay("--");
      }
    }
  };

  return (
    <main className="container">
      <section>
        <div className="container__labels">
          <p>day</p>
          <p>month</p>
          <p>year</p>
        </div>
        <div className="container__inputs">
          <input onBlur={handleDay} placeholder="DD" />
          <input onBlur={handleMonth} placeholder="MM" />
          <input onBlur={handleYear} placeholder="YYYY" />
        </div>
        <span className="error-invalid-date">{}</span>
      </section>
      <div>
        <hr className="container__separator" />
        <button onClick={calculator} className="container__separator__button">
          <img src={iconArrow} className="container__separator__image" />
        </button>
      </div>
      <section className="container__data">
        <p>
          <span>{calcYear}</span> years
        </p>
        <p>
          <span>{calcMonth}</span> {calcMonth === 1 ? "month" : "months"}
        </p>
        <p>
          <span>{calcDay}</span> {calcDay === 1 ? "day" : "days"}
        </p>
      </section>
    </main>
  );
}

export default App;
