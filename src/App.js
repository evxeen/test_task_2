import './App.css';
import {useState} from "react";

import {Table} from "./components/Table";

import {CURRENCY_API, DIETS_API, GUESTS_API, ORDER_API} from "./config";
import {getVegans} from "./helpers";

function App() {
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetched = async () => {
    const guestsResponse = await fetch(GUESTS_API);
    const guestsData = await guestsResponse.json();
    const dietsResponse = await fetch(`${DIETS_API}${getVegans(guestsData)}`);
    const dietsData = await dietsResponse.json();

    const whoEats =  guestsData.party.filter(eat => eat.eatsPizza).length;
    const checkoutVegans = dietsData.diet.filter(vegan => vegan.isVegan).length;
    const percentVegans = Math.floor((checkoutVegans / dietsData.diet.length) * 100);

    const [order, currency] = await Promise.all(
        [fetch(`${ORDER_API}${percentVegans > 51 ? 'vegan' : 'meat'}/${whoEats}`).then(res => res.json()),
      fetch(CURRENCY_API).then(res => res.json())]);

    setMessage(false);
    setIsLoading(false);
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
