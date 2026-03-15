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
    marginLeft: 12,
  },
  addHeaderButton: {
    padding: 8,
  },
  addHeaderIcon: {
    width: 24,
    height: 24,
  },
  card: {
    backgroundColor: AppColors.accentDark,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3600',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
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
    fontSize: 14,
    fontWeight: '700',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#b4b4b4',
    fontSize: 16,
    fontFamily: 'Arimo_700Bold',
  },
  cardTitleDone: {
    textDecorationLine: 'line-through',
    color: AppColors.gray,
  },
  cardDate: {
    color: AppColors.gray,
    fontSize: 12,
    marginTop: 4,
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
