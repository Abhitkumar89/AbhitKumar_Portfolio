import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Loader2, CheckCircle2, MapPin, Mail } from "lucide-react";
import SectionWrapper from "../components/SectionWrapper";
import SectionHeading from "../components/SectionHeading";
import MagneticButton from "../components/MagneticButton";
import SocialIcon from "../components/SocialIcon";
import { profile, socials, emailjsConfig } from "../data/content";

const isConfigured =
  emailjsConfig.serviceId &&
  !emailjsConfig.serviceId.startsWith("YOUR_") &&
  emailjsConfig.templateId &&
  !emailjsConfig.templateId.startsWith("YOUR_");

export default function Contact() {
  const formRef = useRef(null);
  // status: idle | sending | success | error
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("sending");

    try {
      if (isConfigured) {
        await emailjs.sendForm(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          formRef.current,
          { publicKey: emailjsConfig.publicKey },
        );
      } else {
        // Demo mode: no EmailJS keys yet, simulate a successful send.
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please email me directly.");
      setStatus("error");
    }
  };

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        eyebrow="06 / Contact"
        title="Let's build something"
        align="center"
      />

      <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
        {/* Left: blurb + socials */}
        <div className="flex flex-col gap-6">
          <p className="text-lg leading-relaxed text-slate-400">
            Have a project in mind, a question, or just want to say hi? My inbox
            is always open. I'll do my best to get back to you!
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl glass text-accent-pink">
                <Mail size={18} />
              </span>
              {profile.email}
            </a>
            <div className="flex items-center gap-3 text-slate-300">
              <span className="grid h-10 w-10 place-items-center rounded-xl glass text-accent-cyan">
                <MapPin size={18} />
              </span>
              {profile.location}
            </div>
          </div>

          <div className="mt-2 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-xl glass text-slate-300 transition-all hover:-translate-y-1 hover:border-accent-violet/50 hover:text-white hover:shadow-glow"
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl glass p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Name"
              name="user_name"
              type="text"
              placeholder="Jane Doe"
            />
            <Field
              label="Email"
              name="user_email"
              type="email"
              placeholder="jane@email.com"
            />
          </div>
          <Field
            label="Subject"
            name="subject"
            type="text"
            placeholder="Project inquiry"
          />
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="text-sm font-medium text-slate-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about your idea..."
              className="glass-2 resize-none rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-accent-violet/60"
            />
          </div>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 rounded-xl bg-accent-lime/15 px-4 py-3 font-medium text-accent-lime">
              <CheckCircle2 size={18} /> Message sent — thank you!
            </div>
          ) : (
            <MagneticButton
              type="submit"
              disabled={status === "sending"}
              strength={0.25}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-pink to-accent-violet px-6 py-3.5 font-semibold text-onaccent shadow-glow-pink disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={18} /> Send message
                </>
              )}
            </MagneticButton>
          )}

          {error && (
            <p className="text-center text-sm text-accent-pink">{error}</p>
          )}
        </form>
      </div>
    </SectionWrapper>
  );
}

function Field({ label, name, type, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="glass-2 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-accent-violet/60"
      />
    </div>
  );
}
