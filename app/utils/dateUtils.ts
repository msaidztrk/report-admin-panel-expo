export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('tr-TR');
  };
  
  export const getDayName = (date: Date): string => {
    return date.toLocaleDateString('tr-TR', { weekday: 'long' });
  };