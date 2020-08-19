import styles from './Terminal.module.scss';
import { useContext } from 'react';
import { TerminalContext } from './TerminalContext';

interface Context {
  content: {
    [key: string]: {
      isActive: boolean;
      output: Array<any>;
    };
  };
}
export const Terminal = () => {
  const { content }: Context = useContext(TerminalContext);
  const formatted = [...Object.entries(content)].reduce((acc, [key, val]) => {
    return val.isActive && val.output
      ? { ...acc, [key]: val.output.slice().pop() }
      : { ...acc };
  }, {});
  return (
    <div className={styles.terminal}>
      <pre className={styles.bash}>{JSON.stringify(formatted, null, 2)}</pre>
    </div>
  );
};
