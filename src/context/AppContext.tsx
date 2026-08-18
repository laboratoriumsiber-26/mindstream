import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


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
    const initialData = {
      'pengajuan-akun': [],
          'profil': [
              { c1: 'Nama Pengguna', c2: 'Superadmin' },
              { c1: 'Email', c2: 'admin@mindstream.local' },
              { c1: 'Unit Kerja', c2: 'Pusat Inovasi Pembelajaran' }
          ],
          'halaman': [],
          'kategori': [],

          'video-pembelajaran': [],
          'video-podcast': [],
          'podcast': [],
          'konten-medsos': [],
          'rekapitulasi-laporan': [],
          'daftar-admin': [],
          'daftar-uploader': [],
          'daftar-editor': [],
          'daftar-user': [],
          'daftar-akun': [],
          'klaster-dosen': [
            { c1: 'Prof. Dr. H. Ilham Fathoni, M.Ag', c2: '081234567890' },
            { c1: 'Dr. Hj. Siti Maryam, M.Pd.I', c2: '081987654321' },
            { c1: 'Ahmad Muzakki, M.Kom', c2: '081223344556' }
          ],
          'mata-kuliah': [
            { c1: 'MK-101', c2: 'Pengantar Ilmu Komputer' },
            { c1: 'MK-202', c2: 'Desain Instruksional Digital' },
            { c1: 'MK-303', c2: 'Filsafat Pendidikan Islam' }
          ],
          'story-board': [
            { c1: 'SB-001 - Evolusi Komputer', c2: 'Ahmad Muzakki, M.Kom', c3: 'MK-101', c4: 'Draft Storyboard_v1.pdf' },
            { c1: 'SB-002 - Sejarah Pendidikan Islam', c2: 'Prof. Dr. H. Ilham Fathoni, M.Ag', c3: 'MK-303', c4: 'Storyboard_Filsafat_Final.pdf' }
          ],
          'cms-slider': [
            { c1: 'Transformasi Pembelajaran Digital', c2: 'Pusat Inovasi Pembelajaran Digital (PIPD) UIN Siber Syekh Nurjati Cirebon menghadirkan pengalaman belajar interaktif kelas dunia.', c3: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80', c4: 'Active' },
            { c1: 'Masa Depan Pendidikan', c2: 'Mengeksplorasi teknologi Immersive Learning dan Virtual Reality untuk pendidikan Islam yang tak terbatas ruang.', c3: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1920&q=80', c4: 'Active' },
            { c1: 'Open Islamic Educational Resources', c2: 'Menyediakan akses terbuka bagi jutaan pencari ilmu ke berbagai literatur, modul, dan video edukasi unggulan.', c3: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80', c4: 'Active' }
          ],
          'cms-layanan': [
            { c1: 'Pengembangan Konten Pembelajaran Digital', c2: 'Kami memfasilitasi produksi video pembelajaran interaktif, animasi edukasi, dan materi ajar multimedia interaktif dengan standar penyiaran profesional. Solusi end-to-end kami mencakup pra-produksi, syuting dengan kualitas broadcast, hingga pasca-produksi menggunakan teknologi motion graphics.', c3: 'smart_display', c4: 'Active' },
            { c1: 'Pelatihan Teknologi Pendidikan', c2: 'Menyelenggarakan workshop dan sertifikasi bagi dosen serta tenaga kependidikan dalam penguasaan perangkat lunak LMS dan desain instruksional modern. Kami menghadirkan pakar-pakar teknologi pendidikan terkemuka untuk memastikan transfer knowledge yang optimal.', c3: 'school', c4: 'Active' },
            { c1: 'Podcast Inovasi', c2: 'Studio podcast terdedikasi untuk membedah isu-isu kontemporer dalam dunia pendidikan, sains, dan kajian Islam bersama para pakar. Fasilitas ini didukung dengan peralatan rekam audio visual berstandar profesional untuk menghasilkan output siaran yang jernih dan berkualitas tinggi.', c3: 'mic_external_on', c4: 'Active' },
            { c1: 'OIER (Open Islamic Educational Resources)', c2: 'Membangun repositori raksasa berlisensi terbuka yang berisi literatur, modul, jurnal, dan aset digital untuk pendidikan Islam secara global. Kami berkomitmen untuk membuka akses seluas-luasnya terhadap sumber daya pengetahuan Islam yang otoritatif dan kredibel.', c3: 'menu_book', c4: 'Active' },
            { c1: 'Virtual Reality & Immersive Learning', c2: 'Mengeksplorasi penggunaan teknologi VR/AR untuk simulasi praktikum, tur sejarah peradaban Islam, dan lingkungan belajar tanpa batas ruang. Teknologi imersif kami dirancang khusus untuk meningkatkan engagement dan retensi pemahaman mahasiswa secara signifikan.', c3: 'view_in_ar', c4: 'Active' }
          ],
          'cms-menu': [
            { c1: 'Home', c2: '/', c3: 'Header Utama (Tautan Biasa)', c4: 'Active' },
            { c1: 'Tentang', c2: '/tentang', c3: 'Header Utama (Tautan Biasa)', c4: 'Active' },
            { c1: 'Layanan Kami', c2: '#', c3: 'Header Utama (Dropdown Layanan)', c4: 'Active' },
            { c1: 'Titik Temu', c2: '/titik-temu', c3: 'Header Utama (Tautan Biasa)', c4: 'Active' },
            { c1: 'Tim PIPD', c2: '/tim-pipd', c3: 'Header Utama (Tautan Biasa)', c4: 'Active' }
          ],
          'cms-artikel': [
            { 
              c1: 'Peluncuran Platform MindStream Edu', 
              c2: 'Berita', 
              c3: 'Ya', 
              c4: 'Published',
              c5: '124',
              c6: '2026-08-18',
              c7: 'HOT NEWS',
              c8: 'Pusat Inovasi Pembelajaran Digital (PIPD) UIN Siber secara resmi meluncurkan MindStream Edu sebagai ekosistem...',
              c9: '<p>Pusat Inovasi Pembelajaran Digital (PIPD) UIN Siber secara resmi meluncurkan MindStream Edu sebagai ekosistem pembelajaran digital terkini.</p><p>Platform ini memfasilitasi integrasi video interaktif, podcast, dan resource OIER untuk mahasiswa.</p>',
              c10: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
              c11: 'Ilustrasi Platform Digital',
              c12: 'MindStream, PIPD, UIN Siber',
              c13: 'Dr. Ahmad Fauzi'
            }
          ]
        };
        
    const storedData = localStorage.getItem('mindstream_appData');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setState(prev => ({ ...prev, appData: parsed, isLoading: false }));
      } catch (e) {
        localStorage.setItem('mindstream_appData', JSON.stringify(initialData));
        setState(prev => ({ ...prev, appData: initialData, isLoading: false }));
      }
    } else {
      localStorage.setItem('mindstream_appData', JSON.stringify(initialData));
      setState(prev => ({ ...prev, appData: initialData, isLoading: false }));
    }
  }, []);

  const login = (username: string, role: string) => {
    setState(prev => ({ ...prev, isLoggedIn: true, username, role }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, isLoggedIn: false, username: '', role: '' }));
  };
    
  const saveData = (tableName: string, newData: RowData[]) => {
    setState(prev => {
      const updatedAppData = { ...prev.appData, [tableName]: newData };
      localStorage.setItem('mindstream_appData', JSON.stringify(updatedAppData));
      return { ...prev, appData: updatedAppData };
    });
  };

  const updateRow = (tableName: string, index: number, updatedRow: RowData) => {
    const table = state.appData[tableName] ? [...state.appData[tableName]] : [];
    const oldRow = table[index];
    let processed = { ...updatedRow };
    
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
    saveData(tableName, table);
  };

  const addRow = (tableName: string, newRow: RowData) => {
    const table = state.appData[tableName] ? [...state.appData[tableName]] : [];
    table.push({ ...newRow });
    saveData(tableName, table);
  };

  const deleteRow = (tableName: string, index: number) => {
    const table = state.appData[tableName] ? [...state.appData[tableName]] : [];
    table.splice(index, 1);
    saveData(tableName, table);
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
