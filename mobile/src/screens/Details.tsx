import { useContext, useEffect, useRef, useState } from 'react';
import { VStack, Text, HStack, useTheme, Box, FlatList } from 'native-base';
import { useRoute } from '@react-navigation/native';
import api from '../lib/api';
import { CircleWavyCheck, Hourglass } from 'phosphor-react-native';
import { Header } from '../components/Header';
import { Message } from '../components/Message';
import UserContext from '../context/UserContext';
import { Button } from '../components/Button';

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
    const { user } = useContext(UserContext);

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
    }, [requestId]);

    // const test = () => {
    //     setMessages([...messages,
    //         {
    //             id: (messages.length + 1).toString(),
    //             message: 'teste',
    //             requestId: '123',
    //             userId: '123',
    //             createdAt: messages[0].createdAt,
    //         }
    //     ]);
    //     flatListRef.current?.scrollToIndex({ animated: true, index: messages.length - 1})
    // }

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
                renderItem={({ item }) => (
                    <Message
                        messageAuthor={item.userId === user.userId}
                        text={item.message}
                        time={item.createdAt}
                    />
                )}
                showsVerticalScrollIndicator={false}
                refreshing={isLoading}
                // onRefresh={() => flatListRef.current?.scrollToEnd()}
                onRefresh={getMessages}
            />

          {/* <Button
            title="fim"
            m={5}
            onPress={test}
          /> */}
      </VStack>
    );
}
