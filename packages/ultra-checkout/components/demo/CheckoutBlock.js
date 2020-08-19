import { ScaffoldContainer } from '../brutalism/Scaffold';
import { CheckoutBase } from '../checkout/CheckoutBase';
import { createCheckoutMachine } from '../../flow/machine';
import { getDefaultOptions } from '../../flow/defaultOptions';
import { useDemoComponent } from './viewer/ComponentViewer';
import { useMemo } from 'react';
import { AuthGuard } from '../auth/AuthProvider';

export function CheckoutBlock({ name, withAuth, machine, api, heading }) {
  const { isActive, publishUpdates } = useDemoComponent({ name });
  if (!isActive) return null;
  const defaultOptions = getDefaultOptions(api);
  const actions = defaultOptions.actions;
  const services = defaultOptions.services;
  const update = actions.update.assignment.order;
  const { genericHandler } = services;
  const wrappedUpdate = useMemo(() => (ctx, event) => {
    publishUpdates({ name, isActive, output: event });
    const output = update(ctx, event);
    return output;
  });
  const wrappedHandler = useMemo(() => (ctx, event) => {
    publishUpdates({ name, isActive, output: event });
    return genericHandler(ctx, event);
  });
  const options = {
    ...defaultOptions,
    services: {
      ...services,
      genericHandler: wrappedHandler,
    },
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
  const checkout = createCheckoutMachine({ ...machine, api, options });

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
