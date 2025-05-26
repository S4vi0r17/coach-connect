import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AuthLogo,
  AuthGoogleButton,
  AuthSeparator,
  RegisterForm,
  AuthFormFooter,
} from '@/auth/components';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-aesthetic-light p-4">
      <AuthLogo />
      <div className="w-full max-w-md animate-fade-in">
        <Card className="aesthetic-card aesthetic-shadow">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-aesthetic-dark">
              Create an account
            </CardTitle>
            <CardDescription className="text-center text-aesthetic-muted">
              Enter your information to create your coach account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthGoogleButton />

            <AuthSeparator />

            <RegisterForm />
          </CardContent>
          <CardFooter className="flex flex-col">
            <AuthFormFooter isRegister />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
