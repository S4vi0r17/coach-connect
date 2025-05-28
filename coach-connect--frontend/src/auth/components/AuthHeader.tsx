export function AuthHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <div className="flex items-center justify-center">
        <div className="relative h-10 w-10 mr-2">
          <div className="absolute inset-0 bg-gradient-to-br from-aesthetic-accent to-aesthetic-accent-light rounded-md shadow-md"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
            CC
          </div>
        </div>
        <div className="flex items-center gap-0.5 font-bold text-xl">
          <span className="text-aesthetic-accent">Coach</span>
          <span className="text-aesthetic-dark">Connect</span>
        </div>
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-aesthetic-dark">
        {title}
      </h1>
      <p className="text-sm text-aesthetic-muted">{subtitle}</p>
    </div>
  );
}
