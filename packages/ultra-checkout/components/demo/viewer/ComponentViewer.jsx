import styles from './Terminal.module.scss';
import { Terminal } from './Terminal';
import { useContext } from 'react';
import { DemoContext, DemoProvider } from './DemoContext';
import { TerminalContext, TerminalProvider } from './TerminalContext';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <label htmlFor={name}>
    {name}
    <input type={type} name={name} checked={checked} onChange={onChange} />
  </label>
);

const ComponentPicker = () => {
  const { components, toggleComponents, toggleOutput } = useDemo();
  const onChange = (e) => {
    toggleComponents({ name: e.target.name });
    toggleOutput({ name: e.target.name, isActive: e.target.value });
  };
  return (
    <ul className={styles.selector}>
      {components.map((option) => (
        <li key={option.name}>
          <Checkbox {...option} checked={option.isActive} onChange={onChange} />
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
  const { content, updateContent, toggleOutput } = useContext(TerminalContext);

  return {
    components,
    toggleComponents,
    content,
    updateContent,
    toggleOutput,
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