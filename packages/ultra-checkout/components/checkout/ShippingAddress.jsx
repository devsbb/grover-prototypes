export const ShippingAddress = ({ data, send, sendUpdate }) => {
  const { update } = sendUpdate('shippingAddress', send);
  return (
    <div>
      ShippingAddress
      <form onSubmit={() => send('STEP_CHANGE')}>
        <label htmlFor="city">
          City
          <input
            id="city"
            name="city"
            value={data.city || ''}
            onChange={(e) => update('city', e)}
          />
        </label>
        <label htmlFor="line1">
          Street
          <input
            id="line1"
            name="line1"
            value={data.line1 || ''}
            onChange={(e) => update('line1', e)}
          />
        </label>
      </form>
    </div>
  );
};
