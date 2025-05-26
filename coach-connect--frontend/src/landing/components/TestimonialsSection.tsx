export function TestimonialsSection() {
  return (
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
            See what other fitness professionals are saying about CoachConnect.
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
                <p className="text-sm text-aesthetic-muted">Personal Trainer</p>
              </div>
            </div>
            <p className="text-aesthetic-medium">
              &quot;CoachConnect has transformed how I manage my clients. The
              interface is intuitive and saves me hours each week.&quot;
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
                <p className="text-sm text-aesthetic-muted">Fitness Coach</p>
              </div>
            </div>
            <p className="text-aesthetic-medium">
              &quot;Since using CoachConnect, I&#39;ve been able to focus more
              on coaching and less on administrative tasks.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
