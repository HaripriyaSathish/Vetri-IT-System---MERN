import { useState } from 'react';
import { KeyRound, Lock, Eye, EyeOff, Loader2, ShieldCheck, User } from 'lucide-react';
import api, { errMsg } from '../../lib/api';
import { useAuth } from '../context/AuthContext';
import { usePopup } from '../context/PopupContext';
import PageHeader from '../components/PageHeader';

const strength = (p) => {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
};
const levels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];

function PasswordInput({ label, value, onChange, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <label className="adm-field">
      <span className="adm-label">{label}</span>
      <div className="adm-input-icon"><Lock size={18} />
        <input type={show ? 'text' : 'password'} value={value} autoComplete={autoComplete} required onChange={(e) => onChange(e.target.value)} />
        <button type="button" className="adm-input-icon__eye" onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
      </div>
    </label>
  );
}

export default function Account() {
  const { admin } = useAuth();
  const { notify } = usePopup();
  const [f, setF] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [saving, setSaving] = useState(false);
  const s = strength(f.newPassword);

  const submit = async (e) => {
    e.preventDefault();
    if (f.newPassword.length < 6) return notify.error('New password must be at least 6 characters.', 'Password too short');
    if (f.newPassword !== f.confirm) return notify.error('New password and confirm password do not match.', 'Passwords do not match');
    setSaving(true);
    try {
      await api.put('/auth/password', { currentPassword: f.currentPassword, newPassword: f.newPassword });
      setF({ currentPassword: '', newPassword: '', confirm: '' });
      notify.success('Password changed', 'Use your new password the next time you sign in.');
    } catch (err) { notify.error(errMsg(err)); } finally { setSaving(false); }
  };

  return (
    <div className="adm-page">
      <PageHeader icon={KeyRound} title="Account & Password" subtitle="Manage your admin sign-in." />
      <div className="adm-two adm-two--account">
        <section className="adm-card adm-profile">
          <span className="adm-avatar adm-avatar--xl">{admin?.username?.[0]?.toUpperCase()}</span>
          <h3>{admin?.display_name || 'Administrator'}</h3>
          <p className="adm-profile__user"><User size={15} />@{admin?.username}</p>
          <div className="adm-profile__note"><ShieldCheck size={18} />
            <span>The first admin login comes from <code>ADMIN_USERNAME</code> / <code>ADMIN_PASSWORD</code> in <code>server/.env</code>. Once you change the password here, it is stored securely (hashed) in MySQL.</span>
          </div>
        </section>

        <form className="adm-card adm-pass" onSubmit={submit}>
          <h3>Change password</h3>
          <PasswordInput label="Current password" value={f.currentPassword} autoComplete="current-password" onChange={(v) => setF({ ...f, currentPassword: v })} />
          <PasswordInput label="New password" value={f.newPassword} autoComplete="new-password" onChange={(v) => setF({ ...f, newPassword: v })} />
          {f.newPassword && (
            <div className={`adm-strength adm-strength--${s}`}>
              <div>{[0, 1, 2, 3].map((i) => <i key={i} className={i < s ? 'on' : ''} />)}</div>
              <span>{levels[f.newPassword.length < 6 ? 0 : Math.max(1, s)]}</span>
            </div>
          )}
          <PasswordInput label="Confirm new password" value={f.confirm} autoComplete="new-password" onChange={(v) => setF({ ...f, confirm: v })} />
          {f.confirm && f.confirm !== f.newPassword && <small className="adm-error-text">Passwords do not match</small>}
          <button className="adm-btn adm-btn--primary adm-btn--lg" disabled={saving}>
            {saving ? <Loader2 className="adm-spin" size={18} /> : <KeyRound size={18} />}Update password
          </button>
        </form>
      </div>
    </div>
  );
}
