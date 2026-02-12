export default function Button({ children, textOnly, className, ...props }) {
  const classes = className ? ` ${className}` : "";
  const cssClasses = textOnly ? `text-button${classes}` : `button${classes}`;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
