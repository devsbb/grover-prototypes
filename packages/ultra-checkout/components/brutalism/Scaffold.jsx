import styles from './Scaffold.module.scss';

export const ScaffoldContainer = (props) => (
  <section className={styles.container} {...props} />
);

export const ScaffoldBlinker = (props) => (
  <section className={styles.blinker} {...props} />
);
