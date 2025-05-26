import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log('session', session);
  console.log('session accessToken', session?.accessToken);
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
      <div className="ml-4 text-gray-700">
        <p>Welcome, {session?.user.name}!</p>
      </div>
    </div>
  );
}
