import { AppColors } from '@src/shared/utils/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgroundSecondary,
  },
  topSection: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginRight: 14,
  },
  menuText: {
    color: AppColors.accentYellow,
    fontSize: 17,
    fontWeight: '600',
  },
  sectionTitle: {
    color: AppColors.gray,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
    letterSpacing: 1,
  },
  listMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    paddingLeft: 36,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  listMenuText: {
    color: AppColors.white,
    fontSize: 16,
  },
  listDeleteBtn: {
    padding: 4,
  },
  listDeleteIcon: {
    width: 16,
    height: 16,
  },
  addListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    paddingLeft: 36,
  },
  addListIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  addListText: {
    color: AppColors.accentYellow,
    fontSize: 15,
    fontWeight: '500',
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    padding: 20,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  chatButtonIcon: {
    width: 120,
    height: 120,
  },
  newListInput: {
    height: 38,
    backgroundColor: '#333',
    borderRadius: 19,
    paddingHorizontal: 14,
    color: AppColors.white,
    fontSize: 14,
    marginHorizontal: 20,
    marginBottom: 8,
  },
});
