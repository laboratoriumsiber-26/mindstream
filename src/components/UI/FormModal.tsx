import React, { useState, useEffect } from 'react';
import { RowData, useAppContext } from '../../context/AppContext';
import { tableConfigs } from '../../utils/config';

interface FormModalProps {
  pageId: string;
  initialData?: RowData;
  onClose: () => void;
  onSubmit: (data: RowData) => void;
}

const FormModal: React.FC<FormModalProps> = ({ pageId, initialData, onClose, onSubmit }) => {
  const { state } = useAppContext();
  const [formData, setFormData] = useState<RowData>({});
  const [narasumberList, setNarasumberList] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
      if (pageId === 'podcast' && initialData['c3_raw']) {
         setNarasumberList(initialData['c3_raw'].split(',').map(s => s.trim()));
      }
    }
  }, [initialData, pageId]);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const updateNarasumber = (index: number, val: string) => {
    const newList = [...narasumberList];
    newList[index] = val;
    setNarasumberList(newList);
    handleChange('c3_raw', newList.filter(Boolean).join(', '));
  };

  const addNarasumber = () => {
    setNarasumberList([...narasumberList, '']);
  };

  const removeNarasumber = (index: number) => {
    const newList = narasumberList.filter((_, idx) => idx !== index);
    setNarasumberList(newList.length ? newList : ['']);
    handleChange('c3_raw', newList.filter(Boolean).join(', '));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(formData);
      // Let parent close it, no need to setIsSubmitting(false) if unmounted
    }, 600);
  };

  const config = tableConfigs[pageId];
  if (!config) return null;

  const renderGenericInputs = () => {
    return config.heads.map((head, idx) => {
      const key = `c${idx + 1}`;

      const isTextArea = head.toLowerCase().includes('isi konten') || head.toLowerCase().includes('deskripsi');
      const isDosen = (head.toLowerCase() === 'dosen' || head.toLowerCase() === 'nama dosen') && pageId !== 'klaster-dosen';
      const isStoryBoard = (head.toLowerCase() === 'story board' || head.toLowerCase() === 'judul story board') && pageId !== 'story-board';
      const isMataKuliah = head.toLowerCase() === 'kode mk' && pageId !== 'mata-kuliah';

      let inputElement;

      if (isDosen) {
        inputElement = (
          <select required value={formData[key] || ''} onChange={e => handleChange(key, e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
            <option value="">Pilih Dosen...</option>
            {state.appData['klaster-dosen']?.map((d: any) => (
              <option key={d.c1} value={d.c1}>{d.c1}</option>
            ))}
          </select>
        );
      } else if (isStoryBoard) {
        inputElement = (
          <select required value={formData[key] || ''} onChange={e => handleChange(key, e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
            <option value="">Pilih Story Board...</option>
            {state.appData['story-board']?.map((sb: any) => (
              <option key={sb.c1} value={sb.c1}>{sb.c1}</option>
            ))}
          </select>
        );
      } else if (isMataKuliah) {
        inputElement = (
          <select required value={formData[key] || ''} onChange={e => handleChange(key, e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
            <option value="">Pilih Mata Kuliah...</option>
            {state.appData['mata-kuliah']?.map((mk: any) => (
              <option key={mk.c1} value={mk.c1}>{mk.c1} - {mk.c2}</option>
            ))}
          </select>
        );
      } else if (isTextArea) {
        inputElement = (
          <textarea 
            required 
            placeholder={`Masukkan ${head}...`} 
            value={formData[key] || ''} 
            onChange={e => handleChange(key, e.target.value)}
            style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', minHeight: '150px', fontFamily: 'inherit' }}
          />
        );
      } else {
        inputElement = (
          <input 
            type="text" 
            required={head.toLowerCase() !== 'tautan / file'} 
            placeholder={`Masukkan ${head}...`} 
            value={formData[key] || ''} 
            onChange={e => handleChange(key, e.target.value)}
            style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}
          />
        );
      }

      return (
        <div key={idx} style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>{head}</label>
          {inputElement}
        </div>
      );
    });
  };

  const renderVideoPembelajaranForm = () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0 16px' }}>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Judul Video Pembelajaran</label>
            <input type="text" required value={formData['c1'] || ''} onChange={e => handleChange('c1', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Nama Dosen</label>
            <select required value={formData['c2_raw'] || ''} onChange={e => handleChange('c2_raw', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                <option value="">Pilih Dosen...</option>
                {state.appData['klaster-dosen']?.map((d: any) => <option key={d.c1} value={d.c1}>{d.c1}</option>)}
            </select>
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Mata Kuliah</label>
            <select required value={formData['c2_mk'] || ''} onChange={e => handleChange('c2_mk', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                <option value="">Pilih MK...</option>
                {state.appData['mata-kuliah']?.map((mk: any) => <option key={mk.c2} value={mk.c2}>{mk.c2}</option>)}
            </select>
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Story Board</label>
            <input type="text" list="storyboard-options" placeholder="Ketik atau pilih Story Board..." value={formData['c3_raw'] || ''} onChange={e => handleChange('c3_raw', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }} />
            <datalist id="storyboard-options">
                {state.appData['story-board']?.map((sb: any) => <option key={sb.c1} value={sb.c1} />)}
            </datalist>
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Status Pekerjaan</label>
            <select value={formData['c8_raw'] || 'To Do'} onChange={e => handleChange('c8_raw', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Revision</option>
                <option>Retake</option>
                <option>Finalized</option>
            </select>
        </div>
        <div style={{ gridColumn: '1 / -1', background: 'rgba(138, 43, 226, 0.1)', borderLeft: '4px solid var(--primary)', padding: '12px', marginBottom: '24px', borderRadius: '4px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0 }}><strong>Pemberitahuan Otomatisasi:</strong> Editor dan Deadline akan <b>dialokasikan secara otomatis</b> secara *round-robin* saat pengajuan disimpan (jika belum di-*assign*).</p>
        </div>
      </div>
    );
  };

  const renderPodcastForm = () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0 16px' }}>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Judul Video Podcast</label>
            <input type="text" required value={formData['c1'] || ''} onChange={e => handleChange('c1', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Pilih RAW Video Podcast</label>
            <select required value={formData['c2_raw'] || ''} onChange={e => handleChange('c2_raw', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                <option value="">Pilih RAW Video...</option>
                {state.appData['video-podcast']?.map((vp: any) => <option key={vp.c1} value={vp.c1}>{vp.c1} ({vp.c2})</option>)}
            </select>
        </div>
        <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Narasumber & Host (Bisa lebih dari 1)</label>
            {narasumberList.map((nama, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Contoh: Dr. Budi (Host)" 
                  value={nama} 
                  onChange={e => updateNarasumber(idx, e.target.value)} 
                  style={{ flex: 1, padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }} 
                  required={idx === 0}
                />
                {narasumberList.length > 1 && (
                  <button type="button" onClick={() => removeNarasumber(idx)} className="btn-ghost" style={{ padding: '0 12px', color: '#ef4444' }}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addNarasumber} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', marginTop: '4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>add_circle</span> Tambah Narasumber
            </button>
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Status Pekerjaan</label>
            <select value={formData['c8_raw'] || 'To Do'} onChange={e => handleChange('c8_raw', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Revision</option>
                <option>Retake</option>
                <option>Finalized</option>
            </select>
        </div>
        <div style={{ gridColumn: '1 / -1', background: 'rgba(138, 43, 226, 0.1)', borderLeft: '4px solid var(--primary)', padding: '12px', marginBottom: '24px', borderRadius: '4px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0 }}><strong>Pemberitahuan Otomatisasi:</strong> Editor dan Deadline akan <b>dialokasikan secara otomatis</b> oleh sistem (Round Robin) saat pengajuan disimpan.</p>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (pageId === 'video-pembelajaran') return renderVideoPembelajaranForm();
    if (pageId === 'podcast') return renderPodcastForm();
    
    // Fallback to generic form
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 16px' }}>
        {renderGenericInputs()}
      </div>
    );
  };

  return (
    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content glass-card view-enter" style={{ background: 'var(--bg-surface)', padding: '32px', borderRadius: 'var(--radius-md)', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '1.4rem' }}>{initialData ? 'Edit Data' : 'Tambah Data'}</h3>
        
        <form onSubmit={handleSubmit}>
          {renderContent()}

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button type="button" onClick={onClose} className="btn-ghost" style={{ flex: 1 }} disabled={isSubmitting}>Batal</button>
            <button type="submit" className="btn-primary" style={{ flex: 1, opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
              {isSubmitting ? <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>progress_activity</span> : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
