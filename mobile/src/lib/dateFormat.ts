export function dateFormat(timestamp: string) {
    const day = timestamp.split('T')[0].split('-')[2]
    const month = timestamp.split('T')[0].split('-')[1]
    const hour = timestamp.split('T')[1].split(':')[0]
    const min = timestamp.split('T')[1].split(':')[1]

    return `${day}/${month} às ${hour}:${min}`;
}
