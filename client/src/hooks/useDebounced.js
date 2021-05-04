import React from 'react';

const useDebounced = (value) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    let timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return clearTimeout(timeoutId);
  }, [value]);
  return debouncedValue;
};
export default useDebounced;
