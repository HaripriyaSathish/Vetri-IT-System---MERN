import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, LogIn, Loader2, ShieldCheck, LayoutTemplate, Images, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api, { errMsg } from '../../lib/api';
import { mediaUrl } from '../../lib/media';
import LoginIllustration from '../components/LoginIllustration';

const LOGO = '/media/branding/SB_Interior_LLC_-_Login.png';
const LIVE = '/media';
const fallback = [`${LIVE}/sections/herobanner.png`, `${LIVE}/sections/aboutimg.png`, `${LIVE}/team.png`, `${LIVE}/office.png`];

// Collage uses the same images as the website (hero, about, team, office), so it follows admin changes
const pickImages = (sections = []) => {
  const c = Object.fromEntries(sections.map((s) => [s.section_key, s.content || {}]));
  const urls = [c.hero?.background, c.about?.image, c.team?.image, c.about?.image_secondary]
    .map((m, i) => (m?.url && m.type !== 'video' ? m.url : fallback[i]));
  return urls;
};

export default function Login() {
  const { token, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState(fallback);

  useEffect(() => {
    api.get('/pages/home').then((r) => setImages(pickImages(r.data.sections))).catch(() => {});
  }, []);

  if (token) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username.trim(), form.password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(errMsg(err));
    } finally { setLoading(false); }
  };

  return (
    <div className="adm-login">
      <div className="adm-login__bg" style={{ backgroundImage: `url(${mediaUrl(images[0])})` }} />
      <div className="adm-login__orb adm-login__orb--1" />
      <div className="adm-login__orb adm-login__orb--2" />
      <div className="adm-login__orb adm-login__orb--3" />
      <div className="adm-login__grid" />

      <div className="adm-login__wrap">
        {/* Left: brand + image collage */}
        <section className="adm-login__brand">
          <div className="adm-login__head">
            <img src={LOGO} alt="Vetri IT Systems" className="adm-login__logo" />
            <div>
              <span className="adm-login__chip"><Sparkles size={13} />Admin Console</span>
              <h1>Vetri IT <span>Systems</span></h1>
            </div>
          </div>
          <p className="adm-login__lead">Manage every section of your website — content, images, videos and SEO — from one place.</p>

          <div className="adm-collage"><LoginIllustration /></div>

          <ul className="adm-login__features">
            <li><LayoutTemplate size={16} />Page-wise sections</li>
            <li><Images size={16} />Media library</li>
            <li><ShieldCheck size={16} />Secure access</li>
          </ul>
        </section>

        {/* Right: form */}
        <section className="adm-login__panel">
          <form className="adm-login__form" onSubmit={submit}>
            <div className="adm-login__form-icon"><Lock size={24} /></div>
            <h2>Welcome back <span className="adm-wave">👋</span></h2>
            <p className="adm-muted">Sign in with your admin username and password.</p>

            <label className="adm-field">
              <span className="adm-label">Username</span>
              <div className="adm-input-icon"><User size={18} />
                <input autoFocus autoComplete="username" required value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Enter username" />
              </div>
            </label>
            <label className="adm-field">
              <span className="adm-label">Password</span>
              <div className="adm-input-icon"><Lock size={18} />
                <input type={show ? 'text' : 'password'} autoComplete="current-password" required value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter password" />
                <button type="button" className="adm-input-icon__eye" onClick={() => setShow(!show)} aria-label="Show password">
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {error && <div className="adm-alert adm-alert--error">{error}</div>}

            <button className="adm-btn adm-btn--primary adm-btn--lg adm-btn--block adm-login__submit" disabled={loading}>
              {loading ? <Loader2 className="adm-spin" size={18} /> : <LogIn size={18} />}Sign in to dashboard
            </button>
            <div className="adm-login__secure"><ShieldCheck size={15} />Protected admin area · Encrypted session</div>
          </form>
          <small className="adm-login__copy">© {new Date().getFullYear()} Vetri IT Systems Private Limited</small>
        </section>
      </div>
    </div>
  );
}
