import { useEffect, useRef, useState } from 'react';
import { Images, UploadCloud, Copy, Trash2, PlayCircle, Loader2, Check } from 'lucide-react';
import api, { errMsg } from '../../lib/api';
import { mediaUrl, isFileUrl } from '../../lib/media';
import { FileCard } from '../components/MediaField';
import { usePopup } from '../context/PopupContext';
import { uploadFile } from '../components/MediaField';
import PageHeader from '../components/PageHeader';

const size = (b) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.round((b || 0) / 1024)} KB`);

export default function MediaLibrary() {
  const { notify, confirm } = usePopup();
  const input = useRef();
  const [items, setItems] = useState(null);
  const [type, setType] = useState('all');
  const [uploading, setUploading] = useState(null);
  const [copied, setCopied] = useState(null);
  const [drag, setDrag] = useState(false);

  const load = () => api.get('/admin/media').then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const upload = async (files) => {
    const list = [...files];
    if (!list.length) return;
    let done = 0;
    try {
      for (const f of list) {
        setUploading({ name: f.name, index: done + 1, total: list.length, pct: 0 });
        await uploadFile(f, (pct) => setUploading((u) => ({ ...u, pct })));
        done++;
      }
      notify.success('Upload complete', `${done} file${done > 1 ? 's' : ''} uploaded to the media folder.`);
    } catch (err) {
      notify.error(errMsg(err), 'Upload failed');
    } finally {
      setUploading(null);
      input.current.value = '';
      load();
    }
  };

  const remove = async (m) => {
    if (!(await confirm({ title: 'Delete this file?', message: 'It will be removed from the media folder and the database. Sections still using it will show an empty image.' }))) return;
    try {
      await api.delete(`/admin/media/${m.id}`);
      setItems(items.filter((x) => x.id !== m.id));
      notify.success('File deleted', 'Removed from the media folder.');
    } catch (err) { notify.error(errMsg(err)); }
  };

  const saveAlt = async (m, alt) => {
    if (alt === (m.alt || '')) return;
    try {
      await api.put(`/admin/media/${m.id}`, { alt });
      setItems(items.map((x) => (x.id === m.id ? { ...x, alt } : x)));
      notify.success('Alt text saved');
    } catch (err) { notify.error(errMsg(err)); }
  };

  const copy = (m) => { navigator.clipboard.writeText(m.url); setCopied(m.id); setTimeout(() => setCopied(null), 1500); };
  const shown = (items || []).filter((m) => type === 'all' || m.resource_type === type);

  return (
    <div className="adm-page">
      <PageHeader icon={Images} title="Media Library" subtitle="Images, videos and brochures in the server media folder. Uploads are also backed up in the database, so they survive a redeploy.">
        <button className="adm-btn adm-btn--primary" onClick={() => input.current.click()} disabled={!!uploading}><UploadCloud size={17} />Upload files</button>
      </PageHeader>
      <input ref={input} type="file" multiple accept="image/*,video/*,application/pdf,.zip" hidden onChange={(e) => upload(e.target.files)} />

      <div className={`adm-drop${drag ? ' over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files); }}
        onClick={() => !uploading && input.current.click()}>
        {uploading ? (
          <><Loader2 className="adm-spin" size={28} /><strong>Uploading {uploading.index}/{uploading.total} · {uploading.pct}%</strong><span>{uploading.name}</span></>
        ) : (
          <><UploadCloud size={30} /><strong>Drag & drop images or videos here</strong><span>or click to browse · images, videos, PDF or ZIP · max 100 MB per file</span></>
        )}
      </div>

      <div className="adm-card">
        <div className="adm-toolbar">
          <div className="adm-pills">
            {['all', 'image', 'video', 'raw'].map((t) => (
              <button key={t} className={`adm-pill${type === t ? ' active' : ''}`} onClick={() => setType(t)}>
                {t === 'all' ? 'All files' : t === 'raw' ? 'Documents' : `${t}s`}<b>{(items || []).filter((m) => t === 'all' || m.resource_type === t).length}</b>
              </button>
            ))}
          </div>
        </div>
        {!items ? <div className="adm-center"><span className="adm-spinner" /></div>
          : !shown.length ? <div className="adm-empty"><Images size={34} /><p>No files yet.</p></div>
          : (
            <div className="adm-media-grid">
              {shown.map((m) => (
                <div key={m.id} className="adm-media-card">
                  <div className="adm-media-card__thumb">
                    {m.resource_type === 'video'
                      ? <><video src={m.url} muted /><PlayCircle className="adm-picker-item__play" /></>
                      : (m.resource_type === 'raw' || isFileUrl(m.url) || m.format === 'pdf')
                      ? <FileCard url={m.url} label={(m.format || 'file').toUpperCase()} />
                      : <img src={mediaUrl(m.url)} alt={m.alt || ''} loading="lazy" />}
                    <div className="adm-media-card__tools">
                      <button className="adm-icon-btn" onClick={() => copy(m)} title="Copy URL">{copied === m.id ? <Check size={16} /> : <Copy size={16} />}</button>
                      <button className="adm-icon-btn adm-icon-btn--danger" onClick={() => remove(m)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <div className="adm-media-card__info">
                    <strong title={m.original_name}>{m.original_name || m.public_id}</strong>
                    <small>{m.format?.toUpperCase()} · {size(m.bytes)}{m.width ? ` · ${m.width}×${m.height}` : ''}</small>
                    {m.resource_type === 'image' && (
                      <input className="adm-media-card__alt" placeholder="Alt text…" defaultValue={m.alt || ''} onBlur={(e) => saveAlt(m, e.target.value)} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
