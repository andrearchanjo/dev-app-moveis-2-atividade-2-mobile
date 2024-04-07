import React, { useState } from 'react';
import { View } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import { BorderlessButton } from 'react-native-gesture-handler';

function Favorites() {
    return (
        <View style={styles.container}>
            <PageHeader
                title="Meus coaches favoritos"
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

export default Favorites;