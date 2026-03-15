import { AppColors } from '@src/shared/utils/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgroundPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: AppColors.backgroundSecondary,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: AppColors.accentYellow,
    fontSize: 24,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: AppColors.accentYellow,
    marginLeft: 12,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  dateBadge: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: AppColors.accentDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  dateDay: {
    color: AppColors.accentYellow,
    fontSize: 18,
    fontWeight: '700',
  },
  dateMonth: {
    color: AppColors.accentYellow,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    color: AppColors.white,
    fontSize: 16,
  },
  eventTime: {
    color: AppColors.gray,
    fontSize: 12,
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  emptyText: {
    color: AppColors.gray,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: AppColors.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: AppColors.inputBackground,
    borderRadius: 21,
    paddingHorizontal: 16,
    color: AppColors.white,
    fontSize: 15,
    borderWidth: 1,
    borderColor: AppColors.grayLight,
  },
  inputSmall: {
    flex: 1,
    height: 42,
    backgroundColor: AppColors.inputBackground,
    borderRadius: 21,
    paddingHorizontal: 16,
    color: AppColors.white,
    fontSize: 15,
    borderWidth: 1,
    borderColor: AppColors.grayLight,
    marginRight: 8,
  },
  addButton: {
    marginLeft: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: AppColors.accentYellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: AppColors.backgroundPrimary,
    fontWeight: '700',
  },
});
