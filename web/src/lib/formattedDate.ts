const formattedDate = (date: string): string => {
    const createdAt = new Date(date);
    const dayMonth = new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: '2-digit',
    }).format(createdAt);
    const hourMinute = new Intl.DateTimeFormat('pt-BR', {
        hour: 'numeric',
        minute: 'numeric',
    }).format(createdAt);
    return `${dayMonth} às ${hourMinute}`;
};

export default formattedDate;
