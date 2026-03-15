import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCalendar } from '../hooks/useCalendar';
import { styles } from './CalendarScreen.styles';

const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

export default function CalendarScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { events, addEvent, removeEvent } = useCalendar();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));

  const handleAdd = () => {
    const t = title.trim();
    const d = date.trim();
    if (!t || !d) return;
    addEvent(t, d, time.trim() || undefined);
    setTitle('');
    setDate('');
    setTime('');
  };

  const parseDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return { day: dateStr, month: '' };
    const day = parts[2];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const month = MONTHS[monthIdx] ?? '';
    return { day, month };
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calendário</Text>
        </View>
      </View>

      <FlatList
        data={sortedEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { day, month } = parseDate(item.date);
          return (
            <View style={styles.eventItem}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateDay}>{day}</Text>
                <Text style={styles.dateMonth}>{month}</Text>
              </View>
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                {item.time && <Text style={styles.eventTime}>{item.time}</Text>}
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => removeEvent(item.id)}>
                <Image
                  source={require('@/assets/images/trashIconItem.png')}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum evento ainda</Text>}
      />

      <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Título do evento"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputSmall}
            placeholder="Data (YYYY-MM-DD)"
            placeholderTextColor="#888"
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={styles.inputSmall}
            placeholder="Hora (HH:mm)"
            placeholderTextColor="#888"
            value={time}
            onChangeText={setTime}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
