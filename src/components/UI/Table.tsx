import React, { useState, useMemo } from 'react';
import { RowData, useAppContext } from '../../context/AppContext';

interface TableProps {
  pageId: string;
  data: RowData[];
  heads: string[];
  canEdit: boolean;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const Table: React.FC<TableProps> = ({ data, heads, canEdit, onEdit, onDelete }) => {
  const { state, showToast } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<number, string>>({});
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    setDeletingIndex(index);
    setTimeout(() => {
      onDelete(index);
      setDeletingIndex(null);
    }, 600);
  };

  const filterCols = [
    'status pekerjaan', 'status', 'editor', 'dosen', 'nama dosen', 'peran', 'kategori', 'posisi', 
    'unit kerja / institusi', 'role yang diberikan', 'status pengajuan', 
    'jenis kelamin', 'unit kerja / fakultas', 'role', 'menu publik', 'target menu publik',
    'kode mk', 'penulis', 'induk menu', 'kategori artikel', 'status tayang', 'headline',
    'narasumber & host', 'tanggal', 'jabatan / program studi'
  ];

  // Extract unique values for dynamic filters
  const dynamicFilters = useMemo(() => {
    const f: Record<number, string[]> = {};
    heads.forEach((h, idx) => {
      const hl = h.toLowerCase();
      if (filterCols.includes(hl)) {
        let uniqueValues: string[] = [];
        if (hl === 'peran') {
          uniqueValues = ['Admin', 'Uploader', 'Editor', 'User'];
        } else if (hl === 'status pekerjaan') {
          uniqueValues = ['To Do', 'In Progress', 'Review', 'Revision', 'Retake', 'Finalized'];
        } else if (hl === 'editor') {
          const allEditors = state.appData['daftar-akun']?.filter((a: any) => a.c9 === 'Editor' || a.c9 === 'Admin').map((a: any) => a.c1) || [];
          uniqueValues = Array.from(new Set(allEditors)) as string[];
        } else if (hl === 'dosen') {
          const allDosen = state.appData['klaster-dosen']?.map((d: any) => d.c1) || [];
          uniqueValues = Array.from(new Set(allDosen)) as string[];
        } else if (hl === 'status tayang') {
          uniqueValues = ['Draft', 'Published'];
        } else {
          // Fallback to data driven
          const vals = new Set<string>();
          data.forEach(item => {
            let val = item[`c${idx + 1}`] || '';
            val = val.replace(/<[^>]*>?/gm, '').trim();
            if (val && val !== 'Belum ada' && val !== '-') vals.add(val);
          });
          uniqueValues = Array.from(vals).sort();
        }
        if (uniqueValues.length > 0) f[idx] = uniqueValues;
      }
    });
    return f;
  }, [data, heads, state.appData]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // 1. Check dropdown filters
      let rowMatches = true;
      for (const [colIdx, filterVal] of Object.entries(filters)) {
        if (!filterVal) continue;
        const cellVal = (item[`c${parseInt(colIdx) + 1}`] || '').toLowerCase();
        if (!cellVal.includes(filterVal)) {
          rowMatches = false;
          break;
        }
      }
      
      // 2. Check search
      if (rowMatches && searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const rowText = Object.values(item).join(' ').toLowerCase();
        if (!rowText.includes(searchLower)) rowMatches = false;
      }
      
      return rowMatches;
    });
  }, [data, filters, searchTerm]);

  return (
    <>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {Object.entries(dynamicFilters).map(([idx, options]) => (
          <select 
            key={idx}
            onChange={e => setFilters(prev => ({ ...prev, [idx]: e.target.value.toLowerCase() }))}
            style={{ padding: '10px 14px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', fontFamily: 'inherit', borderRadius: 'var(--radius-sm)', outline: 'none', width: 'auto', fontSize: '0.85rem', fontWeight: 500, minWidth: '150px' }}
          >
            <option value="">Semua {heads[parseInt(idx)]}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ))}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', minWidth: '200px' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)', fontSize: '1.2rem' }}>search</span>
          <input 
            type="text" 
            placeholder="Cari bebas..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 40px', border: 'var(--glass-border)', background: 'var(--bg-base)', color: 'var(--text-main)', fontFamily: 'inherit', borderRadius: 'var(--radius-sm)', outline: 'none', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {heads.map((h, i) => <th key={i}>{h}</th>)}
              {canEdit && <th style={{ textAlign: 'right' }}>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? filteredData.map(item => {
              // we need the original index for editing/deleting
              const originalIndex = data.findIndex(d => d === item);
              return (
                <tr key={originalIndex}>
                  {heads.map((headName, colIdx) => {
                    const rawVal = item[`c${colIdx + 1}`] || '-';
                    const isUrl = rawVal.startsWith('http://') || rawVal.startsWith('https://');
                    const isLongText = rawVal.length > 50 && !isUrl;
                    
                    let content;
                    
                    const isStatus = headName.toLowerCase().includes('status');

                    if (isStatus) {
                      let bg = 'var(--bg-surface)';
                      let color = 'var(--text-main)';
                      if (rawVal === 'To Do') { bg = '#475569'; color = 'white'; }
                      else if (rawVal === 'In Progress') { bg = '#3b82f6'; color = 'white'; }
                      else if (rawVal === 'Review') { bg = '#f59e0b'; color = 'white'; }
                      else if (rawVal === 'Revision') { bg = '#ef4444'; color = 'white'; }
                      else if (rawVal === 'Retake') { bg = '#dc2626'; color = 'white'; }
                      else if (rawVal === 'Finalized' || rawVal === 'Published' || rawVal === 'Active') { bg = '#10b981'; color = 'white'; }
                      else if (rawVal === 'Draft' || rawVal === 'Inactive') { bg = '#ef4444'; color = 'white'; }
                      
                      content = <span style={{ background: bg, color, padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 500 }}>{rawVal}</span>;
                    } else if (rawVal.startsWith('[FILE]')) {
                      content = (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>attach_file</span>
                          {rawVal.replace('[FILE] ', '')}
                        </span>
                      );
                    } else if (isUrl) {
                      content = (
                        <a href={rawVal} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--primary)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>link</span> Buka Tautan
                        </a>
                      );
                    } else if (isLongText) {
                      content = <div style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} dangerouslySetInnerHTML={{ __html: rawVal }} title={rawVal.replace(/<[^>]*>?/gm, '')} />;
                    } else {
                      content = <div dangerouslySetInnerHTML={{ __html: rawVal }} />;
                    }

                    return <td key={colIdx}>{content}</td>;
                  })}
                  {canEdit && (
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      {item.auditLog && (
                        <button type="button" className="btn-primary" title="Lihat Riwayat Audit" style={{ padding: '6px 10px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)', marginRight: '4px', background: '#3b82f6', border: 'none' }} onClick={() => showToast(`RIWAYAT PERUBAHAN:\n\n${item.auditLog?.split('|').join('\n')}`, 'info')}>
                          <span className="material-symbols-outlined" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>history</span>
                        </button>
                      )}
                      <button className="btn-primary" style={{ padding: '6px 10px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)', marginRight: '4px' }} onClick={() => onEdit(originalIndex)}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>edit</span>
                      </button>
                      <button className="btn-primary" style={{ padding: '6px 10px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--accent-1)', border: '1px solid var(--accent-1)', opacity: deletingIndex === originalIndex ? 0.7 : 1 }} onClick={() => handleDelete(originalIndex)} disabled={deletingIndex === originalIndex}>
                        {deletingIndex === originalIndex ? (
                          <span className="material-symbols-outlined" style={{ fontSize: '1rem', verticalAlign: 'middle', animation: 'spin 1s linear infinite' }}>progress_activity</span>
                        ) : (
                          <span className="material-symbols-outlined" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>delete</span>
                        )}
                      </button>
                    </td>
                  )}
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={heads.length + (canEdit ? 1 : 0)} style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '20px' }}>
                  Belum ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
