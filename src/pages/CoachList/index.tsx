import React, { useState } from 'react';
import { View } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import { BorderlessButton } from 'react-native-gesture-handler';

function CoachList() {
    return (
        <View style={styles.container}>
            <PageHeader
                title="Coaches disponíveis" 
                headerRight={(
                <BorderlessButton>
                    {/* <Feather name="filter" size={20} color="#fff" /> */}
                </BorderlessButton>
                )}
            >

            </PageHeader>
        </View>
    )
}

export default CoachList;