import { createNavigationContainerRef } from '@react-navigation/native';

/**
 * Ref for the root NavigationContainer. Use for dispatching reset/navigate
 * from outside the navigation tree (e.g. after logout).
 */
export const navigationRef = createNavigationContainerRef();
