export default function Header({
  title,
  description,
}: {
  title?: string;
  description?: string | null;
}) {
  return (
    <>
      <h1 className="text-3xl font-bold leading-tight">{title}</h1>
      {description ? (
        <p className="text-black/25 line-clamp-2 text-sm">{description}</p>
      ) : null}
    </>
  );
}
