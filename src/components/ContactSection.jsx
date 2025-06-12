import { useState } from "react";
import { toast } from "react-toastify";
import { Mail, Loader2 } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("https://excelanalytics-backend-l7ql.onrender.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const json = await res.json();
    setLoading(false);

    if (json.success) {
      toast.success("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } else {
      toast.error("❌ Failed to send message.");
    }
  };

  return (
    <section
      id="contact"
      className="py-16 px-4 bg-gradient-to-r from-indigo-100 to-indigo-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Mail className="text-indigo-600 dark:text-indigo-300 w-6 h-6 animate-bounce" />
          <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-600 dark:text-indigo-300">
            Contact Us
          </h2>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          We'd love to hear your feedback, ideas, or suggestions! Fill out the form below and we'll get back to you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md flex justify-center items-center gap-2 shadow transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
