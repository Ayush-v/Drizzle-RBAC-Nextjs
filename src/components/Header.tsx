export default function Header({
  title,
  description,
}: {
  title?: string;
  description?: string | null;
}) {
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold leading-tight">{title}</h1>
      {description ? (
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {description}
        </p>
      ) : null}
    </div>
  );
}
