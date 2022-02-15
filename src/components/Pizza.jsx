import React from 'react';

export function Pizza({party}) {
  const eatsPizza = party.filter(members => members.eatsPizza);
  const deg = (360 / eatsPizza.length);
  let lines = [];

  const createSlice = () => {
    let res = 0
    eatsPizza.forEach(() => {
      lines.push(res += deg)
    })
  }
  createSlice();

  return (
        <div className="circle">
          {lines.map(el => <div key={el} className='line' style={{transform: `rotate(${el}deg)`}}> </div>)}
        </div>
  );
}

