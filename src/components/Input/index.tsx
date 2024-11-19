import { InputHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface InputProps {
  value: string | number;
  onChange: (value: string) => void;
  props?: InputHTMLAttributes<HTMLInputElement>;
  containerStyle?: React.CSSProperties;
}

export default function Input({
  value,
  onChange,
  props,
  containerStyle
}: InputProps) {
  return (
    <div id={styles.Container} style={containerStyle}>
      <input
        {...props}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}