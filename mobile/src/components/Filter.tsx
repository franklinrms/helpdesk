import { Text, Button, IButtonProps, useTheme } from 'native-base';

type Props = IButtonProps & {
    title: string;
    isActive?: boolean;
    type: 'IN_PROGRESS' | 'DONE';
}

export function Filter({ title, isActive = false, type, ...rest }: Props) {
    const { colors } = useTheme();

    const colorType = type !== 'DONE' ? colors.secondary[700] : colors.green[300];

    return (
        <Button
            variant="outline"
            borderWidth={isActive ? 1 : 0}
            borderColor={colorType}
            bgColor="gray.600"
            flex={1}
            size="sm"
            rounded="lg"
            {...rest}
        >
            <Text color={isActive ? colorType : "gray.300"} fontSize="xs" textTransform="uppercase">
                {title}
            </Text>
        </Button>
    );
}
