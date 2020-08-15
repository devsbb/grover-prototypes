import styles from './MixList.module.scss';
import flexStyles from './FlexList.module.scss';

export const MixList = ({ lineItems }) => (
  <section className={styles.list}>
    {lineItems.map((item) => (
      <div key={item.id} className={styles.item} />
    ))}
  </section>
);

export const FlexList = ({ lineItems }) => (
  <section className={flexStyles.list}>
    {lineItems.map((item) => (
      <div key={item.id} className={flexStyles.item} />
    ))}
  </section>
);
