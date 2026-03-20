/**
 * useToolInput Hook
 * =================
 * Manages tool-specific input state and validation
 */

import { useState, useCallback } from 'react';
import { validateToolInput } from '../utils/validation';

export const useToolInput = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [errors, setErrors] = useState({});

  const validate = useCallback((toolId) => {
    const validation = validateToolInput(toolId, input1, input2);
    setErrors(validation.errors);
    return validation.isValid;
  }, [input1, input2]);

  const clear = useCallback(() => {
    setInput1('');
    setInput2('');
    setErrors({});
  }, []);

  return {
    input1,
    setInput1,
    input2,
    setInput2,
    errors,
    validate,
    clear,
  };
};

export default useToolInput;
