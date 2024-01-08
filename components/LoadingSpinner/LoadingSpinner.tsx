import React from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  width?: string;
  height?: string;
}

const LoadingSpinner = ({ width, height }: LoadingSpinnerProps) => {
  return (
    <div
      className={`${width ?? 'w-[48px]'} ${height ?? 'h-[48px]'} ${
        styles.loader
      }`}
    ></div>
  );
};

export default LoadingSpinner;
