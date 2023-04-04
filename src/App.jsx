import "./styles/index.css";
import iconArrow from "./assets/images/icon-arrow.svg";
import { useState } from "react";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [calcYear, setCalcYear] = useState("--");
  const [calcMonth, setCalcMonth] = useState("--");
  const [calcDay, setCalcDay] = useState("--");

  // error states
  const [errorInvalidDate, setErrorInvalidDate] = useState(false);
  const [errorVoidDay, setErrorVoidDay] = useState(false);
  const [errorVoidMonth, setErrorVoidMonth] = useState(false);
  const [errorVoidYear, setErrorVoidYear] = useState(false);
  const [errorInvalidDay, setErrorInvalidDay] = useState(false);
  const [errorInvalidMonth, setErrorInvalidMonth] = useState(false);
  const [errorInvalidYear, setErrorInvalidYear] = useState(false);

  const date = new Date();
  const actualYear = date.getFullYear();
  const actualMonth = date.getMonth() + 1;
  const actualDay = date.getDate();

  const handleDay = (event) => {
    if (Number(event.target.value) < 32) {
      setDay(Number(event.target.value));
      setErrorInvalidDay(false);
      setErrorVoidDay(false);
    } else if (
      Number(event.target.value) >= 32 ||
      event.target.value.match(/[a-zA-Z]/)
    ) {
      setErrorInvalidDay(true);
    }
  };

  const handleMonth = (event) => {
    if (Number(event.target.value) < 13) {
      setMonth(Number(event.target.value));
      setErrorInvalidMonth(false);
      setErrorVoidMonth(false);
    } else if (
      Number(event.target.value) >= 13 ||
      event.target.value.match(/[a-zA-Z]/)
    ) {
      setErrorInvalidMonth(true);
    }
  };

  const handleYear = (event) => {
    if (
      Number(event.target.value) <= actualYear
    ) {
      setYear(Number(event.target.value));
      setErrorInvalidYear(false);
      setErrorVoidYear(false);
    } else if (Number(event.target.value) > actualYear) {
      setErrorInvalidYear(true);
    }
  };

  const calculator = () => {
    // check if the inputs are void
    if (day === '' || day === 0) {
      setErrorVoidDay(true);
    } else if (month === '' || month === 0) {
      setErrorVoidMonth(true);
    } else if (year === '' || year === 0) {
      setErrorVoidYear(true);
    }

    // calc year
    if (year <= actualYear) {
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
        (actualDay < day && actualMonth === 1) ||
        (actualDay < day && actualMonth === 2) ||
        (actualDay < day && actualMonth === 4) ||
        (actualDay < day && actualMonth === 6) ||
        (actualDay < day && actualMonth === 8) ||
        (actualDay < day && actualMonth === 9) ||
        (actualDay < day && actualMonth === 11)
      ) {
        // console.log(actualDay + ' es menor que ' + day + ' mes de 31 días')
        setCalcDay(31 - day + actualDay);
      } else if (
        (actualDay < day && actualMonth === 5) ||
        (actualDay < day && actualMonth === 7) ||
        (actualDay < day && actualMonth === 10) ||
        (actualDay < day && actualMonth === 12)
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
            <p
              className={`${
                errorInvalidDay ? "error-invalid-date__label-day" : (errorVoidDay ? "error-invalid-date__label-day" : "")
              }`}
            >
              day
            </p>
            <p
              className={`${
                errorInvalidMonth ? "error-invalid-date__label-month" : (errorInvalidMonth ? "error-invalid-date__label-month" : "")
              }`}
            >
              month
            </p>
            <p
              className={`${
                errorInvalidYear ? "error-invalid-date__label-year" : (errorVoidYear ? "error-invalid-date__label-year" : "")
              }`}
            >
              year
            </p>
          </div>
          <div className="container__inputs">
            <input
              className={`${
                errorInvalidDate ? "error-invalid-date__input-day" : (errorVoidDay ? "error-invalid-date__input-day" : "")
              }`}
              onChange={handleDay}
              onBlur={handleDay}
              placeholder="DD"
            />
            <input
              className={`${
                errorInvalidDate ? "error-invalid-date__input-month" : (errorInvalidMonth ? "error-invalid-date__input-month" : "")
              }`}
              onChange={handleMonth}
              onBlur={handleMonth}
              placeholder="MM"
              // onKeyDown={handleKeyDown}
            />
            <input
              className={`${
                errorInvalidDate ? "error-invalid-date__input-year" : (errorVoidYear ? "error-invalid-date__input-year" : "")
              }`}
              onChange={handleYear}
              onBlur={handleYear}
              placeholder="YYYY"
              //onKeyDown={handleKeyDown}
            />
          </div>
          <span
            className={`${
              errorInvalidDay
                ? "error-invalid-date__day"
                : (errorVoidDay 
                  ? "error-invalid-date__day"
                  : "error-invalid-date-disabled")
            }`}
          >
            {errorInvalidDay
              ? "Must be a valid day"
              : errorVoidDay
              ? "This field is required"
              : ""}
          </span>
          <span
            className={`${
              errorInvalidMonth
                ? "error-invalid-date__month"
                : (errorVoidMonth
                  ? "error-invalid-date__month"
                  : "error-invalid-date-disabled")
            }`}
          >
            {errorInvalidMonth
              ? "Must be a valid month"
              : errorVoidMonth
              ? "This field is required"
              : ""}
          </span>
          <span
            className={`${
              errorInvalidYear
                ? "error-invalid-date__year"
                : (errorVoidYear 
                  ? "error-invalid-date__year" 
                  : "error-invalid-date-disabled") 
            }`}
          >
            {errorInvalidYear
              ? "Must be in the past"
              : errorVoidYear
              ? "This field is required"
              : ""}
          </span>
          <span
            className={`${
              errorInvalidDate
                ? "error-invalid-date__day"
                : "error-invalid-date-disabled"
            }`}
          >
            Must be a valid date
          </span>
        </section>
        <div>
          <hr className="container__separator" />
          <button onClick={calculator} className="container__separator__button">
            <img src={iconArrow} className="container__separator__image" />
          </button>
        </div>
        <section className="container__data">
          <p>
            <span>{calcYear}</span> {calcYear === 1 ? "year" : "years"}
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
