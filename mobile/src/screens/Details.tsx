import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { VStack, Text, HStack, useTheme, Box, FlatList, Icon, Pressable } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { io } from 'socket.io-client';
import api, { baseURL } from '../lib/api';
import { CircleWavyCheck, Hourglass, PaperPlaneRight } from 'phosphor-react-native';
import { Header } from '../components/Header';
import { Message } from '../components/Message';
import UserContext from '../context/UserContext';
import { ChatInput } from '../components/ChatInput';

interface MessageType {
    id: string;
    message: string;
    requestId: string;
    userId: string;
    createdAt: string;
}

interface DetailsType {
    title: string;
    status: string;
    createdAt?: string;
    customer?: {
        name: string;
        id: string;
    };
    messages?: [];
}

interface RouteParams {
    requestId: string;
  }

export function Details() {
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [details, setDetails] = useState<DetailsType>({} as DetailsType);
    const [newMessage, setNewMessage] = useState('');
    const { user } = useContext(UserContext);

    const socket = io(`${baseURL}/chat`);
    const route = useRoute();
    const { colors } = useTheme();
    const { requestId } = route.params as RouteParams;

    const flatListRef = useRef<FlatList | null>(null);

    async function getMessages(): Promise<void> {
        try {
            setIsLoading(true);
            const { data } = await api.get(`request/${requestId}`);
            setMessages(data.messages);
            data.messages = [];
            setDetails(data);
            flatListRef.current?.scrollToEnd();
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        void getMessages();
        socket.emit('request_id', requestId);
    }, [requestId]);

    socket.on('message', (data: MessageType) => {
        setMessages([...messages, data]);
        flatListRef.current?.scrollToIndex({ index: messages.length - 1, animated: true });
    });

    const renderItem = useCallback(({item}: {
        item: MessageType;
    }) => (
        <Message
            messageAuthor={item.userId === user.userId}
            text={item.message}
            time={item.createdAt}
        />
    ), []);

    function onSubmitMessage(): void {
        if(newMessage.length) {
            socket.emit('message', {
                message: newMessage,
                requestId,
                userId: user.userId,
            });
            setNewMessage('');
        }
    }
    return (
        <VStack flex={1} bg="gray.700">
            <Box px={6} bg="gray.600">
                <Header title={details.title} />
            </Box>
            <HStack bg="gray.500" justifyContent="center" p={4}>
                {details.status === 'DONE'
                    ? <CircleWavyCheck size={22} color={colors.green[300]} />
                    : <Hourglass size={22} color={colors.secondary[700]} />
                }
                <Text
                    fontSize="sm"
                    color={details.status === 'DONE' ? colors.green[300] : colors.secondary[700]}
                    ml={2}
                    textTransform="uppercase"
                >
                    {details.status !== 'DONE' ? 'em andamento' : 'finalizado'}
                </Text>
            </HStack>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                ref={flatListRef}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                refreshing={isLoading}
                onRefresh={getMessages}
            />
            {details.status !== 'DONE' && (
                <ChatInput
                    m={4}
                    placeholder="Digite sua mensagem aqui..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                    InputRightElement={(
                        <Pressable onPress={onSubmitMessage}>
                            <Icon mr={4} as={
                                <PaperPlaneRight
                                    weight={newMessage.length ? 'fill' : 'regular'}
                                    color={colors.gray[100]}
                                    />
                                }
                            />
                        </Pressable>
                    )}
                />
                )
            }
      </VStack>
    );
}
