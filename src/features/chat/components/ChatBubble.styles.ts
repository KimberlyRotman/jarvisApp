import { AppColors } from '@src/shared/utils/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 4,
    paddingLeft: 48,
  },
  aiRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 4,
    paddingRight: 48,
  },
  userBubble: {
    backgroundColor: AppColors.userBubble,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '85%',
  },
  aiBubble: {
    backgroundColor: AppColors.aiBubble,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '85%',
    borderWidth: 1,
    borderColor: AppColors.grayLight,
  },
  userText: {
    color: AppColors.accentYellow,
    fontSize: 15,
    lineHeight: 20,
  },
  aiText: {
    color: AppColors.white,
    fontSize: 15,
    lineHeight: 20,
  },
});
