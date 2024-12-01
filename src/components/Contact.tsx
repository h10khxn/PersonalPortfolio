import React, { useState } from 'react';
import { Send } from 'lucide-react';
import emailjs from 'emailjs-com';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = {
      from_name: formState.name,
      from_email: formState.email,
      message: formState.message,
    };

    emailjs
      .send('service_yo42mm6', 'template_apklrji', templateParams, 'eom1943uSKtoTVMXh')
      .then(() => {
        setIsSent(true);
        setFormState({ name: '', email: '', message: '' });

        // Hide the notification after 3 seconds
        setTimeout(() => setIsSent(false), 3000);
      })
      .catch((error) => console.error('Failed to send email:', error))
      .finally(() => setIsSending(false));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Get In Touch</h2>

        {/* Centered Success Notification */}
        {isSent && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-600 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-500 opacity-100">
            <p className="font-medium">Message sent successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-colors"
                value={formState.name}
                onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-colors"
                value={formState.email}
                onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-colors"
              value={formState.message}
              onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors group"
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send Message'}
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
}
