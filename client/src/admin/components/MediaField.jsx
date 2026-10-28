import { useRef, useState } from 'react';
import { UploadCloud, FolderOpen, Trash2, Loader2, Film, FileText, FileArchive } from 'lucide-react';
import api, { errMsg } from '../../lib/api';
import { isVideo, isFile, isFileUrl, mediaUrl } from '../../lib/media';
import { usePopup } from '../context/PopupContext';
import MediaPicker from './MediaPicker';

const isPdf = isFile;

// Media library row -> value stored in section content
const mediaType = (m) => (m.resource_type === 'video' ? 'video' : m.resource_type === 'raw' || isFileUrl(m.url) || m.format === 'pdf' ? 'file' : 'image');
export const toMediaValue = (m, alt = '') => ({
  url: m.url, public_id: m.public_id, type: mediaType(m), alt: alt || m.alt || '',
});

// Card shown for documents (PDF / ZIP) instead of an image preview
export const FileCard = ({ url, label, asLink = true }) => {
  const zip = /\.zip(\?|$)/i.test(url || '') || url?.includes('/raw/upload/');
  const name = decodeURIComponent((url || '').split('/').pop()?.split('?')[0] || 'file');
  const Tag = asLink ? 'a' : 'div';
  const linkProps = asLink ? { href: url, target: '_blank', rel: 'noreferrer' } : {};
  return (
    <Tag className="adm-media__file" title={name} {...linkProps}>
      {zip ? <FileArchive size={34} /> : <FileText size={34} />}
      <span>{label || (zip ? 'ZIP file' : 'PDF file')}{asLink ? ' · open' : ''}</span>
      <small>{name}</small>
    </Tag>
  );
};

export const uploadFile = async (file, onProgress) => {
  const fd = new FormData();
  fd.append('file', file);
  const { data } = await api.post('/admin/media', fd, {
    onUploadProgress: (e) => onProgress?.(Math.round((e.loaded / (e.total || 1)) * 100)),
  });
  return data;
};

// Image/video field: upload to the media folder, pick from library, edit alt text
export default function MediaField({ value, onChange, accept = 'image/*' }) {
  const { notify } = usePopup();
  const input = useRef();
  const [progress, setProgress] = useState(null);
  const [picker, setPicker] = useState(false);

  const onFile = async (file) => {
    if (!file) return;
    setProgress(0);
    try {
      const m = await uploadFile(file, setProgress);
      onChange(toMediaValue(m, value?.alt));
    } catch (err) {
      notify.error(errMsg(err), 'Upload failed');
    } finally {
      setProgress(null);
      input.current.value = '';
    }
  };

  return (
    <div className="adm-media">
      <div className="adm-media__preview"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files[0]); }}>
        {progress !== null ? (
          <div className="adm-media__progress"><Loader2 className="adm-spin" size={26} /><span>Uploading {progress}%</span><i style={{ width: `${progress}%` }} /></div>
        ) : value?.url ? (
          isVideo(value) ? <video src={value.url} muted controls />
            : isPdf(value) ? <FileCard url={value.url} />
            : <img src={mediaUrl(value.url)} alt={value.alt || ''} />
        ) : (
          <div className="adm-media__empty" onClick={() => input.current.click()}>
            {accept.includes('video') ? <Film size={30} /> : /pdf|zip/.test(accept) ? <FileText size={30} /> : <UploadCloud size={30} />}
            <span>Drop a file here or click to upload</span>
          </div>
        )}
      </div>
      <div className="adm-media__side">
        <div className="adm-media__btns">
          <button type="button" className="adm-btn adm-btn--primary adm-btn--sm" onClick={() => input.current.click()} disabled={progress !== null}><UploadCloud size={15} />Upload</button>
          <button type="button" className="adm-btn adm-btn--soft adm-btn--sm" onClick={() => setPicker(true)}><FolderOpen size={15} />Library</button>
          {value?.url && <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onChange(null)}><Trash2 size={15} />Remove</button>}
        </div>
        {value?.url && !isVideo(value) && !isPdf(value) && (
          <label className="adm-field">
            <span className="adm-label">Alt text (SEO)</span>
            <input value={value.alt || ''} placeholder="Describe the image" onChange={(e) => onChange({ ...value, alt: e.target.value })} />
          </label>
        )}
        {value?.url && <small className="adm-hint adm-ellipsis" title={value.url}>{value.url}</small>}
      </div>
      <input ref={input} type="file" accept={accept} hidden onChange={(e) => onFile(e.target.files[0])} />
      {picker && (
        <MediaPicker type={accept.includes('video') && !accept.includes('image') ? 'video' : undefined}
          onClose={() => setPicker(false)} onPick={(m) => { onChange(toMediaValue(m, value?.alt)); setPicker(false); }} />
      )}
    </div>
  );
}
