import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
  }

});
