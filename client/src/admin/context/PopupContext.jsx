import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, X } from 'lucide-react';

// Centered confirmation popup after every save/delete, plus a promise-based confirm dialog.
const PopupContext = createContext(null);

export function PopupProvider({ children }) {
  const [popup, setPopup] = useState(null);
  const [dialog, setDialog] = useState(null);
  const timer = useRef();

  const show = useCallback((type, title, message) => {
    clearTimeout(timer.current);
    setPopup({ type, title, message, id: Date.now() });
    timer.current = setTimeout(() => setPopup(null), type === 'success' ? 2200 : 4000);
  }, []);

  const notify = {
    success: (title = 'Changes saved', message = 'Your updates are now live on the website.') => show('success', title, message),
    error: (message, title = 'Something went wrong') => show('error', title, message),
  };

  const confirm = (opts) => new Promise((resolve) => setDialog({ ...opts, resolve }));
  const closeDialog = (val) => { dialog?.resolve(val); setDialog(null); };

  return (
    <PopupContext.Provider value={{ notify, confirm }}>
      {children}

      {popup && (
        <div className="adm-popup-layer" onClick={() => setPopup(null)}>
          <div key={popup.id} className={`adm-popup adm-popup--${popup.type}`} role="alertdialog" onClick={(e) => e.stopPropagation()}>
            <button className="adm-popup__close" onClick={() => setPopup(null)} aria-label="Close"><X size={16} /></button>
            <div className="adm-popup__icon">{popup.type === 'success' ? <CheckCircle2 size={44} /> : <XCircle size={44} />}</div>
            <h3>{popup.title}</h3>
            {popup.message && <p>{popup.message}</p>}
            <span className="adm-popup__bar" />
          </div>
        </div>
      )}

      {dialog && (
        <div className="adm-popup-layer adm-popup-layer--dim">
          <div className="adm-popup adm-popup--confirm" role="alertdialog">
            <div className="adm-popup__icon"><AlertTriangle size={40} /></div>
            <h3>{dialog.title || 'Are you sure?'}</h3>
            {dialog.message && <p>{dialog.message}</p>}
            <div className="adm-popup__actions">
              <button className="adm-btn adm-btn--ghost" onClick={() => closeDialog(false)}>Cancel</button>
              <button className="adm-btn adm-btn--danger" onClick={() => closeDialog(true)}>{dialog.confirmText || 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
}

export const usePopup = () => useContext(PopupContext);
