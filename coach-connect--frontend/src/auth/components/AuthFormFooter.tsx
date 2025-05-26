import Link from 'next/link';

export function AuthFormFooter({
  isRegister = false,
}: {
  isRegister?: boolean;
}) {
  return (
    <div className="text-sm text-aesthetic-muted text-center mt-2">
      {isRegister ? (
        <>
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-aesthetic-accent hover:text-aesthetic-accent/80 transition-colors"
          >
            Log in
          </Link>
        </>
      ) : (
        <>
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-aesthetic-accent hover:text-aesthetic-accent/80 transition-colors"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
}
