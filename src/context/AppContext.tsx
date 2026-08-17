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
}

interface AppContextType {
  state: AppState;
  login: (username: string, role: string) => void;
  logout: () => void;
  saveData: (tableName: string, newData: RowData[]) => void;
  updateRow: (tableName: string, index: number, updatedRow: RowData) => void;
  addRow: (tableName: string, newRow: RowData) => void;
  deleteRow: (tableName: string, index: number) => void;
}

const defaultState: AppState = {
  isLoggedIn: false,
  username: '',
  role: '',
  appData: {},
  isLoading: true
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
      if (docSnap.exists()) {
        setState(prev => ({ ...prev, appData: docSnap.data() as AppData, isLoading: false }));
      } else {
        const initialData = {
          'profil': [
              { c1: 'Nama Pengguna', c2: 'Superadmin' },
              { c1: 'Email', c2: 'superadmin@mindstream.local' },
              { c1: 'Unit Kerja', c2: 'Pusat Inovasi Pembelajaran' }
          ],
          'halaman': [
              { c1: 'Beranda / Dashboard', c2: '<span style="color: var(--primary); font-weight:bold;">Aktif</span>' },
              { c1: 'Tentang Kami', c2: '<span style="color: var(--text-muted);">Draft</span>' }
          ],
          'kategori': [
              { c1: 'Video Edukasi', c2: 'Kategori untuk video pembelajaran terstruktur' },
              { c1: 'Podcast', c2: 'Kategori untuk konten bincang-bincang santai' }
          ],
          'klaster-dosen': [
              { c1: 'Dr. Ahmad Fulan' },
              { c1: 'Siti Aminah, M.Kom' },
              { c1: 'Prof. Budi Santoso, Ph.D' }
          ],
          'mata-kuliah': [
              { c1: 'SI101', c2: 'Sistem Informasi' },
              { c1: 'TI202', c2: 'Pemrograman Web' },
              { c1: 'KU100', c2: 'Pendidikan Agama Islam' }
          ],
          'story-board': [
              { c1: 'SB Pertemuan 1 - Konsep Web', c2: 'Dr. Ahmad Fulan', c3: 'TI202', c4: '<button style="background: var(--bg-surface-hover); border: 1px solid var(--primary); color: var(--primary); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">folder_open</span> Lihat Drive</button>' },
              { c1: 'SB Pengenalan Database', c2: 'Siti Aminah, M.Kom', c3: 'SI101', c4: '<button style="background: var(--bg-surface-hover); border: 1px solid var(--primary); color: var(--primary); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">folder_open</span> Lihat Drive</button>' }
          ],
          'video-pembelajaran': [
              { c1: 'Konsep Dasar Web', c2: 'Dr. Ahmad Fulan<br><small style="color: var(--text-muted);">Pemrograman Web (TI202)</small>', c3: '<button style="background: var(--bg-surface-hover); border: 1px solid var(--glass-border); color: var(--text-main); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">preview</span> Lihat SB</button>', c4: '<button style="background: var(--bg-surface-hover); border: 1px solid var(--accent-1); color: var(--accent-1); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">play_circle</span> V1.mp4</button>', c5: '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>', c6: 'Rizky (Editor)', c7: '20-08-2026', c8: 'In Progress' },
              { c1: 'Pengantar SQL', c2: 'Siti Aminah, M.Kom<br><small style="color: var(--text-muted);">Sistem Informasi (SI101)</small>', c3: '<button style="background: var(--bg-surface-hover); border: 1px solid var(--glass-border); color: var(--text-main); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">preview</span> Lihat SB</button>', c4: '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>', c5: '<button style="background: var(--bg-surface-hover); border: 1px solid var(--primary); color: var(--primary); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">play_circle</span> Final.mp4</button>', c6: 'Budi (Editor)', c7: '15-08-2026', c8: 'Finalized' }
          ],
          'video-podcast': [
              { c1: 'RAW Podcast 1', c2: '2026-08-10', c3: '45' },
              { c1: 'RAW Podcast 2', c2: '2026-08-11', c3: '60' }
          ],
          'podcast': [
              { c1: 'Inovasi Digital di Kampus', c2: '<span style="color: var(--text-muted); font-style: italic;">Pilih RAW...</span>', c3: 'Dr. Ahmad Fulan<br><small style="color: var(--text-muted);">Host: Uploader Kampus</small>', c4: '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>', c5: '<button style="background: var(--bg-surface-hover); border: 1px solid var(--primary); color: var(--primary); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">play_circle</span> Final.mp4</button>', c6: 'Rizky (Editor)', c7: '21-08-2026', c8: 'Finalized' },
              { c1: 'Tantangan Riset 2026', c2: '<span style="color: var(--text-muted); font-style: italic;">Pilih RAW...</span>', c3: 'Prof. Budi Santoso<br><small style="color: var(--text-muted);">Host: Operator Podcast</small>', c4: '<button style="background: var(--bg-surface-hover); border: 1px solid var(--accent-1); color: var(--accent-1); padding: 4px 8px; font-size: 0.8rem; border-radius: var(--radius-sm); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size:1rem;">play_circle</span> Draft_1.mp4</button>', c5: '<span style="color: var(--text-muted); font-style: italic;">Belum ada</span>', c6: 'Budi (Editor)', c7: '25-08-2026', c8: 'Review' }
          ],
          'konten-medsos': [
              { c1: 'Instagram', c2: 'Edukasi', c3: '20-08-2026' },
              { c1: 'TikTok', c2: 'Hiburan', c3: '22-08-2026' },
              { c1: 'YouTube Shorts', c2: 'Informasi', c3: '25-08-2026' }
          ],
          'rekapitulasi-laporan': [
              { c1: 'Agustus 2026', c2: '45 Video', c3: '30 Selesai', c4: '15 Proses' },
              { c1: 'Juli 2026', c2: '38 Video', c3: '38 Selesai', c4: '0 Proses' }
          ],
          'daftar-admin': [
              { c1: 'Ahmad Admin', c2: 'admin1@kampus.ac.id', c3: 'Admin' }
          ],
          'daftar-uploader': [
              { c1: 'Uploader Kampus', c2: 'uploader@kampus.ac.id', c3: 'Uploader' }
          ],
          'daftar-editor': [
              { c1: 'Rizki Faturohman', c2: 'Senior Editor', c3: 'Tersedia' },
              { c1: 'Muhammad Adam Habibie', c2: 'Junior Editor', c3: 'Tersedia' },
              { c1: 'Muhammad Lazuardi Ramadhani', c2: 'Junior Editor', c3: 'Tersedia' }
          ],
          'daftar-user': [
              { c1: 'Mahasiswa A', c2: 'mhs.a@kampus.ac.id', c3: 'Fakultas Tarbiyah' },
              { c1: 'Dosen B', c2: 'dosen.b@kampus.ac.id', c3: 'Fakultas Syariah' }
          ],
          'daftar-akun': [
            { c1: "Siti Hamidah", c2: "Mentor Fotografer/Videografer", c3: "6", c4: "FDKI", c5: "Komunikasi dan Penyiaran Islam", c6: "2384110102", c7: "6281320995472", c8: "-", c9: "Admin" },
            { c1: "Auliya Rahmi", c2: "Mentor Fotografer/Videografer", c3: "6", c4: "FITK", c5: "Pendidikan Bahasa Arab", c6: "2381020029", c7: "62895404577828", c8: "-", c9: "Admin" },
            { c1: "M. Surya Fadlilah Ramadhan", c2: "Mentor Desain Grafis", c3: "6", c4: "FITK", c5: "Tadris Bahasa Inggris", c6: "2381030113", c7: "6282185090756", c8: "suryafadil218@gmail.com", c9: "Admin" },
            { c1: "Rizki Faturohman", c2: "Editor Video", c3: "6", c4: "FUA", c5: "Bahasa dan Sastra Arab", c6: "2385150043", c7: "6281394301290", c8: "rizkifaturohman@mail.uinssc.ac.id", c9: "Editor" },
            { c1: "Muhammad Adam Habibie", c2: "Editor Video", c3: "4", c4: "FUA", c5: "Bahasa dan Sastra Arab", c6: "2485150040", c7: "6289526573241", c8: "albirunihabibie1422@gmail.com", c9: "Editor" },
            { c1: "Muhammad Lazuardi Ramadhani", c2: "Editor Video", c3: "2", c4: "FASYA", c5: "Ekonomi Syariah", c6: "2530212139", c7: "6289699062022", c8: "Lazuardiramadhani2006@gmail.com", c9: "Editor" }
          ]
        };
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
    const editors = state.appData['daftar-editor'] || [];
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

  return (
    <AppContext.Provider value={{ state, login, logout, saveData, updateRow, addRow, deleteRow }}>
      {!state.isLoading ? children : <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',color:'white'}}>Menghubungkan ke Firebase...</div>}
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
