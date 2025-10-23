
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Myleink - Islamic-inspired color palette
// Emerald green represents Islam, gold for elegance, white for purity
export const colors = {
  background: '#F5F5F5',
  backgroundDark: '#1A1A1A',
  text: '#212121',
  textDark: '#FFFFFF',
  textSecondary: '#757575',
  textSecondaryDark: '#B0B0B0',
  primary: '#0D5C4D', // Deep emerald green - Islamic color
  primaryLight: '#10B981', // Lighter emerald
  secondary: '#D4AF37', // Gold - elegance and value
  accent: '#8B7355', // Bronze/copper
  card: '#FFFFFF',
  cardDark: '#2A2A2A',
  highlight: '#E8F5E9',
  highlightDark: '#1E3A32',
  border: '#E0E0E0',
  borderDark: '#404040',
  error: '#DC2626',
  success: '#10B981',
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.card,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
});
