import { useState, type FormEvent, useEffect } from 'react';
import { useLang } from '../LangContext';
import { CheckCircle2, X, Mail, User, Phone, ShieldCheck, Award, Globe2, CalendarClock, Sparkles } from 'lucide-react';

export default function Consultation() {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (id: string) =>
    setConcerns((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const hasEmail = email.trim().length > 0;
    const hasPhone = phone.trim().length > 0;
    if (!hasEmail && !hasPhone) {
      setError(t.consult.contactRequired);
      return;
    }
    if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.consult.emailInvalid);
      return;
    }
    if (concerns.length === 0) {
      setError(t.consult.selectOne);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/xaqrabyn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          _replyto: email,
          email,
          phone,
          concerns: concerns.join('、'),
        }),
      });
      if (!res.ok) throw new Error('Formspree submit failed');
      setSuccess(true);
      setOpen(false);
      setName('');
      setEmail('');
      setPhone('');
      setConcerns([]);
    } catch {
      setError(t.consult.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (open || success) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, success]);

  return (
    <section id="consult" className="relative py-14 lg:py-20 bg-slate-50 border-t border-slate-800/60">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.3em] text-gold-600 uppercase">
            {t.consult.eyebrow}
          </div>
          <h2 className="mt-4 font-serif-display text-3xl md:text-4xl lg:text-5xl text-navy-900 leading-tight">
            {t.consult.title}
          </h2>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">{t.consult.subtitle}</p>

          <button
            onClick={() => setOpen(true)}
            className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold hover:shadow-gold-glow transition-all"
          >
            <CalendarClock className="w-4 h-4" />
            {t.consult.submit}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/85 backdrop-blur-sm animate-fade-in p-4 overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full my-8 p-8 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 border border-gold-500/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 flex items-center justify-center w-9 h-9 rounded-full bg-navy-800 border border-slate-700/60 text-slate-400 hover:text-white hover:border-gold-500/60 transition-colors"
              aria-label={t.cases.modalClose}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <h3 className="font-serif-display text-2xl text-white leading-snug">
                  {t.consult.title}
                </h3>

                <form onSubmit={onSubmit} className="mt-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-navy-200">
                      {t.consult.name}
                    </label>
                    <div className="mt-2 flex items-center rounded-lg border border-slate-700 bg-navy-950/60 focus-within:border-gold-500 transition-colors">
                      <User className="w-4 h-4 ml-4 text-slate-400" />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.consult.namePlaceholder}
                        className="w-full bg-transparent px-3 py-3 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-200">
                      {t.consult.email}
                    </label>
                    <div className="mt-2 flex items-center rounded-lg border border-slate-700 bg-navy-950/60 focus-within:border-gold-500 transition-colors">
                      <Mail className="w-4 h-4 ml-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.consult.emailPlaceholder}
                        className="w-full bg-transparent px-3 py-3 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-200">
                      {t.consult.phone}
                    </label>
                    <div className="mt-2 flex items-center rounded-lg border border-slate-700 bg-navy-950/60 focus-within:border-gold-500 transition-colors">
                      <Phone className="w-4 h-4 ml-4 text-slate-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.consult.phonePlaceholder}
                        className="w-full bg-transparent px-3 py-3 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-200">
                      {t.consult.concerns}
                    </label>
                    <div className="mt-3 grid sm:grid-cols-2 gap-2.5">
                      {t.consult.concernOptions.map((opt) => {
                        const active = concerns.includes(opt.id);
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => toggle(opt.id)}
                            className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all ${
                              active
                                ? 'border-gold-500 bg-gold-500/15'
                                : 'border-slate-700 bg-navy-950/60 hover:border-slate-500'
                            }`}
                          >
                            <span
                              className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded border transition-colors ${
                                active ? 'bg-gold-500 border-gold-500' : 'border-slate-500'
                              }`}
                            >
                              {active && <CheckCircle2 className="w-4 h-4 text-navy-950" />}
                            </span>
                            <span>
                              <span className="block text-sm font-medium text-white">
                                {opt.label}
                              </span>
                              <span className="block text-xs text-slate-400">{opt.desc}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold hover:shadow-gold-glow transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? t.consult.submitting : t.consult.submit}
                  </button>
                </form>
              </div>

              <div className="p-7 rounded-2xl bg-navy-800/60 text-white self-start">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold-500/15 border border-gold-500/40">
                    <Sparkles className="w-7 h-7 text-gold-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.2em] text-gold-400 uppercase">
                      {t.consult.founderTitle}
                    </div>
                    <div className="mt-1 font-serif-display text-2xl">{t.consult.founderName}</div>
                  </div>
                </div>
                <p className="mt-6 text-slate-300 leading-relaxed">{t.consult.founderBio}</p>

                <div className="mt-8 space-y-3">
                  {[
                    { icon: Award, text: t.consult.credential1 },
                    { icon: Globe2, text: t.consult.credential2 },
                    { icon: ShieldCheck, text: t.consult.credential3 },
                  ].map((cr, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-200">
                      <cr.icon className="w-4 h-4 text-gold-500" strokeWidth={1.5} />
                      {cr.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/80 backdrop-blur-sm animate-fade-in p-4">
          <div className="relative max-w-md w-full p-8 rounded-2xl bg-navy-900 border border-gold-500/40 shadow-2xl text-center">
            <button
              onClick={() => setSuccess(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/15 border border-gold-500/40">
              <CheckCircle2 className="w-8 h-8 text-gold-400" />
            </div>
            <h3 className="mt-6 font-serif-display text-2xl text-white">{t.consult.successTitle}</h3>
            <p className="mt-3 text-slate-300 leading-relaxed">{t.consult.successBody}</p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-7 px-6 py-2.5 rounded-lg border border-slate-600 text-slate-200 hover:border-gold-500 hover:text-gold-300 transition-colors"
            >
              {t.consult.successClose}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
