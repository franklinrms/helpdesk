import { Box, IconButton, Modal, Stack, Text, useTheme, VStack } from 'native-base';
import { Smiley, SmileyMeh, SmileySad } from 'phosphor-react-native';

interface Props {
    modalVisible: boolean;
    setModalVisible: () => void;
}
export function ServiceEvaluation({modalVisible, setModalVisible}: Props) {
    const { colors } = useTheme();
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
                                onPress={setModalVisible}
                            />
                            <Text textAlign="center">Ruim</Text>
                        </Box>
                        <Box>
                            <IconButton
                                icon={<SmileyMeh weight='duotone' color={colors.secondary[700]} size={70} />}
                                _pressed={{ bg: "gray.500" }}
                                onPress={setModalVisible}
                            />
                            <Text textAlign="center">Regular</Text>
                        </Box>
                        <Box>
                            <IconButton
                                icon={<Smiley weight='duotone' color={colors.secondary[700]} size={70} />}
                                _pressed={{ bg: "gray.500" }}
                                onPress={setModalVisible}
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
