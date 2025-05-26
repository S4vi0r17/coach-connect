import { CheckCircle } from 'lucide-react';

export function FeaturesSection() {
  return (
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
            CoachConnect provides all the tools you need to grow your coaching
            business and deliver exceptional service to your clients.
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
              Keep your client data safe and secure with our protected platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
