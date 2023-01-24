import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { VStack, Heading, Icon, useTheme, Button as ButtonNativeBase, Text } from 'native-base';
import { Envelope, IdentificationBadge, Key } from 'phosphor-react-native';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import api from '../lib/api';
import UserContext from '../context/UserContext';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { setToken } = useContext(UserContext);

  const { colors } = useTheme();

    async function handleSignIn() {
        if (!email || !password) {
            return Alert.alert('Entrar', 'Informe e-mail e senha.');
        }
        if (isSignUp && !name) {
            return Alert.alert('Cadastro', 'Informe seu nome.');
        }
        setIsLoading(true);
        try {
            const { data } = await api.post(
                isSignUp ? "/register" : "/login",
                isSignUp
                ? { email, password, name }
                : { email, password }
            );
            setToken(data);
        } catch (error) {
            setIsLoading(false);
            return Alert.alert('Entrar', 'E-mail ou senha inválida.');
        }
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                {isSignUp ? "Cadastre-se" : "Acesse sua conta"}
            </Heading>
            <Input
                mb={4}
                placeholder="E-mail"
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                onChangeText={setEmail}
            />
            <Input
                mb={4}
                placeholder="Senha"
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                secureTextEntry
                onChangeText={setPassword}
            />
            {
                isSignUp && (

                    <Input
                        mb={2}
                        placeholder="Nome"
                        InputLeftElement={<Icon as={<IdentificationBadge color={colors.gray[300]} />} ml={4} />}
                        onChangeText={setName}
                    />
                )
            }
            <ButtonNativeBase
                variant="ghost"
                w="full"
                display="flex"
                h={14}
                mb={4}
                _pressed={{ bg: "gray.600" }}
                onPress={() => setIsSignUp(!isSignUp)}
            >
                <Text color="white" fontSize="xs">
                    {isSignUp ? 'Já possui uma conta?  ' : 'Não possui uma conta?  '}
                    <Heading color="green.500" fontSize="sm">
                        {isSignUp ? 'Acesse.' : 'Cadastre-se.'}
                    </Heading>
                </Text>
            </ButtonNativeBase>

            <Button
                title={isSignUp ? "Cadastrar" : "Entrar"}
                w="full"
                onPress={handleSignIn}
                isLoading={isLoading}
            />
        </VStack>
    )
}
