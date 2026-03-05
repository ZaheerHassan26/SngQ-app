import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { AppToastContext } from './context';
import { useAppToastProvider } from './useAppToastProvider';

const COLORS = {
  error: { bg: '#c0392b', icon: '✕' },
  warning: { bg: '#f39c12', icon: '!' },
  success: { bg: '#27ae60', icon: '✓' },
};

export const AppToastProvider = ({ children }) => {
  const { value, toast } = useAppToastProvider();

  const messageText =
    typeof toast?.message === 'string'
      ? toast.message
      : toast?.message != null
        ? String(toast.message)
        : '';

  const styleForType = toast ? COLORS[toast.type] || COLORS.error : null;

  return (
    <AppToastContext.Provider value={value}>
      {children}
      {toast && styleForType && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={value.hideAll}
          style={styles.overlay}
        >
          <View style={[styles.box, { backgroundColor: styleForType.bg }]}>
            <Text style={styles.icon}>{styleForType.icon}</Text>
            <Text style={styles.message} numberOfLines={3}>
              {messageText}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </AppToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  box: {
    minWidth: 200,
    maxWidth: 280,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  icon: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
});
