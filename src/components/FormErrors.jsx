export default function FormErrors({ errors, prominent = false }) {
  if (!errors.length) return null;
  return (
    <ul className={prominent ? 'errors prominent' : 'errors'} role="alert">
      {errors.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}
