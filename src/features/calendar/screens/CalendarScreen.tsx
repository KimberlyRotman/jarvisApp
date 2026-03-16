import { DrawerActions, useNavigation } from '@react-navigation/native';
import ProfileAvatar from '@src/shared/components/ProfileAvatar';
import type { CalendarEvent } from '@src/shared/utils/types';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScrollPicker from '../components/ScrollPicker';
import { useCalendar } from '../hooks/useCalendar';
import { styles } from './CalendarScreen.styles';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const YEARS = Array.from({ length: 11 }, (_, i) => String(2025 + i));
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

type MonthGroup = {
  key: string;
  label: string;
  events: CalendarEvent[];
};

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { events, addEvent, removeEvent } = useCalendar();
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [dayIndex, setDayIndex] = useState(0);
  const [monthIndex, setMonthIndex] = useState(0);
  const [yearIndex, setYearIndex] = useState(1); // 2026
  const [hourIndex, setHourIndex] = useState(12);
  const [minuteIndex, setMinuteIndex] = useState(0);

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const monthGroups = useMemo(() => {
    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
    const groups: Record<string, MonthGroup> = {};
    for (const ev of sorted) {
      const parts = ev.date.split('-');
      if (parts.length < 2) continue;
      const key = `${parts[0]}-${parts[1]}`;
      const monthIdx = parseInt(parts[1], 10) - 1;
      const label = `${MONTH_NAMES[monthIdx] ?? parts[1]} ${parts[0]}`;
      if (!groups[key]) {
        groups[key] = { key, label, events: [] };
      }
      groups[key].events.push(ev);
    }
    return Object.values(groups);
  }, [events]);

  const toggleMonth = (key: string) => {
    setExpandedMonths((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAdd = () => {
    const t = title.trim();
    if (!t) return;
    const d = `${YEARS[yearIndex]}-${MONTHS[monthIndex]}-${DAYS[dayIndex]}`;
    const tm = `${HOURS[hourIndex]}:${MINUTES[minuteIndex]}`;
    addEvent(t, d, tm);
    setTitle('');
    setDayIndex(0);
    setMonthIndex(0);
    setYearIndex(1);
    setHourIndex(12);
    setMinuteIndex(0);
    setShowModal(false);
  };

  const formatEventDate = (dateStr: string, timeStr?: string) => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const display = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return timeStr ? `${timeStr} — ${display}` : display;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
            <Image
              source={require('@/assets/images/hamburguer.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calendário</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.addHeaderButton} onPress={() => setShowModal(true)}>
            <Image
              source={require('@/assets/images/AddListMenuIcon.png')}
              style={styles.addHeaderIcon}
            />
          </TouchableOpacity>
          <ProfileAvatar />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {monthGroups.length === 0 && (
          <Text style={styles.emptyText}>Nenhum evento ainda</Text>
        )}
        {monthGroups.map((group) => {
          const isExpanded = expandedMonths[group.key] ?? false;
          return (
            <View key={group.key} style={styles.monthSection}>
              <TouchableOpacity style={styles.monthHeader} onPress={() => toggleMonth(group.key)}>
                <Text style={styles.monthTitle}>{group.label}</Text>
                <Text style={styles.dropdownArrow}>{isExpanded ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {isExpanded && group.events.map((ev) => (
                <View key={ev.id} style={styles.card}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{ev.title}</Text>
                    <Text style={styles.cardDate}>{formatEventDate(ev.date, ev.time)}</Text>
                  </View>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => removeEvent(ev.id)}>
                    <Image
                      source={require('@/assets/images/trashIconItem.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>

      {/* Add Event Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Evento</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Título do evento"
              placeholderTextColor="#888"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.pickerLabel}>Data</Text>
            <View style={styles.pickerRow}>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>Dia</Text>
                <ScrollPicker values={DAYS} selectedIndex={dayIndex} onValueChange={setDayIndex} width={60} />
              </View>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>Mês</Text>
                <ScrollPicker values={MONTHS} selectedIndex={monthIndex} onValueChange={setMonthIndex} width={60} />
              </View>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>Ano</Text>
                <ScrollPicker values={YEARS} selectedIndex={yearIndex} onValueChange={setYearIndex} width={80} />
              </View>
            </View>

            <Text style={styles.pickerLabel}>Hora</Text>
            <View style={styles.pickerRow}>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>Hora</Text>
                <ScrollPicker values={HOURS} selectedIndex={hourIndex} onValueChange={setHourIndex} width={60} />
              </View>
              <Text style={styles.pickerSeparator}>:</Text>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>Min</Text>
                <ScrollPicker values={MINUTES} selectedIndex={minuteIndex} onValueChange={setMinuteIndex} width={60} />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowModal(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={handleAdd}>
                <Text style={styles.modalConfirmText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
}
