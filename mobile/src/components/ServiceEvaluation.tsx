import { Box, IconButton, Modal, Stack, Text, useTheme, VStack } from 'native-base';
import { Smiley, SmileyMeh, SmileySad } from 'phosphor-react-native';
import { useState } from 'react';
import api from '../lib/api';
import { Loading } from './Loading';

interface Props {
    modalVisible: boolean;
    setModalVisible: () => void;
    requestId: string;
}
export function ServiceEvaluation({modalVisible, setModalVisible, requestId}: Props) {
    const { colors } = useTheme();

    async function onSubmit(assessment: string) {
        try {
            await api.patch(`request/${requestId}/assessment?assessment=${assessment}`);
            setModalVisible();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Modal isOpen={modalVisible} onClose={setModalVisible} size="lg">
            <Modal.Content maxH="512" bg="gray.500">
                <Modal.CloseButton />
                <Modal.Header>Pesquisa Rápida</Modal.Header>
                <Modal.Body>
                    <VStack bg="gray.500" alignItems="center" >
                        <Text>Por favor, antes de finalizar avalie nosso atendimento:</Text>
                        <Stack direction="row" py={10} >
                        <Box>
                            <IconButton
                                icon={<SmileySad weight='duotone' color={colors.secondary[700]} size={70} />}
                                _pressed={{ bg: "gray.500" }}
                                onPress={() => onSubmit('BAD')}
                            />
                            <Text textAlign="center">Ruim</Text>
                        </Box>
                        <Box>
                            <IconButton
                                icon={<SmileyMeh weight='duotone' color={colors.secondary[700]} size={70} />}
                                _pressed={{ bg: "gray.500" }}
                                onPress={() => onSubmit('NEUTRAL')}
                            />
                            <Text textAlign="center">Regular</Text>
                        </Box>
                        <Box>
                            <IconButton
                                icon={<Smiley weight='duotone' color={colors.secondary[700]} size={70} />}
                                _pressed={{ bg: "gray.500" }}
                                onPress={() => onSubmit('GOOD')}
                            />
                            <Text textAlign="center">Bom</Text>
                        </Box>

                        </Stack>
                    </VStack>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
}
