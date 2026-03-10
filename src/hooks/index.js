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

/**
 * useMobileMenu Hook
 * ==================
 * Manages mobile navigation menu state
 */

export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return { isOpen, toggle, close, open };
};

/**
 * useAudioPlayer Hook
 * ===================
 * Manages audio playback state and controls
 */

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, []);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  return {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    stop,
    seek,
  };
};

import { useRef } from 'react';

export default useToolInput;
