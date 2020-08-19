export const HomeAddress = ({ data, send, sendUpdate }) => {
  const { update } = sendUpdate('homeAddress', send);
  return (
    <div>
      HomeAddress
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send('SUBMIT', {
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
        <label htmlFor="line2">
          Line2/Address2
          <input
            id="line2"
            name="line2"
            value={data.line2 || ''}
            onChange={(e) => update('line2', e)}
          />
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
