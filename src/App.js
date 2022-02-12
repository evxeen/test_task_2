import './App.css';
import {useState} from "react";

import {Table} from "./components/Table";

import {CURRENCY_API, DIETS_API, GUESTS_API, ORDER_API} from "./config";

function App() {
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetched = async () => {
    const guestsResponse = await fetch(GUESTS_API);
    const guestsData = await guestsResponse.json();
    const dietsResponse = await fetch(DIETS_API);
    const dietsData = await dietsResponse.json();

    const [one, two] = await Promise.all(
        [fetch(ORDER_API).then(res => res.json()),
      fetch(CURRENCY_API).then(res => res.json())]);

    setMessage(false);
    setIsLoading(false);
    console.log(guestsData);
    console.log(dietsData);

    console.log(one);
    console.log(two);
  }

  const showLoading = () => {
    setMessage(true);
    fetched();
  }
  return (
    <div className="App">
      <button className='load' onClick={showLoading}>Loading</button>
      {message ? <h2>Load...</h2> : null}
      {isLoading ? null: <Table /> }
    </div>
  );
}

export default App;
