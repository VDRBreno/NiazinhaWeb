import styles from './styles.module.scss';

interface LoadingIconProps {
  size?: number;
}

export default function LoadingIcon({
  size=30
}: LoadingIconProps) {
  return (
    <div
      id={styles.Container}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${size}px`,
        border: `solid ${size/6}px transparent`
      }}
    />
  );
}