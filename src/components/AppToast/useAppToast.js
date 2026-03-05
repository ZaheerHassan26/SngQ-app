import { useCallback, useContext } from 'react';
import { AppToastContext } from './context';

export const useAppToast = () => {
  const context = useContext(AppToastContext);

  const showError = useCallback(
    (message, autoHide = true) =>
      context.show({ message, type: 'error', autoHide }),
    [context]
  );

  const showWarning = useCallback(
    (message, autoHide = true) =>
      context.show({ message, type: 'warning', autoHide }),
    [context]
  );

  const showSuccess = useCallback(
    (message, autoHide = true) =>
      context.show({ message, type: 'success', autoHide }),
    [context]
  );

  return {
    showError,
    showWarning,
    showSuccess,
    hideAll: context.hideAll,
  };
};
