import React, { useState, useEffect } from 'react';
import { RowData, useAppContext } from '../../context/AppContext';
import { tableConfigs } from '../../utils/config';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface DataFormProps {
  pageId: string;
  initialData?: RowData;
  onClose: () => void;
  onSubmit: (data: RowData) => void;
}

const FileUploadField = ({ label, valueKey, accept = "video/*, .pdf, .zip", formData, handleChange }: { label: string, valueKey: string, accept?: string, formData: any, handleChange: (k:string,v:string)=>void }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setProgress(0);
    
    let p = 0;
    const interval = setInterval(() => {
      p += 15;
      if (p >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsUploading(false);
          handleChange(valueKey, `[FILE] ${file.name}`);
        }, 400);
      } else {
        setProgress(p);
      }
    }, 200);
  };

  return (
    <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>{label}</label>
      
      {!formData[valueKey] || !formData[valueKey].startsWith('[FILE]') ? (
        <div>
          <div style={{ border: '2px dashed var(--glass-border)', padding: '16px', textAlign: 'center', borderRadius: 'var(--radius-sm)', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <input type="file" accept={accept} onChange={handleFileChange} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
            
            {isUploading ? (
              <div style={{ padding: '8px 0', width: '100%' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.8rem', color: 'var(--primary)', animation: 'spin 1s linear infinite' }}>sync</span>
                <p style={{ marginTop: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Mengunggah... {progress}%</p>
                <div style={{ width: '80%', margin: '8px auto 0', height: '4px', background: 'var(--glass-border)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'var(--primary)', transition: 'width 0.2s ease' }} />
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--text-muted)' }}>cloud_upload</span>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem' }}>Klik atau Seret file ke sini</p>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>Video, dokumen, zip/rar</p>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px' }}>ATAU MASUKKAN TAUTAN</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
          </div>
          <div style={{ position: 'relative', marginTop: '16px' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1.2rem' }}>link</span>
            <input 
              type="text" 
              placeholder="Contoh: https://drive.google.com/... atau https://youtube.com/..." 
              value={(!formData[valueKey]?.startsWith('[FILE]') && formData[valueKey]) || ''} 
              onChange={e => handleChange(valueKey, e.target.value)} 
              style={{ width: '100%', padding: '12px 12px 12px 42px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}
            />
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--glass-border)', background: 'rgba(16, 185, 129, 0.05)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>{formData[valueKey].replace('[FILE] ', '')}</div>
            <div style={{ fontSize: '0.85rem', color: '#10b981' }}>File berhasil diunggah dan tersimpan di server.</div>
          </div>
          <button type="button" onClick={() => handleChange(valueKey, '')} className="btn-ghost" style={{ padding: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: '#ef4444' }}>delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

const DataForm: React.FC<DataFormProps> = ({ pageId, initialData, onClose, onSubmit }) => {
  const { state } = useAppContext();
  const [formData, setFormData] = useState<RowData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const config = tableConfigs[pageId];
  
  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      const defaultData: RowData = {};
      
      const editorsList = state.appData['daftar-akun']?.filter((a: any) => a.c9 === 'Editor' || a.c9 === 'Admin').map((a: any) => a.c1) || ['System Admin'];
      const randomEditor = editorsList.length > 0 ? editorsList[Math.floor(Math.random() * editorsList.length)] : 'Admin';
      const deadlineDate = new Date();
      deadlineDate.setDate(deadlineDate.getDate() + 7);
      const autoDeadline = deadlineDate.toISOString().split('T')[0];

      if (pageId.includes('video')) {
        defaultData['c6'] = randomEditor;
        defaultData['c7'] = autoDeadline;
        defaultData['c8'] = 'To Do';
        defaultData['c9'] = 'Internal Saja';
      } else if (pageId.includes('podcast')) {
        defaultData['c4'] = randomEditor;
        defaultData['c5'] = autoDeadline;
        defaultData['c6'] = 'To Do';
        defaultData['c7'] = 'Internal Saja';
      } else if (pageId === 'cms-menu') defaultData['c4'] = 'Active';
      else if (pageId === 'cms-artikel') {
        defaultData['c3'] = 'Tidak';
        defaultData['c4'] = 'Draft';
        defaultData['c5'] = '0';
      }
      setFormData(defaultData);
    }
  }, [initialData, pageId]);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 500);
  };
  const renderGenericInputs = () => {
    if (!config) return null;

    return config.heads.map((head, idx) => {
      const key = `c${idx + 1}`;
      const isTextArea = head.toLowerCase().includes('deskripsi') || head.toLowerCase().includes('konten');
      const isDosen = head.toLowerCase() === 'dosen' && pageId !== 'klaster-dosen';
      const isStoryBoard = head.toLowerCase() === 'story board' && pageId !== 'story-board';
      const isMataKuliah = (head.toLowerCase() === 'nama mata kuliah' || head.toLowerCase() === 'mata kuliah' || head.toLowerCase() === 'kode mk') && pageId !== 'mata-kuliah';

      let inputElement;

      if (head.toLowerCase() === 'tautan / file') {
        return <FileUploadField key={key} label={head} valueKey={key} accept=".pdf, .zip, .rar, .doc, .docx" formData={formData} handleChange={handleChange} />;
      }

      if (head.toLowerCase() === 'status') {
        const isArticle = pageId === 'cms-artikel';
        const defaultVal = isArticle ? 'Draft' : 'Active';
        inputElement = (
          <select required value={formData[key] || defaultVal} onChange={e => handleChange(key, e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
            {isArticle ? (
              <>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </>
            ) : (
              <>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </>
            )}
          </select>
        );
      } else if (isDosen) {
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
        const inputType = head.toLowerCase().includes('tanggal') ? 'date' : 'text';
        inputElement = (
          <input 
            type={inputType} 
            required={head.toLowerCase() !== 'tautan / file' && head.toLowerCase() !== 'induk menu'} 
            placeholder={`Masukkan ${head}...`} 
            value={formData[key] || ''} 
            onChange={e => handleChange(key, e.target.value)}
            style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}
          />
        );
      }

      return (
        <div key={key} style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>{head}</label>
          {inputElement}
        </div>
      );
    });
  };

  const renderVideoPembelajaranForm = () => {
    const cmsLayanan = state.appData['cms-layanan'] || [];
    const isRaw = pageId.includes('raw-');
    const isEditor = pageId.includes('editor-');

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 16px' }}>
        <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Judul Video Pembelajaran</label>
            <input type="text" required disabled={isEditor} value={formData['c1'] || ''} onChange={e => handleChange('c1', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', opacity: isEditor ? 0.7 : 1 }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Dosen</label>
            <select required disabled={isEditor} value={formData['c2'] || ''} onChange={e => handleChange('c2', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', opacity: isEditor ? 0.7 : 1 }}>
                <option value="">Pilih Dosen...</option>
                {state.appData['klaster-dosen']?.map((d: any) => <option key={d.c1} value={d.c1}>{d.c1}</option>)}
            </select>
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Mata Kuliah</label>
            <select disabled={isEditor} value={formData['c3'] || ''} onChange={e => handleChange('c3', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', opacity: isEditor ? 0.7 : 1 }}>
                <option value="">Pilih Mata Kuliah...</option>
                {state.appData['mata-kuliah']?.map((mk: any) => <option key={mk.c1} value={mk.c1}>{mk.c1}</option>)}
            </select>
        </div>
        
        {(!isEditor) && (
          <>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Story Board</label>
                <select required value={formData['c4'] || ''} onChange={e => handleChange('c4', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                    <option value="">Pilih Story Board...</option>
                    {state.appData['story-board']?.map((sb: any) => <option key={sb.c1} value={sb.c1}>{sb.c1}</option>)}
                </select>
            </div>
            <FileUploadField label="Unggah File RAW Video" valueKey="c5" accept="video/*" formData={formData} handleChange={handleChange} />
          </>
        )}

        {(isEditor || (!isRaw && !isEditor)) && (
          <>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Status Pekerjaan</label>
                <select required value={formData['c8'] || 'To Do'} onChange={e => handleChange('c8', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Revision">Revision</option>
                    <option value="Retake">Retake</option>
                    <option value="Finalized">Finalized</option>
                </select>
            </div>
            <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Target Menu Publik (Tampil di Website)</label>
                <select required value={formData['c9'] || 'Internal Saja'} onChange={e => handleChange('c9', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                    <option value="Internal Saja">Internal Saja</option>
                    {cmsLayanan.map((l: any, idx: number) => <option key={idx} value={l.c1}>{l.c1}</option>)}
                </select>
            </div>
            <FileUploadField label="Unggah File Revisi / Bahan Video" valueKey="c10" accept="video/*, .zip, .rar" formData={formData} handleChange={handleChange} />
            <FileUploadField label="Unggah Hasil (Video Final)" valueKey="c11" accept="video/mp4, video/mov" formData={formData} handleChange={handleChange} />
          </>
        )}
      </div>
    );
  };

  const renderPodcastForm = () => {
    const cmsLayanan = state.appData['cms-layanan'] || [];
    const isRaw = pageId.includes('raw-');
    const isEditor = pageId.includes('editor-');

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 16px' }}>
        <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Judul Video Podcast</label>
            <input type="text" required disabled={isEditor} value={formData['c1'] || ''} onChange={e => handleChange('c1', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', opacity: isEditor ? 0.7 : 1 }} />
        </div>
        <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Narasumber & Host</label>
            <input type="text" required disabled={isEditor} value={formData['c2'] || ''} onChange={e => handleChange('c2', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', opacity: isEditor ? 0.7 : 1 }} />
        </div>
        
        {(!isEditor) && (
          <FileUploadField label="Unggah RAW Video Podcast" valueKey="c3" accept="video/*" formData={formData} handleChange={handleChange} />
        )}

        {(isEditor || (!isRaw && !isEditor)) && (
          <>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Status Pekerjaan</label>
                <select required value={formData['c6'] || 'To Do'} onChange={e => handleChange('c6', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Revision">Revision</option>
                    <option value="Finalized">Finalized</option>
                </select>
            </div>
            <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Target Menu Publik</label>
                <select required value={formData['c7'] || 'Internal Saja'} onChange={e => handleChange('c7', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                    <option value="Internal Saja">Internal Saja</option>
                    {cmsLayanan.map((l: any, idx: number) => <option key={idx} value={l.c1}>{l.c1}</option>)}
                </select>
            </div>
            <FileUploadField label="Unggah File Revisi / Bahan Video" valueKey="c8" accept="video/*, .zip, .rar" formData={formData} handleChange={handleChange} />
            <FileUploadField label="Unggah Hasil (Video Final)" valueKey="c9" accept="video/mp4, video/mov" formData={formData} handleChange={handleChange} />
          </>
        )}
      </div>
    );
  };

  const renderCmsMenuForm = () => {
    const parentMenus = state.appData['cms-menu']?.filter((m: any) => m.c3 === 'Header Utama (Tautan Biasa)' || m.c3 === 'Header Utama (Dropdown Layanan)') || [];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0 16px' }}>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Nama Menu</label>
            <input type="text" required value={formData['c1'] || ''} onChange={e => handleChange('c1', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Tautan (URL)</label>
            <input type="text" required value={formData['c2'] || ''} onChange={e => handleChange('c2', e.target.value)} placeholder="Contoh: /tentang atau https://..." style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Posisi</label>
            <select required value={formData['c3'] || ''} onChange={e => handleChange('c3', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                <option value="">Pilih Posisi...</option>
                <option value="Header Utama (Tautan Biasa)">Header Utama (Tautan Biasa)</option>
                <option value="Header Utama (Dropdown Layanan)">Header Utama (Dropdown Layanan Otomatis)</option>
                <option value="Sub-Menu (Manual Dropdown)">Sub-Menu (Manual Dropdown)</option>
                <option value="Tersembunyi (Unlinked)">Tersembunyi (Unlinked)</option>
                <option value="Footer">Footer</option>
            </select>
        </div>
        
        {formData['c3'] === 'Sub-Menu (Manual Dropdown)' && (
          <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Induk Menu (Parent)</label>
              <select required value={formData['c5'] || ''} onChange={e => handleChange('c5', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                  <option value="">Pilih Induk Menu...</option>
                  {parentMenus.map((pm: any, idx: number) => (
                    <option key={idx} value={pm.c1}>{pm.c1}</option>
                  ))}
              </select>
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Status</label>
            <select required value={formData['c4'] || 'Active'} onChange={e => handleChange('c4', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
        </div>
      </div>
    );
  };

  const renderCmsArtikelForm = () => {
    const users = state.appData['daftar-akun'] || [];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0 16px' }}>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>Tanggal Publish</label>
            <input type="date" required value={formData['c6'] || ''} onChange={e => handleChange('c6', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>Kategori Artikel</label>
            <input type="text" placeholder="Cth: Berita, Pengumuman, Edukasi" required value={formData['c2'] || ''} onChange={e => handleChange('c2', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }} />
        </div>
        
        <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>Judul Berita/Artikel</label>
            <input type="text" required value={formData['c1'] || ''} onChange={e => handleChange('c1', e.target.value)} style={{ width: '100%', padding: '16px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', fontSize: '1.2rem', fontWeight: 600 }} />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>Prefix (Topik Pendek)</label>
            <input type="text" placeholder="Cth: HOT NEWS" value={formData['c7'] || ''} onChange={e => handleChange('c7', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>Penulis / Kontributor</label>
            <select required value={formData['c13'] || ''} onChange={e => handleChange('c13', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}>
                <option value="">Pilih Penulis...</option>
                {users.map((u: any, idx: number) => <option key={idx} value={u.c1}>{u.c1}</option>)}
            </select>
        </div>

        <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>Preview (Cuplikan Singkat untuk List)</label>
            <textarea required maxLength={150} placeholder="Tuliskan 1-2 kalimat menarik untuk cuplikan daftar berita..." value={formData['c8'] || ''} onChange={e => handleChange('c8', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', minHeight: '80px', fontFamily: 'inherit' }} />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>{formData['c8']?.length || 0}/150</div>
        </div>

        <div style={{ marginBottom: '32px', gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>Konten Artikel</label>
            <div style={{ background: '#fff', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
              <ReactQuill 
                theme="snow" 
                value={formData['c9'] || ''} 
                onChange={val => handleChange('c9', val)} 
                style={{ minHeight: '300px', color: '#000' }}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    ['link', 'image', 'video'],
                    ['clean']
                  ]
                }}
              />
            </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>URL Gambar Utama (Header)</label>
            <input type="url" placeholder="https://..." value={formData['c10'] || ''} onChange={e => handleChange('c10', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>Caption Gambar</label>
            <input type="text" placeholder="Deskripsi gambar utama..." value={formData['c11'] || ''} onChange={e => handleChange('c11', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }} />
        </div>

        <div style={{ marginBottom: '16px', gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>Tags (Pisahkan dengan koma)</label>
            <input type="text" placeholder="inovasi, pendidikan, teknologi" value={formData['c12'] || ''} onChange={e => handleChange('c12', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>Sorotan (Headline)</label>
            <select required value={formData['c3'] || 'Tidak'} onChange={e => handleChange('c3', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', fontWeight: 'bold' }}>
                <option value="Tidak">Berita Biasa (Terkini)</option>
                <option value="Ya">Jadikan Headline Utama</option>
            </select>
        </div>
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>Status Penayangan</label>
            <select required value={formData['c4'] || 'Draft'} onChange={e => handleChange('c4', e.target.value)} style={{ width: '100%', padding: '12px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', fontWeight: 'bold' }}>
                <option value="Draft">Draft (Simpan Sementara)</option>
                <option value="Published">Tayang (Published)</option>
            </select>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (pageId.includes('video-pembelajaran') || pageId.includes('raw-video') || pageId.includes('editor-video')) return renderVideoPembelajaranForm();
    if (pageId.includes('podcast')) return renderPodcastForm();
    if (pageId === 'cms-menu') return renderCmsMenuForm();
    if (pageId === 'cms-artikel') return renderCmsArtikelForm();
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 16px' }}>
        {renderGenericInputs()}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {renderContent()}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--glass-border)' }}>
        <button type="button" onClick={onClose} className="btn-ghost" disabled={isSubmitting}>Batal</button>
        <button type="submit" className="btn-primary" style={{ opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
          {isSubmitting ? <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>progress_activity</span> : 'Simpan Data'}
        </button>
      </div>
    </form>
  );
};

export default DataForm;
