import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-aesthetic-light">
      <header className="border-b border-aesthetic-muted-light bg-white sticky top-0 z-10">
        <div className="aesthetic-container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <div className="absolute inset-0 bg-gradient-to-br from-aesthetic-accent to-aesthetic-accent-light rounded-md shadow-md"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                CC
              </div>
            </div>
            <Link
              href={'/'}
              className="flex items-center gap-0.5 font-bold text-xl"
            >
              <span className="text-aesthetic-accent">Coach</span>
              <span className="text-aesthetic-dark">Connect</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-aesthetic-medium hover:text-aesthetic-accent transition-colors"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-aesthetic-medium hover:text-aesthetic-accent transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-aesthetic-medium hover:text-aesthetic-accent transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-aesthetic-medium hover:text-aesthetic-accent hover:bg-aesthetic-muted-light cursor-pointer"
              >
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="aesthetic-button bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="aesthetic-section bg-white">
          <div className="aesthetic-container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-6 animate-fade-in order-2 lg:order-1">
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl aesthetic-heading">
                    Manage Your Fitness Coaching Without Complications
                  </h1>
                  <p className="text-aesthetic-medium text-lg">
                    CoachConnect helps you keep track of your clients, workouts,
                    and progress... from any device.
                  </p>
                </div>
                <div>
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="aesthetic-button bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer"
                    >
                      Start for free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center order-1 lg:order-2">
                <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] flex items-center justify-center animate-fade-in">
                  <div className="absolute inset-0 bg-aesthetic-accent/10 rounded-full blur-xl"></div>
                  <div className="relative rounded-full overflow-hidden shadow-2xl">
                    <Image
                      src="/mona-lisa-fitness.jpg"
                      alt="Mona Lisa Fitness - CoachConnect Mascot"
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="aesthetic-section bg-aesthetic-light" id="features">
          <div className="aesthetic-container">
            <div className="text-center mb-12">
              <div className="inline-block rounded-full bg-aesthetic-accent/10 px-3 py-1 text-sm text-aesthetic-accent mb-3">
                Features
              </div>
              <h2 className="text-3xl md:text-4xl aesthetic-heading mb-3">
                Everything You Need to Manage Your Coaching Business
              </h2>
              <p className="max-w-2xl mx-auto text-aesthetic-medium">
                CoachConnect provides all the tools you need to grow your
                coaching business and deliver exceptional service to your
                clients.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                className="aesthetic-card p-6 animate-slide-up"
                style={{ animationDelay: '0ms' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-aesthetic-accent/10 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-aesthetic-dark">
                    Client Management
                  </h3>
                </div>
                <p className="text-aesthetic-medium">
                  Easily add, edit, and organize your client information in one
                  place.
                </p>
              </div>
              <div
                className="aesthetic-card p-6 animate-slide-up"
                style={{ animationDelay: '150ms' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-aesthetic-accent/10 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-aesthetic-dark">
                    Progress Tracking
                  </h3>
                </div>
                <p className="text-aesthetic-medium">
                  Monitor your clients&#39; progress and achievements over time.
                </p>
              </div>
              <div
                className="aesthetic-card p-6 animate-slide-up"
                style={{ animationDelay: '300ms' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-aesthetic-accent/10 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-aesthetic-dark">
                    Secure Platform
                  </h3>
                </div>
                <p className="text-aesthetic-medium">
                  Keep your client data safe and secure with our protected
                  platform.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="aesthetic-section bg-white" id="testimonials">
          <div className="aesthetic-container">
            <div className="text-center mb-12">
              <div className="inline-block rounded-full bg-aesthetic-accent/10 px-3 py-1 text-sm text-aesthetic-accent mb-3">
                Testimonials
              </div>
              <h2 className="text-3xl md:text-4xl aesthetic-heading mb-3">
                Trusted by Coaches Worldwide
              </h2>
              <p className="max-w-2xl mx-auto text-aesthetic-medium">
                See what other fitness professionals are saying about
                CoachConnect.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div
                className="aesthetic-card p-6 aesthetic-hover animate-fade-in"
                style={{ animationDelay: '0ms' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-aesthetic-accent/10 flex items-center justify-center">
                    <span className="text-aesthetic-accent font-bold">SJ</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-aesthetic-dark">
                      Sarah Johnson
                    </h3>
                    <p className="text-sm text-aesthetic-muted">
                      Personal Trainer
                    </p>
                  </div>
                </div>
                <p className="text-aesthetic-medium">
                  &quot;CoachConnect has transformed how I manage my clients.
                  The interface is intuitive and saves me hours each week.&quot;
                </p>
              </div>
              <div
                className="aesthetic-card p-6 aesthetic-hover animate-fade-in"
                style={{ animationDelay: '150ms' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-aesthetic-accent/10 flex items-center justify-center">
                    <span className="text-aesthetic-accent font-bold">MT</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-aesthetic-dark">
                      Michael Torres
                    </h3>
                    <p className="text-sm text-aesthetic-muted">
                      Fitness Coach
                    </p>
                  </div>
                </div>
                <p className="text-aesthetic-medium">
                  &quot;Since using CoachConnect, I&#39;ve been able to focus
                  more on coaching and less on administrative tasks.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="aesthetic-section bg-aesthetic-light" id="pricing">
          <div className="aesthetic-container">
            <div className="text-center mb-12">
              <div className="inline-block rounded-full bg-aesthetic-accent/10 px-3 py-1 text-sm text-aesthetic-accent mb-3">
                Pricing
              </div>
              <h2 className="text-3xl md:text-4xl aesthetic-heading mb-3">
                Simple, Transparent Pricing
              </h2>
              <p className="max-w-2xl mx-auto text-aesthetic-medium">
                Choose the plan that works best for your coaching business.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div
                className="aesthetic-card p-6 aesthetic-hover animate-fade-in"
                style={{ animationDelay: '0ms' }}
              >
                <h3 className="text-xl font-semibold text-aesthetic-dark mb-2">
                  Starter
                </h3>
                <p className="text-4xl font-bold text-aesthetic-accent mb-1">
                  $0
                </p>
                <p className="text-aesthetic-muted mb-6">
                  Perfect for new coaches
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                    <span className="text-aesthetic-medium">
                      Up to 5 clients
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                    <span className="text-aesthetic-medium">
                      Basic client management
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                    <span className="text-aesthetic-medium">Coach profile</span>
                  </li>
                </ul>
                <Link href="/register">
                  <Button className="w-full aesthetic-button bg-white border border-aesthetic-accent text-aesthetic-accent hover:bg-aesthetic-accent/5 cursor-pointer">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div
                className="aesthetic-card p-6 aesthetic-hover animate-fade-in relative overflow-visible"
                style={{ animationDelay: '150ms' }}
              >
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-aesthetic-accent px-3 py-1 text-xs font-medium text-white">
                  Popular
                </div>
                <h3 className="text-xl font-semibold text-aesthetic-dark mb-2">
                  Professional
                </h3>
                <p className="text-4xl font-bold text-aesthetic-accent mb-1">
                  $29
                </p>
                <p className="text-aesthetic-muted mb-6">Monthly per coach</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                    <span className="text-aesthetic-medium">
                      Unlimited clients
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                    <span className="text-aesthetic-medium">
                      Advanced client management
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                    <span className="text-aesthetic-medium">
                      Progress tracking
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                    <span className="text-aesthetic-medium">
                      Email notifications
                    </span>
                  </li>
                </ul>
                <Link href="/register">
                  <Button className="w-full aesthetic-button bg-aesthetic-accent text-white hover:bg-aesthetic-accent/90 cursor-pointer">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div
                className="aesthetic-card p-6 aesthetic-hover animate-fade-in"
                style={{ animationDelay: '300ms' }}
              >
                <h3 className="text-xl font-semibold text-aesthetic-dark mb-2">
                  Enterprise
                </h3>
                <p className="text-4xl font-bold text-aesthetic-accent mb-1">
                  Custom
                </p>
                <p className="text-aesthetic-muted mb-6">
                  For coaching businesses
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                    <span className="text-aesthetic-medium">
                      Multiple coach accounts
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                    <span className="text-aesthetic-medium">
                      Team management
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                    <span className="text-aesthetic-medium">
                      Advanced analytics
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                    <span className="text-aesthetic-medium">
                      Priority support
                    </span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="w-full aesthetic-button bg-white border border-aesthetic-accent text-aesthetic-accent hover:bg-aesthetic-accent/5 cursor-pointer">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-aesthetic-muted-light py-8 bg-white">
        <div className="aesthetic-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <div className="absolute inset-0 bg-gradient-to-br from-aesthetic-accent to-aesthetic-accent-light rounded-md shadow-md"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                CC
              </div>
            </div>
            <div className="flex items-center gap-0.5 font-bold text-xl">
              <span className="text-aesthetic-accent">Coach</span>
              <span className="text-aesthetic-dark">Connect</span>
            </div>
          </div>
          <p className="text-center text-sm text-aesthetic-muted">
            &copy; {new Date().getFullYear()} CoachConnect. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link
              href="#"
              className="text-sm font-medium text-aesthetic-medium hover:text-aesthetic-accent transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-aesthetic-medium hover:text-aesthetic-accent transition-colors"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
