export const HomeAddress = ({ data, send, sendUpdate }) => {
  console.log({ data });
  const { update } = sendUpdate('homeAddress', send);
  return (
    <div>
      HomeAddress
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send('submit', {
            value: { payload: data, entity: 'homeAddress', operation: 'add' },
          });
        }}
      >
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
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
