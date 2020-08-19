import { ScaffoldContainer } from '../brutalism/Scaffold';
import { CheckoutBase } from '../checkout/CheckoutBase';
import { createCheckoutMachine } from '../../flow/machine';
import { defaultOptions } from '../../flow/defaultOptions';
import { useDemoComponent } from './viewer/ComponentViewer';
import { useMemo } from 'react';
import { AuthGuard } from '../auth/AuthProvider';

export function CheckoutBlock({ name, withAuth, machine, heading }) {
  const { isActive, publishUpdates } = useDemoComponent({ name });
  if (!isActive) return null;
  const actions = defaultOptions.actions;
  const update = actions.update.assignment.order;
  const wrappedUpdate = useMemo(() => (ctx, event) => {
    publishUpdates({ name, isActive, output: event });
    const output = update(ctx, event);
    return output;
  });
  const options = {
    ...defaultOptions,
    actions: {
      ...actions,
      update: {
        ...actions.update,
        assignment: {
          ...actions.update.assignment,
          order: wrappedUpdate,
        },
      },
    },
  };
  const checkout = createCheckoutMachine({ ...machine, options });

  return (
    <ScaffoldContainer>
      <Wrapper withAuth={withAuth}>
        <CheckoutBase checkout={checkout}>
          <h2>{heading}</h2>
        </CheckoutBase>
      </Wrapper>
    </ScaffoldContainer>
  );
}

const Wrapper = ({ withAuth, children }) =>
  withAuth ? <AuthGuard>{children}</AuthGuard> : children;
