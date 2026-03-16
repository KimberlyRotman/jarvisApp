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
  monthSection: {
    marginTop: 16,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  monthTitle: {
    color: AppColors.accentYellow,
    fontSize: 18,
    fontWeight: '700',
  },
  dropdownArrow: {
    color: AppColors.accentYellow,
    fontSize: 18,
    fontWeight: '700',
  },
  card: {
    backgroundColor: AppColors.accentDark,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3600',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#b4b4b4',
    fontSize: 16,
    fontFamily: 'Arimo_700Bold',
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
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: AppColors.backgroundSecondary,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: AppColors.accentYellow,
  },
  modalTitle: {
    color: AppColors.accentYellow,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    height: 44,
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 16,
    color: AppColors.white,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: AppColors.grayLight,
  },
  modalRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modalInputHalf: {
    flex: 1,
    height: 44,
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 16,
    color: AppColors.white,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: AppColors.grayLight,
  },
  pickerLabel: {
    color: AppColors.accentYellow,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 4,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 16,
  },
  pickerColumn: {
    alignItems: 'center',
  },
  pickerColumnLabel: {
    color: AppColors.gray,
    fontSize: 12,
    marginBottom: 4,
  },
  pickerSeparator: {
    color: AppColors.white,
    fontSize: 24,
    fontWeight: '700',
    paddingBottom: 45,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modalCancel: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.grayLight,
  },
  modalCancelText: {
    color: AppColors.gray,
    fontSize: 16,
    fontWeight: '600',
  },
  modalConfirm: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
    borderRadius: 10,
    backgroundColor: AppColors.accentYellow,
  },
  modalConfirmText: {
    color: AppColors.backgroundPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});
