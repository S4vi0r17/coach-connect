export default function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-aesthetic-light p-4">
      <div className="relative h-8 w-8 mr-2">
        <div className="absolute inset-0 bg-gradient-to-br from-aesthetic-accent to-aesthetic-accent-light rounded-md shadow-md"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
          CC
        </div>
      </div>
      <div className="flex items-center gap-0.5 font-bold text-xl">
        CoachConnect
      </div>
    </div>
  );
}
