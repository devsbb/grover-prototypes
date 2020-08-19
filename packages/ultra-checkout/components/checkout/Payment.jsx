import { useState, useCallback } from 'react';

export const Payment = ({ data, send, sendUpdate }) => {
  //const { update } = sendUpdate('payment', send);
  const [card, setCard] = useState({});

  const setCardData = useCallback(
    (name, value) =>
      setCard((prev) => ({
        ...prev,
        [name]: value,
      })),
    [setCard]
  );
  return (
    <div>
      Payment Method
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send('SUBMIT', {
            value: {
              payload: card,
              entity: 'paymentMethod',
              operation: 'add',
            },
          });
        }}
      >
        <label htmlFor="number">
          Card Number
          <input
            id="number"
            name="number"
            value={card.number || ''}
            onChange={(e) => setCardData('number', e.target.value)}
          />
        </label>
        <label htmlFor="cvv">
          CVV
          <input
            id="cvv"
            name="cvv"
            value={card.cvv || ''}
            onChange={(e) => setCardData('cvv', e.target.value)}
          />
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
