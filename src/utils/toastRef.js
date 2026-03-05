/**
 * Ref so non-React code (Apis, apiClient) can show AppToast.
 * Set by ToastRefSetter inside AppToastProvider.
 */
let toastRef = null;

export function setToastRef(ref) {
  toastRef = ref;
}

export function getToastRef() {
  return toastRef;
}
