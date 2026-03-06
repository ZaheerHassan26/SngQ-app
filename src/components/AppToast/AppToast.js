import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppToastContext } from './context';
import { useAppToastProvider } from './useAppToastProvider';

const COLORS = {
  error: { bg: '#E8F5E9', border: '#c62828', text: '#b71c1c' },
  warning: { bg: '#FFF8E1', border: '#f9a825', text: '#f57f17' },
  success: { bg: '#E8F5E9', border: '#2e7d32', text: '#1b5e20' },
};

export const AppToastProvider = ({ children }) => {
  const insets = useSafeAreaInsets();
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
        <View style={[styles.container, { top: insets.top || 12 }]} pointerEvents="box-none">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={value.hideAll}
            style={[styles.bar, { backgroundColor: styleForType.bg, borderLeftColor: styleForType.border }]}
          >
            <Text style={[styles.message, { color: styleForType.text }]} numberOfLines={2}>
              {messageText}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </AppToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
  },
  bar: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderLeftWidth: 4,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
  },
});
