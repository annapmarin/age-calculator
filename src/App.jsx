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
      if (actualMonth < month) {
        console.log(actualMonth + ' es menor que ' + month)
        switch (month) {
          case 1:
            setCalcMonth(0);
            break;
          case 2:
            setCalcMonth(11 - actualMonth);
            break;
          case 3:
            setCalcMonth(10 + actualMonth);
            break;
          case 4:
            setCalcMonth(9 + actualMonth - 2);
            break;
          case 5:
            setCalcMonth(8 + actualMonth - 2);
            break;
          case 6:
            setCalcMonth(7 + actualMonth - 2);
            break;
          case 7:
            setCalcMonth(6 + actualMonth - 2);
            break;
          case 8:
            setCalcMonth(5 + actualMonth - 2);
            break;
          case 9:
            setCalcMonth(4 + actualMonth - 2);
            break;
          case 10:
            setCalcMonth(3 + actualMonth - 2);
            break;
          case 11:
            setCalcMonth(2 + actualMonth - 2);
            break;
          case 12:
            setCalcMonth(1 + actualMonth - 2);
            break;
        }
      } else if (actualMonth > month) {
        if(actualMonth - month - 1 === 0) {
          setCalcMonth("--");
        } else {
          setCalcMonth(actualMonth - month - 1);
        }
      } else if (actualMonth === month) {
        setCalcMonth("--");
      } 
    }
    // calc day
    if (actualDay < day) {
      if (
        month === 1 ||
        month === 3 ||
        month === 5 ||
        month === 7 ||
        month === 8 ||
        month === 10 ||
        month === 12
      ) {
        setCalcDay(31 - day + actualDay);
      } else if (month === 2 && year % 4 === 0) {
        setCalcDay(29 - day + actualDay);
      } else if (month === 2 && year % 4 !== 0) {
        setCalcDay(28 - day + actualDay);
      } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        setCalcDay(30 - day + actualDay);
      }
    } else if (actualDay > day) {
      setCalcDay(actualDay - day);
    } else if (actualDay === day) {
      setCalcDay("--");
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
