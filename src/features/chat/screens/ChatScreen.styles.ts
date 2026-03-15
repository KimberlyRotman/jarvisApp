import { AppColors } from '@src/shared/utils/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgroundPrimary,
  },
  backgroundImage: {
    opacity: 0.06,
    resizeMode: 'repeat',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: AppColors.backgroundSecondary,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    width: 26,
    height: 26,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: AppColors.accentYellow,
    marginLeft: 16,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  messagesContent: {
    paddingBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: AppColors.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  textInput: {
    flex: 1,
    minHeight: 42,
    maxHeight: 120,
    backgroundColor: AppColors.inputBackground,
    borderRadius: 21,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: AppColors.white,
    fontSize: 15,
    borderWidth: 1,
    borderColor: AppColors.grayLight,
  },
  sendButton: {
    marginLeft: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: AppColors.accentYellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  sendIcon: {
    fontSize: 20,
    color: AppColors.backgroundPrimary,
  },
});
