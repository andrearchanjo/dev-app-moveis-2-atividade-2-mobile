import React, { useEffect, useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PageHeader from '../../components/PageHeader';

import api from '../../services/api';
import styles from './styles';
import CoachItem, { Coach } from '../../components/CoachItem';
import { Dias } from '../../enums/Dias';
import { Subjects } from '../../enums/Subjects';

function CoachList() {
    const [coaches, setCoaches] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [subject, setSubject] = useState<Subjects>();
    const [week_day, setWeekDay] = useState<Dias>(Dias.Domingo);
    const [time, setTime] = useState('');

    const formatTime = (text) => {
        let cleaned = text.replace(/\D/g, '');
        
        if (cleaned.length > 0) {
            const firstDigit = parseInt(cleaned[0], 10);
            if (![0, 1, 2].includes(firstDigit)) {
                cleaned = cleaned.slice(1);
            }
            
            if (cleaned.length > 1) {
                const secondDigit = parseInt(cleaned[1], 10);
                if (firstDigit === 2 && ![0, 1, 2, 3].includes(secondDigit)) {
                    cleaned = cleaned.slice(0, 1);
                }

                if (cleaned.length > 2) {
                    const thirdDigit = parseInt(cleaned[2], 10)
                    if (![0, 1, 2, 3, 4, 5].includes(thirdDigit)) {
                        cleaned = cleaned.slice(0, 2);
                    }
                    
                    cleaned = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
                }
            }
        }
        
        return cleaned.slice(0, 5);
    };

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedCoaches = JSON.parse(response);
                const favoritedCoachesIds = favoritedCoaches.map((coach: Coach) => {
                    return coach.id;
                })
                setFavorites(favoritedCoachesIds);
            }
        })
    }

    useEffect(() => {
        loadFavorites();
    }, [])

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }
    
    async function handleFiltersSubmit() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setIsFiltersVisible(false);
        setCoaches(response.data);
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Coaches disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <View style={styles.input}>
                            <Picker
                                selectedValue={subject}
                                onValueChange={(itemValue) => setSubject(itemValue as Subjects)}
                                style={{ flex: 1 }}
                            >
                                {Object.values(Subjects).map((subjectValue) => (
                                    <Picker.Item
                                        key={subjectValue}
                                        label={subjectValue}
                                        value={subjectValue}
                                    />
                                ))}
                            </Picker>
                        </View>

                        <Text style={styles.label}>Dia da semana</Text>
                        <View style={styles.input}>
                            <Picker
                                selectedValue={week_day}
                                onValueChange={(itemValue) => setWeekDay(itemValue as Dias)}
                                style={{ flex: 1 }}
                            >
                                {Object.values(Dias)
                                    .filter(value => typeof value === 'number')
                                    .map((dia) => (
                                        <Picker.Item
                                            key={dia as Dias}
                                            label={Dias.toString(dia as Dias)}
                                            value={dia}
                                        />
                                ))}
                            </Picker>
                        </View>

                        <Text style={styles.label}>Horário</Text>
                        <View style={styles.input}>
                            <TextInput
                                style={{ flex: 1 }}
                                value={formatTime(time)}
                                onChangeText={(text) => setTime(formatTime(text))}
                                placeholder="__:__"
                                placeholderTextColor="#c1bccc"
                                keyboardType="numeric"
                                maxLength={5}
                            />
                        </View>

                        <RectButton 
                            onPress={handleFiltersSubmit} 
                            style={styles.submitButton}
                        >
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}

            </PageHeader>

            <ScrollView
                style={styles.coachList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {coaches.map((coach: Coach) => {
                    return (
                        <CoachItem 
                            key={coach.id} 
                            coach={coach}
                            favorited={favorites.includes(coach.id)} 
                        />
                    );
                })}        

            </ScrollView>
        </View>
    )
}

export default CoachList;