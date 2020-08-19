import styles from './Terminal.module.scss';
import { useContext } from 'react';
import { TerminalContext } from './TerminalContext';

interface Context {
  content: {
    [key: string]: any;
  };
}
export const Terminal = () => {
  const { content }: Context = useContext(TerminalContext);
  console.log({ content });
  return (
    <div className={styles.terminal}>
      <pre className={styles.terminal}>{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
};
