import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { io } from 'socket.io-client';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import api, { baseURL } from '../lib/api';

export function NewRequest() {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const socket = io(`${baseURL}/requests`);
    const navigation = useNavigation();

    async function handleNewOrderRegister() {
        if (!title || !message) {
            return Alert.alert('Registrar nova solicitação', 'Preencha todos os campos.');
        }
        setIsLoading(true);
        try {
            const { data } = await api.post("/request", { title, message });
            navigation.navigate('Details', { requestId: data });
            socket.emit('update', '');
        } catch (error) {
            Alert.alert('Registrar', 'Erro ao registrar solicitação.');
        }

    }

    return (
        <VStack flex={1} p={6} bg="gray.600">
            <Header title="Nova Solicitação" />
            <Input
                placeholder="Título"
                mt={4}
                onChangeText={setTitle}
            />
            <Input
                placeholder="Descrição do problema"
                flex={1}
                mt={5}
                multiline
                textAlignVertical="top"
                onChangeText={setMessage}
            />
            <Button
                title="Cadastrar"
                mt={5}
                isLoading={isLoading}
                onPress={handleNewOrderRegister}
            />
        </VStack>
    );
}
