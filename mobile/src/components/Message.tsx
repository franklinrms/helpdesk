import { useTheme, StyledProps, VStack, Box, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { dateFormat } from '../lib/dateFormat';

type Props = StyledProps & {
    text: string;
    time: string;
    messageAuthor: boolean;
}

export function Message({ text, time, messageAuthor, ...rest }: Props) {
    const { colors } = useTheme();

    return (
        <VStack
            w="full"
            px={6}
            alignItems={messageAuthor ? "flex-end" : "flex-start"}
            pb={6}
            {...rest}
        >
            <Box maxW='60%' alignItems={messageAuthor ? "flex-end" : "flex-start"}>
                <Text color={ colors.gray[300] } fontSize="xs" mb={2} >
                    {dateFormat(time)}
                </Text>
                <Box
                    bg={ messageAuthor ? colors.gray[600] : colors.gray[400] }
                    px={4}
                    py={2}
                    rounded="lg"
                    >
                    <Text color={ colors.gray[100] } >
                        {text}
                    </Text>
                </Box>
            </Box>
        </VStack>
    );
}
