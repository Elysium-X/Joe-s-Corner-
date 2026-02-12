

export default function Error({ title, message }) {
  return (
    <div className="center error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
