import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './styles.module.scss';

interface CustomButtonProps {
  onClick?: () => void;
  children?: ReactNode;

  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export default function Button({
  children,
  onClick,
  props
}: CustomButtonProps) {
  return (
    <button
      {...props}
      id={styles.Container}
      className={`${props && props.disabled ?styles.ContainerDisabled :''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}