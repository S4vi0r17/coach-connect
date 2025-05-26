import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PricingSection() {
  return (
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
            <p className="text-4xl font-bold text-aesthetic-accent mb-1">$0</p>
            <p className="text-aesthetic-muted mb-6">Perfect for new coaches</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                <span className="text-aesthetic-medium">Up to 5 clients</span>
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
            <p className="text-4xl font-bold text-aesthetic-accent mb-1">$29</p>
            <p className="text-aesthetic-muted mb-6">Monthly per coach</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                <span className="text-aesthetic-medium">Unlimited clients</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                <span className="text-aesthetic-medium">
                  Advanced client management
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                <span className="text-aesthetic-medium">Progress tracking</span>
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
            <p className="text-aesthetic-muted mb-6">For coaching businesses</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                <span className="text-aesthetic-medium">
                  Multiple coach accounts
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                <span className="text-aesthetic-medium">Team management</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                <span className="text-aesthetic-medium">
                  Advanced analytics
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-aesthetic-accent" />
                <span className="text-aesthetic-medium">Priority support</span>
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
  );
}
