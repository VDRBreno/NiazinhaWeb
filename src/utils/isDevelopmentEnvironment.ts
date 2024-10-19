export default function isDevelopmentEnvironment() {
  return !window.location.host.includes('niazinha.top');
}