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
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: AppColors.accentYellow,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxDone: {
    backgroundColor: AppColors.accentYellow,
  },
  checkMark: {
    color: AppColors.backgroundPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    color: AppColors.white,
    fontSize: 16,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: AppColors.gray,
  },
  taskDate: {
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: AppColors.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: '#333',
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
