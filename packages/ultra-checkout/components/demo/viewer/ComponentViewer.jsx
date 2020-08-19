import styles from './Terminal.module.scss';
import { Terminal } from './Terminal';
import { useContext } from 'react';
import { DemoContext, DemoProvider } from './DemoContext';
import { TerminalContext, TerminalProvider } from './TerminalContext';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} />
);

const ComponentPicker = () => {
  const { components, toggleComponents } = useDemo();
  return (
    <ul className={styles.selector}>
      {components.map((option) => (
        <li key={option.name}>
          <Checkbox {...option} onChange={toggleComponents} />
        </li>
      ))}
    </ul>
  );
};

const ComponentViewer = ({ children, initialMode, enableTerminal }) => {
  return (
    <div className={styles.container}>
      {enableTerminal && <Terminal />}
      <div
        className={[
          styles.viewer,
          ...(initialMode ? [styles[initialMode]] : []),
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
};

export const DemoView = ({ className, components, ...props }) => {
  return (
    <div className={className}>
      <DemoProvider>
        <TerminalProvider>
          <ComponentPicker />
          <ComponentViewer initialMode="grid-4-4" enableTerminal {...props} />
        </TerminalProvider>
      </DemoProvider>
    </div>
  );
};

export const useDemo = () => {
  const { components, toggleComponents } = useContext(DemoContext);
  const { content, updateContent } = useContext(TerminalContext);

  return {
    components,
    toggleComponents,
    content,
    updateContent,
  };
};

export const useDemoComponent = ({ name }) => {
  const { components } = useContext(DemoContext);
  const { updateContent } = useContext(TerminalContext);
  const isActive =
    components.find((component) => component.name === name)?.isActive ?? false;

  return {
    isActive,
    publishUpdates: updateContent,
  };
};
