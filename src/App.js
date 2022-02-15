import './App.css';
import {useState} from "react";

import {Table} from "./components/Table";
import {Pizza} from "./components/Pizza";

import {CURRENCY_API, DIETS_API, GUESTS_API, ORDER_API} from "./config";
import {changeStrings, getData, getPizza} from "./helpers";

function App() {
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetched = async () => {
    const { party } = await getData(GUESTS_API);
    const { diet } = await getData(DIETS_API, changeStrings(party));

    const [order, currency] = await Promise.all(
        [getData(ORDER_API, getPizza(diet)),
          getData(CURRENCY_API)]);

    setData(party);
    setMessage(false);
    setIsLoading(false);
  }

  const showLoading = () => {
    setMessage(true);
    fetched();
  }
  return (
    <div className="App">
      <header className='header'>
        <button className='load' onClick={showLoading}>Loading</button>
        {message ? <h2>Load...</h2> : null}
      </header>
      <div className='content'>
        {isLoading ? null: <Table />}
        {data.length ? <Pizza party={data}/> : null}
      </div>
    </div>
  );
}

export default App;