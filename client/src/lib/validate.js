// Shared enquiry-form validation (the server repeats the same checks).

// Keep only digits while typing; at most 10 (Indian mobile number)
export const digitsOnly = (v, max = 10) => String(v || '').replace(/\D/g, '').slice(0, max);

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;

export const rules = {
  name: (v) => {
    const s = String(v || '').trim();
    if (!s) return 'Please enter your full name.';
    if (s.length < 2) return 'Name must be at least 2 characters.';
    if (s.length > 80) return 'Name must be under 80 characters.';
    if (!/^[A-Za-zÀ-ɏ஀-௿][A-Za-zÀ-ɏ஀-௿ .'-]*$/.test(s)) return 'Use letters only (spaces, dots and hyphens are fine).';
    return '';
  },
  email: (v) => {
    const s = String(v || '').trim();
    if (!s) return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(s)) return 'Enter a valid email, e.g. name@company.com';
    return '';
  },
  phone: (v) => {
    const s = String(v || '');
    if (!s) return 'Please enter your mobile number.';
    if (!/^\d+$/.test(s)) return 'Numbers only, please.';
    if (s.length !== 10) return `Mobile number must be 10 digits (${s.length}/10).`;
    if (!/^[6-9]/.test(s)) return 'Enter a valid Indian mobile number starting with 6, 7, 8 or 9.';
    return '';
  },
  service: (v) => (v ? '' : 'Please choose the service you need.'),
  message: (v) => {
    const s = String(v || '').trim();
    if (!s) return 'Please describe your project.';
    if (s.length < MESSAGE_MIN) return `Please add a little more detail (at least ${MESSAGE_MIN} characters).`;
    if (s.length > MESSAGE_MAX) return `Please keep it under ${MESSAGE_MAX} characters.`;
    return '';
  },
};

// Validate the given keys; returns { key: message } for failures only
export const validate = (form, keys) =>
  keys.reduce((errs, k) => {
    const msg = rules[k]?.(form[k]);
    if (msg) errs[k] = msg;
    return errs;
  }, {});
