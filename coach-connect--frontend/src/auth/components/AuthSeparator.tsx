import { Separator } from '@/components/ui/separator';

export function AuthSeparator() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <Separator className="w-full" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-card px-2 text-xs text-aesthetic-muted">
          OR CONTINUE WITH EMAIL
        </span>
      </div>
    </div>
  );
}
