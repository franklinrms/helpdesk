import { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center, Image, Box } from 'native-base';
import { SignOut } from 'phosphor-react-native';
import { ChatTeardropText } from 'phosphor-react-native';

import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import UserContext from '../context/UserContext';
import { Request, RequestProps } from '../components/Request';
import api, { setHeadersToken } from '../lib/api';

export function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [statusSelected, setStatusSelected] = useState<'IN_PROGRESS' | 'DONE'>('IN_PROGRESS');
    const [requests, setRequests] = useState<RequestProps[]>([]);
    const { setToken, token } = useContext(UserContext);

    const navigation = useNavigation();
    const { colors } = useTheme();

    async function getRequests(): Promise<void> {
        setHeadersToken(token);
        setIsLoading(true);
        try {
            const { data } = await api.get(
                `/request?filter=${statusSelected}`
            );
            setRequests(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRequests();
    }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
        <HStack
            w="full"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.600"
            pt={12}
            pb={5}
            px={6}
        >
            <Box flexDirection="row" alignItems="center">
                <ChatTeardropText color={colors.gray[200]} size={30} />
                <Text px='1' color={colors.gray[200]} fontSize="2xl" fontWeight="medium">
                    HelpDesk
                </Text>
            </Box>
            <IconButton
                _pressed={{ bg: "gray.500" }}
            icon={<SignOut size={26} color={colors.gray[300]} />}
            onPress={() => { setToken('')}}
            />
        </HStack>

        <VStack flex={1} px={6}>
            <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                <Heading color="gray.100">
                    Solicitações
                </Heading>
                <Text color="gray.200">
                    {requests.length}
                </Text>
            </HStack>

            <HStack space={3} mb={8}>
                <Filter
                    type="IN_PROGRESS"
                    title="em andamento"
                    onPress={() => setStatusSelected('IN_PROGRESS')}
                    isActive={statusSelected === 'IN_PROGRESS'}
                />
                <Filter
                    type="DONE"
                    title="finalizados"
                    onPress={() => setStatusSelected('DONE')}
                    isActive={statusSelected === 'DONE'}
                />
            </HStack>

            {isLoading ? <Loading /> :
                <FlatList
                    data={requests}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Request data={item} onPress={
                        () => navigation.navigate('Details', { requestId: item.id })
                    } />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={() => (
                        <Center pt="50" >
                            <ChatTeardropText color={colors.gray[300]} size={40} />
                            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                Você ainda não possui {'\n'}
                                solicitações {statusSelected !== 'DONE' ? 'em andamento' : 'finalizadas'}
                            </Text>
                        </Center>
                    )}
                />
            }

            <Button title="Nova solicitação" onPress={() => navigation.navigate('NewRequest')} />
        </VStack>
    </VStack>
  );
}
