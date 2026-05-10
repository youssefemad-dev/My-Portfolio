import { useEffect, useRef, useState, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import EarthCanvas from "@/components/EarthCanvas";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/youssefemad-dev",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/youssef-emad-10154727b/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:youssef.dev.84@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

function InputField({ id, label, type = "text", placeholder, value, onChange, error, required }) {
  return (
    <div className="contact-field-wrap">
      <label htmlFor={id} className="contact-label">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`contact-input ${error ? "contact-input--error" : ""}`}
        autoComplete={type === "email" ? "email" : "off"}
      />
      {error && <p className="contact-field-error">{error}</p>}
    </div>
  );
}

function Contact() {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    AOS.init({ duration: 800, once: true, throttleDelay: 99, offset: 60 });
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Message cannot be empty.";
    else if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters.";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/youssef.dev.84@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New Portfolio Message from ${form.name}`
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("FormSubmit error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="contact-section relative w-full min-h-screen py-24 px-6 overflow-hidden"
    >
      {/* ── Nebula blobs ── */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="contact-blob cb-1" />
        <div className="contact-blob cb-2" />
        <div className="contact-shooting" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-3 font-medium">
            ✦ Transmission Hub ✦
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-5">
            Get In <span className="contact-title-gradient">Touch</span>
          </h2>
          <div className="w-28 h-[2px] mx-auto rounded-full contact-divider" />
          <p className="mt-6 text-gray-400 text-lg max-w-xl mx-auto">
            Have a project in mind or just want to say hi? Send a transmission — I read every message.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="contact-grid">
          {/* ── LEFT — Form ── */}
          <div data-aos="fade-right">
            <div className="contact-card">
              {status === "sent" ? (
                /* Success state */
                <div className="contact-success">
                  <div className="contact-success-icon">🛰️</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Message Transmitted!
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="contact-reset-btn"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <div className="contact-form-grid">
                    <InputField
                      id="contact-name"
                      label="Your Name"
                      placeholder="Youssef Emad"
                      value={form.name}
                      onChange={handleChange("name")}
                      error={errors.name}
                      required
                    />
                    <InputField
                      id="contact-email"
                      label="Your Email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      error={errors.email}
                      required
                    />
                  </div>

                  <div className="contact-field-wrap mt-5">
                    <label htmlFor="contact-message" className="contact-label">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell me about your project or idea..."
                      value={form.message}
                      onChange={handleChange("message")}
                      required
                      className={`contact-input contact-textarea ${errors.message ? "contact-input--error" : ""}`}
                    />
                    {errors.message && (
                      <p className="contact-field-error">{errors.message}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="contact-send-error">
                      ⚠️ Something went wrong. Please try again or email me directly at{" "}
                      <a href="mailto:youssef.dev.84@gmail.com" className="text-cyan-400 underline">
                        youssef.dev.84@gmail.com
                      </a>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="contact-submit-btn"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="contact-spinner" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        Launch Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ── Social links ── */}
            <div className="contact-socials" data-aos="fade-up" data-aos-delay="150">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Earth ── */}
          <div
            className="contact-earth-wrap"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="earth-glow-ring" />
            <div className="earth-canvas-container">
              <Suspense
                fallback={
                  <div className="earth-fallback">
                    <div className="earth-fallback-orb" />
                    <p className="text-gray-500 text-xs mt-3">Loading Earth…</p>
                  </div>
                }
              >
                <EarthCanvas />
              </Suspense>
            </div>
            <p className="earth-caption">
              <span className="text-cyan-400">●</span> Live · Somewhere on Earth
            </p>
          </div>
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        /* ── Nebula blobs ── */
        .contact-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          will-change: transform;
        }
        .cb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(14,165,233,0.14) 0%, transparent 70%);
          top: -80px; right: -120px;
          animation: driftCB1 22s ease-in-out infinite alternate;
        }
        .cb-2 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(99,40,220,0.12) 0%, transparent 70%);
          bottom: 60px; left: -100px;
          animation: driftCB2 18s ease-in-out infinite alternate-reverse;
        }
        @keyframes driftCB1 { from{transform:translate(0,0)} to{transform:translate(-30px,25px)} }
        @keyframes driftCB2 { from{transform:translate(0,0)} to{transform:translate(25px,-20px)} }

        .contact-shooting {
          position: absolute;
          top: 30%; left: 0;
          width: 140px; height: 1.5px;
          background: linear-gradient(90deg, transparent, #38bdf8 60%, transparent);
          border-radius: 2px;
          will-change: transform, opacity;
          animation: shootContact 10s linear infinite;
        }
        @keyframes shootContact {
          0%   { transform: translateX(-10px) rotate(-12deg); opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateX(110vw) rotate(-12deg); opacity: 0; }
        }

        /* ── Title ── */
        .contact-title-gradient {
          background: linear-gradient(135deg, #38bdf8, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-divider {
          background: linear-gradient(90deg, #38bdf8, #a78bfa);
        }

        /* ── Grid ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        /* ── Card ── */
        .contact-card {
          position: relative;
          background: rgba(10, 10, 35, 0.88);
          border: 1px solid rgba(56, 189, 248, 0.12);
          border-radius: 1.25rem;
          padding: 2rem;
          transition: border-color 0.3s ease;
        }
        .contact-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: 0 0 30px rgba(56, 189, 248, 0.08);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: -1;
        }
        .contact-card:focus-within {
          border-color: rgba(56, 189, 248, 0.35);
        }
        .contact-card:focus-within::before {
          opacity: 1;
        }

        /* ── Form grid (name + email side by side) ── */
        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .contact-form-grid { grid-template-columns: 1fr 1fr; }
        }

        /* ── Field ── */
        .contact-field-wrap { display: flex; flex-direction: column; gap: 0.35rem; }
        .contact-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #9ca3af;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.6rem;
          padding: 0.65rem 0.9rem;
          color: #f1f5f9;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease;
          font-family: inherit;
        }
        .contact-input::placeholder { color: #4b5563; }
        .contact-input:focus {
          border-color: rgba(56, 189, 248, 0.6);
          background: rgba(56, 189, 248, 0.04);
          outline: 3px solid rgba(56, 189, 248, 0.08);
        }
        .contact-input--error {
          border-color: rgba(239, 68, 68, 0.6) !important;
          outline: 3px solid rgba(239, 68, 68, 0.06) !important;
        }
        .contact-textarea { resize: vertical; min-height: 120px; }
        .contact-field-error {
          font-size: 0.72rem;
          color: #f87171;
          margin-top: 2px;
        }

        .contact-submit-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          width: 100%;
          padding: 0.75rem 1.5rem;
          border-radius: 0.7rem;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #0a0a1e;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          border: none;
          cursor: pointer;
          transition: opacity 0.25s ease, transform 0.2s ease;
          will-change: transform;
        }
        .contact-submit-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: 0 8px 24px rgba(56, 189, 248, 0.35);
          opacity: 0;
          transition: opacity 0.25s ease;
          z-index: -1;
        }
        .contact-submit-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-2px);
        }
        .contact-submit-btn:hover:not(:disabled)::before {
          opacity: 1;
        }
        .contact-submit-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        /* ── Spinner ── */
        .contact-spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(10,10,30,0.3);
          border-top-color: #0a0a1e;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Error message ── */
        .contact-send-error {
          margin-top: 0.75rem;
          padding: 0.6rem 0.9rem;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 0.5rem;
          font-size: 0.8rem;
          color: #fca5a5;
        }

        /* ── Success state ── */
        .contact-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1rem;
        }
        .contact-success-icon {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          animation: floatIcon 3s ease-in-out infinite;
        }
        @keyframes floatIcon {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        .contact-reset-btn {
          padding: 0.55rem 1.4rem;
          border-radius: 9999px;
          border: 1px solid rgba(56,189,248,0.5);
          color: #38bdf8;
          background: rgba(56,189,248,0.06);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.25s ease, box-shadow 0.25s ease;
        }
        .contact-reset-btn:hover {
          background: rgba(56,189,248,0.14);
          box-shadow: 0 0 12px rgba(56,189,248,0.3);
        }

        /* ── Social links ── */
        .contact-socials {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 1.25rem;
        }
        .contact-social-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.9rem;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.1);
          color: #9ca3af;
          font-size: 0.78rem;
          font-weight: 500;
          text-decoration: none;
          background: rgba(255,255,255,0.03);
          transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease, transform 0.2s ease;
          will-change: transform;
        }
        .contact-social-btn:hover {
          color: #38bdf8;
          border-color: rgba(56,189,248,0.4);
          background: rgba(56,189,248,0.06);
          transform: translateY(-2px);
        }

        /* ── Earth column ── */
        .contact-earth-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 420px;
        }
        .earth-glow-ring {
          position: absolute;
          width: 340px; height: 340px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%);
          filter: blur(30px);
          pointer-events: none;
        }
        .earth-canvas-container {
          width: 340px;
          height: 340px;
          position: relative;
          z-index: 1;
        }
        .earth-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .earth-fallback-orb {
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #1565c0, #0d47a1, #01579b, #0a0a30);
          box-shadow: 0 0 40px rgba(21,101,192,0.4);
          animation: earthPulse 3s ease-in-out infinite;
        }
        @keyframes earthPulse {
          0%,100% { box-shadow: 0 0 40px rgba(21,101,192,0.4); }
          50%      { box-shadow: 0 0 60px rgba(21,101,192,0.6); }
        }
        .earth-caption {
          margin-top: 1rem;
          font-size: 0.75rem;
          color: #4b5563;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          letter-spacing: 0.05em;
        }

        /* ── Footer divider ── */
        .contact-section::after {
          content: '';
          display: block;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.15), transparent);
          margin-top: 5rem;
        }
      `}</style>
    </section>
  );
}

export default Contact;
