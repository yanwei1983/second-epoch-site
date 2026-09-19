'use client';
import { useRef, useState } from 'react';

export default function ReservationDialog({lang, onClose}) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const pending = useRef(false);
  const submissionId = useRef(null);
  const t = (zh, en) => lang === 'en' ? en : zh;
  const close = () => { if (!pending.current) onClose(); };
  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true; setBusy(true); setError('');
    const values = Object.fromEntries(new FormData(event.currentTarget));
    submissionId.current ||= crypto.randomUUID();
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...values, id: submissionId.current, language: lang}),
        signal: AbortSignal.timeout(20000)
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'unavailable');
      setDone(true);
    } catch (err) {
      setError(err.message === 'rate'
        ? t('提交较频繁，请一分钟后再试。', 'Please wait a minute before submitting again.')
        : t('暂时未能提交，你填写的内容仍保留，请稍后重试。', 'Unable to submit. Your text is still here; please try again.'));
    } finally { pending.current = false; setBusy(false); }
  }
  return <div className="join-dialog-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)close();}}>
    <section className="join-dialog" role="dialog" aria-modal="true" aria-labelledby="join-title">
      <button className="join-close" onClick={close} disabled={busy} aria-label={t('关闭预约窗口','Close registration')}><i className="fa-solid fa-xmark"/></button>
      {done ? <div className="join-success" role="status"><i className="fa-solid fa-check"/><span>RESERVATION RECEIVED</span><h2 id="join-title">{t('预约已收到','You’re registered')}</h2><p>{t('你的预约与留言已保存。感谢你与我们分享想法！','Your registration and message have been saved. Thank you for sharing your thoughts!')}</p><button onClick={close}>{t('完成','Done')}</button></div>
      : <form onSubmit={submit} aria-busy={busy}>
        <span>CAPTAIN REGISTRATION / 227</span><h2 id="join-title">{t('立即预约','Join the journey')}</h2>
        <p>{t('登记你的舰长身份，也留下想对我们说的话。','Register as a captain and share what’s on your mind.')}</p>
        <label htmlFor="join-name">{t('昵称','Nickname')}</label><input id="join-name" name="nickname" autoComplete="nickname" required maxLength={24} disabled={busy} placeholder={t('输入你的舰长昵称','Your captain nickname')}/>
        <label htmlFor="join-email">Email</label><input id="join-email" name="email" type="email" autoComplete="email" required maxLength={254} disabled={busy} placeholder="captain@example.com"/>
        <label htmlFor="join-message">{t('我对你们说','My message to you')} <small>{t('（选填）','(optional)')}</small></label>
        <textarea id="join-message" name="message" rows={4} maxLength={2000} disabled={busy} placeholder={t('期待、建议，或任何想告诉我们的事……','Your hopes, suggestions, or anything you’d like us to know…')}/>
        <div className="join-honeypot" aria-hidden="true"><label htmlFor="join-website">Website</label><input id="join-website" name="website" tabIndex={-1} autoComplete="off"/></div>
        <small className="join-privacy">{t('邮箱仅用于预约联系；留言仅团队可见。','Your email is used for registration updates. Messages are visible only to the team.')}</small>
        {error && <p className="join-error" role="alert">{error}</p>}
        <button type="submit" disabled={busy}>{busy ? t('正在提交…','Submitting…') : t('提交预约与留言','Submit registration & message')} {!busy&&<i className="fa-solid fa-arrow-right"/>}</button>
      </form>}
    </section>
  </div>;
}
