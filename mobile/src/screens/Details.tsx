import React from 'react';
import { Text, View } from 'react-native';

import { useRoute } from '@react-navigation/native';

export function Details() {
    const route = useRoute();
    const { requestId } = route.params
    console.log("🚀 ~ file: Details.tsx:9 ~ Details ~ requestId", requestId)
    return (
        <View>
            <Text>Details</Text>
        </View>
    );
}
