import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../utils/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
// Define the shape of our row data (up to 10 generic columns)
export interface RowData {
  c1?: string;
  c2?: string;
  c3?: string;
  c4?: string;
  c5?: string;
  c6?: string;
  c7?: string;
  c8?: string;
  c9?: string;
  c10?: string;
  [key: string]: string | undefined;
}
export interface AppData {
  [key: string]: RowData[];
}

export interface AppState {
  isLoggedIn: boolean;
  username: string;
  role: string;
  appData: AppData;
  isLoading: boolean;
  toast: { show: boolean; message: string; type: 'info' | 'success' | 'error' | 'warning' };
  confirm: { show: boolean; message: string; onConfirm: () => void; onCancel: () => void };
}

interface AppContextType {
  state: AppState;
  login: (username: string, role: string) => void;
  logout: () => void;
  saveData: (tableName: string, newData: RowData[]) => void;
  updateRow: (tableName: string, index: number, updatedRow: RowData) => void;
  addRow: (tableName: string, newRow: RowData) => void;
  deleteRow: (tableName: string, index: number) => void;
  showToast: (message: string, type?: 'info' | 'success' | 'error' | 'warning') => void;
  hideToast: () => void;
  showConfirm: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
  hideConfirm: () => void;
}

const defaultState: AppState = {
  isLoggedIn: false,
  username: '',
  role: '',
  appData: {},
  isLoading: true,
  toast: { show: false, message: '', type: 'info' },
  confirm: { show: false, message: '', onConfirm: () => {}, onCancel: () => {} }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('mindstream_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultState, isLoggedIn: true, username: parsed.username, role: parsed.role };
      } catch { }
    }
    return defaultState;
  });

  useEffect(() => {
    if (state.isLoggedIn) {
      localStorage.setItem('mindstream_user', JSON.stringify({ username: state.username, role: state.role }));
    } else {
      localStorage.removeItem('mindstream_user');
    }
  }, [state.isLoggedIn, state.username, state.role]);

  useEffect(() => {
    const docRef = doc(db, 'mindstream_system', 'global_data');
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
        const initialData = {
          'pengajuan-akun': [],
          'profil': [
              { c1: 'Nama Pengguna', c2: 'Superadmin' },
              { c1: 'Email', c2: 'admin@mindstream.local' },
              { c1: 'Unit Kerja', c2: 'Pusat Inovasi Pembelajaran' }
          ],
          'halaman': [],
          'kategori': [],
          'klaster-dosen': [],
          'mata-kuliah': [],
          'story-board': [],
          'video-pembelajaran': [],
          'video-podcast': [],
          'podcast': [],
          'konten-medsos': [],
          'rekapitulasi-laporan': [],
          'daftar-admin': [],
          'daftar-uploader': [],
          'daftar-editor': [],
          'daftar-user': [],
          'daftar-akun': []
        };
        
        // Force wipe database for user request
        if (localStorage.getItem('db_wiped_v2') !== 'true') {
          setDoc(docRef, initialData);
          localStorage.setItem('db_wiped_v2', 'true');
        }

        if (docSnap.exists()) {
          setState(prev => ({ ...prev, appData: docSnap.data() as AppData, isLoading: false }));
        } else {
          setDoc(docRef, initialData);
          setState(prev => ({ ...prev, appData: initialData, isLoading: false }));
        }
    });

    return () => unsubscribe();
  }, []);

  const login = (username: string, role: string) => {
    setState(prev => ({ ...prev, isLoggedIn: true, username, role }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, isLoggedIn: false, username: '', role: '' }));
  };

  const getStatusBadge = (status: string) => {
    let bg = 'var(--bg-surface)';
    let color = 'var(--text-main)';
    let border = '1px solid var(--glass-border)';
    
    if (status === 'To Do') { bg = '#475569'; color = 'white'; border = 'none'; }
    else if (status === 'In Progress') { bg = '#3b82f6'; color = 'white'; border = 'none'; }
    else if (status === 'Review') { bg = '#f59e0b'; color = 'white'; border = 'none'; }
    else if (status === 'Revision') { bg = '#ef4444'; color = 'white'; border = 'none'; }
    else if (status === 'Retake') { bg = '#dc2626'; color = 'white'; border = 'none'; }
    else if (status === 'Finalized') { bg = '#10b981'; color = 'white'; border = 'none'; }
    
    return `<span style="background: ${bg}; color: ${color}; border: ${border}; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">${status}</span>`;
  };

  const assignEditor = () => {
    const allAccounts = state.appData['daftar-akun'] || [];
    const editors = allAccounts.filter(acc => acc.c9 === 'Editor' || acc.c9?.toLowerCase().includes('editor'));
    
    if (editors.length === 0) return 'Belum ada Editor';
    
    const videos = state.appData['video-pembelajaran'] || [];
    const podcasts = state.appData['podcast'] || [];
    
    let bestEditor = editors[0].c1;
    let minLoad = Infinity;
    
    editors.forEach(ed => {
      const eName = ed.c1;
      const vLoad = videos.filter(v => v.c6?.includes(eName || '') && (v.c8?.includes('To Do') || v.c8?.includes('In Progress'))).length;
      const pLoad = podcasts.filter(p => p.c6?.includes(eName || '') && (p.c8?.includes('To Do') || p.c8?.includes('In Progress'))).length;
      const totalLoad = vLoad + pLoad;
      
      if (totalLoad < minLoad) {
        minLoad = totalLoad;
        bestEditor = eName || '';
      }
    });
    
    return bestEditor;
  };

  const processRowData = (pageId: string, row: RowData) => {
    let processed = { ...row };
    
    if (pageId === 'video-pembelajaran') {
      const editor = assignEditor();
      processed = {
        c1: row.c1 || '',
        c2: `${row.c2_raw || ''}<br><small style="color: var(--text-muted);">${row.c2_mk || ''}</small>`,
        c3: row.c3_raw ? `<button style="background: var(--bg-surface-hover); border: 1px solid var(--glass-border); color: var(--text-main); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">preview</span> Lihat SB</button>` : '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>',
        c4: '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>',
        c5: '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>',
        c6: `${editor} (Editor)`,
        c7: 'Akan Datang',
        c8: getStatusBadge(row.c8_raw || 'To Do')
      };
    } else if (pageId === 'podcast') {
      const editor = assignEditor();
      processed = {
        c1: row.c1 || '',
        c2: row.c2_raw || '',
        c3: (row.c3_raw || '').split(',').map(s => s.trim()).join('<br>'),
        c4: '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>',
        c5: '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>',
        c6: `${editor} (Editor)`,
        c7: 'Akan Datang',
        c8: getStatusBadge(row.c8_raw || 'To Do')
      };
    } else {
      for (let i = 1; i <= 10; i++) {
        const key = `c${i}`;
        if (processed[key] === undefined && row[key]) {
          processed[key] = row[key];
        }
      }
    }
    
    return processed;
  };

  const saveData = (tableName: string, newData: RowData[]) => {
    const docRef = doc(db, 'mindstream_system', 'global_data');
    setDoc(docRef, { [tableName]: newData }, { merge: true });
  };

  const updateRow = (tableName: string, index: number, updatedRow: RowData) => {
    const table = state.appData[tableName] ? [...state.appData[tableName]] : [];
    const oldRow = table[index];
    let processed = processRowData(tableName, updatedRow);
    
    // Audit Log System
    const timestamp = new Date().toLocaleString('id-ID');
    let actionStr = 'memperbarui data';
    if (oldRow && oldRow.c8 !== processed.c8) {
      // Very basic status tracking attempt
      actionStr = `mengubah status`;
    }
    const logEntry = `[${timestamp}] ${state.username || 'System'} ${actionStr}`;
    processed.auditLog = oldRow && oldRow.auditLog ? `${oldRow.auditLog}|${logEntry}` : logEntry;
    
    table[index] = processed;
    const docRef = doc(db, 'mindstream_system', 'global_data');
    setDoc(docRef, { [tableName]: table }, { merge: true });
  };

  const addRow = (tableName: string, newRow: RowData) => {
    const table = state.appData[tableName] ? [...state.appData[tableName]] : [];
    table.push(processRowData(tableName, newRow));
    const docRef = doc(db, 'mindstream_system', 'global_data');
    setDoc(docRef, { [tableName]: table }, { merge: true });
  };

  const deleteRow = (tableName: string, index: number) => {
    const table = state.appData[tableName] ? [...state.appData[tableName]] : [];
    table.splice(index, 1);
    const docRef = doc(db, 'mindstream_system', 'global_data');
    setDoc(docRef, { [tableName]: table }, { merge: true });
  };

  const showToast = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    setState(prev => ({ ...prev, toast: { show: true, message, type } }));
    setTimeout(() => {
      hideToast();
    }, 4000); // auto hide after 4 seconds
  };

  const hideToast = () => {
    setState(prev => ({ ...prev, toast: { ...prev.toast, show: false } }));
  };

  const showConfirm = (message: string, onConfirm: () => void, onCancel?: () => void) => {
    setState(prev => ({
      ...prev,
      confirm: {
        show: true,
        message,
        onConfirm: () => {
          onConfirm();
          hideConfirm();
        },
        onCancel: () => {
          if (onCancel) onCancel();
          hideConfirm();
        }
      }
    }));
  };

  const hideConfirm = () => {
    setState(prev => ({ ...prev, confirm: { ...prev.confirm, show: false } }));
  };

  return (
    <AppContext.Provider value={{ state, login, logout, saveData, updateRow, addRow, deleteRow, showToast, hideToast, showConfirm, hideConfirm }}>
      {!state.isLoading ? children : <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',color:'white'}}>Menghubungkan ke Firebase...</div>}
      
      {/* Global Toast Notification */}
      {state.toast.show && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: state.toast.type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 
                      state.toast.type === 'success' ? 'rgba(16, 185, 129, 0.95)' : 
                      state.toast.type === 'warning' ? 'rgba(245, 158, 11, 0.95)' : 
                      'rgba(59, 130, 246, 0.95)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideUp 0.3s ease-out',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <span className="material-symbols-outlined">
            {state.toast.type === 'error' ? 'error' : 
             state.toast.type === 'success' ? 'check_circle' : 
             state.toast.type === 'warning' ? 'warning' : 'info'}
          </span>
          <div style={{ whiteSpace: 'pre-line', lineHeight: 1.5 }}>
            {state.toast.message}
          </div>
          <button 
            onClick={hideToast}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              padding: '4px',
              marginLeft: '8px',
              opacity: 0.8
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>close</span>
          </button>
        </div>
      )}

      {/* Global Confirm Notification */}
      {state.confirm.show && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="glass-card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', maxWidth: '400px', width: '90%', textAlign: 'center', animation: 'scaleUp 0.2s ease-out' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '16px' }}>help</span>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Konfirmasi Tindakan</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>{state.confirm.message}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn-ghost" onClick={state.confirm.onCancel} style={{ padding: '8px 24px', flex: 1 }}>Batal</button>
              <button className="btn-primary" onClick={state.confirm.onConfirm} style={{ padding: '8px 24px', flex: 1, background: '#ef4444' }}>Ya, Lanjutkan</button>
            </div>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
