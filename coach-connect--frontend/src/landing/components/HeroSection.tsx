import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="aesthetic-section bg-white">
      <div className="aesthetic-container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-6 animate-fade-in order-2 lg:order-1">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl aesthetic-heading">
                Manage Your Fitness Coaching Without Complications
              </h1>
              <p className="text-aesthetic-medium text-lg">
                CoachConnect helps you keep track of your clients, workouts, and
                progress... from any device.
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
  );
}
