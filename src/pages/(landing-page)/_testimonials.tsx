export default function Testimonials() {
  return (
    <section className="px-6 flex items-center justify-center min-h-dvh bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "Product Manager",
              quote:
                "Syncly has revolutionized how our team collaborates. It's intuitive and powerful!",
            },
            {
              name: "Sarah Lee",
              role: "Freelance Designer",
              quote:
                "As a solo entrepreneur, Syncly keeps me organized and on top of my projects.",
            },
            {
              name: "Team Innovate",
              role: "Tech Startup",
              quote:
                "Syncly scales seamlessly with our growing team. It's our go-to for project management.",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-muted-foreground mb-4">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="bg-primary/10 rounded-full p-2 mr-4">
                  <span className="text-xl font-semibold text-primary">
                    {testimonial.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
