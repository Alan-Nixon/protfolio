"use client";

export default function IntegratedApi() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Integrated APIs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          "Stripe",
          "Twilio",
          "Google Maps",
          "SendGrid",
          "AWS S3",
          "OpenAI",
        ].map((api) => (
          <div
            key={api}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{api} API</h3>
            <p className="text-gray-600">
              Integrated {api} API for enhanced functionality in various
              projects.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
