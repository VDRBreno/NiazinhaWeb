import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './styles.module.scss';

interface CustomButtonProps {
  onClick?: () => void;
  children?: ReactNode;

  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export default function Button(props: CustomButtonProps) {
  return (
    <button
      {...props.props}
      id={styles.Container}
      className={`${props.props && props.props.disabled ?styles.ContainerDisabled :''}`}
    >
      {props.children}
    </button>
  );
}