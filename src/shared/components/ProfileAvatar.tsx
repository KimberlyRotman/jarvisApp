import { AuthContext } from '@src/features/auth/store/authContext';
import { AppColors } from '@src/shared/utils/colors';
import React, { useContext, useState } from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ProfileAvatar() {
  const { user, signOut } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} style={s.avatarBtn}>
        {user?.photo ? (
          <Image source={{ uri: user.photo }} style={s.avatar} />
        ) : (
          <View style={s.avatarFallback}>
            <Text style={s.avatarLetter}>
              {user?.name?.charAt(0)?.toUpperCase() ?? '?'}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={s.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={s.card}>
            {user?.photo ? (
              <Image source={{ uri: user.photo }} style={s.cardAvatar} />
            ) : (
              <View style={[s.avatarFallback, s.cardAvatar]}>
                <Text style={[s.avatarLetter, { fontSize: 28 }]}>
                  {user?.name?.charAt(0)?.toUpperCase() ?? '?'}
                </Text>
              </View>
            )}
            <Text style={s.userName}>{user?.name ?? ''}</Text>
            <Text style={s.userEmail}>{user?.email ?? ''}</Text>

            <TouchableOpacity
              style={s.logoutBtn}
              onPress={async () => {
                setVisible(false);
                await signOut();
              }}
            >
              <Text style={s.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const s = StyleSheet.create({
  avatarBtn: {
    marginLeft: 'auto',
    padding: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: AppColors.accentYellow,
  },
  avatarFallback: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AppColors.accentDark,
    borderWidth: 1.5,
    borderColor: AppColors.accentYellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: {
    color: AppColors.accentYellow,
    fontWeight: '700',
    fontSize: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 260,
    backgroundColor: AppColors.backgroundSecondary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.grayLight,
  },
  cardAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: AppColors.accentYellow,
    marginBottom: 12,
  },
  userName: {
    color: AppColors.white,
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 4,
  },
  userEmail: {
    color: AppColors.gray,
    fontSize: 13,
    marginBottom: 20,
  },
  logoutBtn: {
    backgroundColor: AppColors.accentDark,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.accentYellow,
  },
  logoutText: {
    color: AppColors.accentYellow,
    fontWeight: '700',
    fontSize: 15,
  },
});
