import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../lib/animations';
import { FadeUp } from './FadeUp';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  return (
    <section
      id="Contact"
      className="border-t border-white/[0.06] bg-black px-5 pt-20 pb-16 md:px-8 md:pt-32 md:pb-24"
    >
      <div className="mx-auto max-w-[800px]">
        <FadeUp>
          <div className="mb-6 flex items-baseline gap-8">
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-white/30">
              06 / Contact
            </span>
          </div>
          <h2 className="mb-6 font-serif text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] -tracking-[0.03em] text-white">
            Let's Build
            <br />
            <span className="text-white/25">Together</span>
          </h2>
          <p className="mb-16 max-w-[480px] font-sans text-base font-light leading-[1.7] text-white/40">
            Open to new projects, collaborations, and opportunities. Reach out and let's have a
            conversation.
          </p>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="mb-16 flex flex-wrap gap-8">
            <a
              href="mailto:zhaztedv@gmail.com"
              className="border-b border-white/20 pb-[2px] font-sans text-[0.85rem] text-white/60 no-underline transition-colors duration-200 hover:border-white hover:text-white"
            >
              zhaztedv@gmail.com ↗
            </a>
            <a
              href="https://github.com/Miraku17"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white/20 pb-[2px] font-sans text-[0.85rem] text-white/60 no-underline transition-colors duration-200 hover:border-white hover:text-white"
            >
              github.com/Miraku17 ↗
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="border border-white/15 p-12 text-center"
              >
                <div className="mb-3 font-serif text-3xl text-white">Message Received</div>
                <p className="font-sans text-[0.85rem] text-white/40">I'll be in touch shortly.</p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setForm({ name: '', email: '', message: '' });
                  }}
                  className="mt-6 cursor-pointer border-0 bg-transparent font-sans text-xs uppercase tracking-[0.1em] text-white/40 underline"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                  {(['name', 'email'] as const).map((field) => (
                    <div key={field}>
                      <label className="mb-2.5 block font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/35">
                        {field === 'name' ? 'Your Name' : 'Email'}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        value={form[field]}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [field]: e.target.value }))
                        }
                        required
                        className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 font-sans text-[0.95rem] text-white outline-none transition-colors duration-200 focus:border-white/60"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="mb-2.5 block font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/35">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                    rows={5}
                    className="w-full resize-y border border-white/10 bg-transparent p-4 font-sans text-[0.95rem] text-white outline-none transition-colors duration-200 focus:border-white/40"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`self-start cursor-pointer border-0 bg-white px-10 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.15em] text-black transition-opacity duration-200 ${
                    status === 'sending' ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeUp>
      </div>
    </section>
  );
};
