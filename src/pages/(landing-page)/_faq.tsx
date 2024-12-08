export default function FAQ() {
  return (
    <section
      id="faq"
      className="px-6 flex items-center justify-center min-h-dvh bg-gray-50"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              question:
                "How does Syncly compare to other task management tools?",
              answer:
                "Syncly combines the best features of popular tools like Jira and Trello, offering a user-friendly interface with powerful capabilities for both individuals and teams.",
            },
            {
              question: "Can I use Syncly for free?",
              answer:
                "Yes, Syncly always be free for individuals and small teams.",
            },
            {
              question: "Is my data secure with Syncly?",
              answer:
                "Absolutely. We use industry-standard encryption and security measures to protect your data. Our Enterprise plan offers additional advanced security features.",
            },
            {
              question: "How can I get started with Syncly?",
              answer:
                "Simply sign up for an account, and you can start creating tasks and projects immediately. No credit card required.",
            },
          ].map((item, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
