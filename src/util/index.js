import dayjs from 'dayjs';

export const convertToFormat = timestamp => dayjs(timestamp).format("YY년 MM월 DD일 HH:mm");
export const getCurrentTimestamp = () => dayjs().valueOf();
