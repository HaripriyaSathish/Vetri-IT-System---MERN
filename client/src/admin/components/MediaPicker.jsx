import { useEffect, useState } from 'react';
import { X, Images, PlayCircle } from 'lucide-react';
import api from '../../lib/api';
import { mediaUrl, isFileUrl } from '../../lib/media';
import { FileCard } from './MediaField';

export default function MediaPicker({ onPick, onClose, type }) {
  const [items, setItems] = useState(null);
  useEffect(() => { api.get('/admin/media', { params: { type } }).then((r) => setItems(r.data)); }, [type]);

  return (
    <div className="adm-modal" onClick={onClose}>
      <div className="adm-modal__box adm-modal__box--wide" onClick={(e) => e.stopPropagation()}>
        <div className="adm-modal__head">
          <h3><Images size={20} />Choose from Media Library</h3>
          <button type="button" className="adm-icon-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="adm-modal__body">
          {!items ? <div className="adm-center"><span className="adm-spinner" /></div>
            : !items.length ? <p className="adm-empty-text">No files yet. Use “Upload” to add your first file.</p>
            : (
              <div className="adm-picker-grid">
                {items.map((m) => (
                  <button type="button" key={m.id} className="adm-picker-item" onClick={() => onPick(m)} title={m.original_name}>
                    {m.resource_type === 'video'
                      ? <><video src={m.url} muted /><PlayCircle className="adm-picker-item__play" /></>
                      : (m.resource_type === 'raw' || isFileUrl(m.url) || m.format === 'pdf')
                      ? <FileCard url={m.url} label={(m.format || 'file').toUpperCase()} asLink={false} />
                      : <img src={mediaUrl(m.url)} alt={m.alt || ''} />}
                  </button>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
