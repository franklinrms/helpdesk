import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function ChatInput({ ...rest }: IInputProps) {
    return (
        <NativeBaseInput
            bg="gray.600"
            h={14}
            size="md"
            borderWidth={1}
            borderColor="gray.700"
            fontSize="md"
            fontFamily="body"
            color="white"
            placeholderTextColor="gray.300"
            rounded="lg"
            
            _focus={{
                borderWidth: 1,
                borderColor: "secondary.700",
                bg: "gray.600"
            }}
            {...rest}
        />
    );
}
