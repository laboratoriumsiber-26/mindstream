import React, { useState, useMemo } from 'react';
import { RowData } from '../../context/AppContext';

interface TableProps {
  pageId: string;
  data: RowData[];
  heads: string[];
  canEdit: boolean;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const Table: React.FC<TableProps> = ({ data, heads, canEdit, onEdit, onDelete }) => {
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

  const filterCols = ['status pekerjaan', 'status', 'editor', 'dosen', 'peran'];

  // Extract unique values for dynamic filters
  const dynamicFilters = useMemo(() => {
    const f: Record<number, string[]> = {};
    heads.forEach((h, idx) => {
      const hl = h.toLowerCase();
      if (filterCols.includes(hl)) {
        let uniqueValues: string[] = [];
        if (hl === 'status pekerjaan' || hl === 'status') {
          uniqueValues = ['To Do', 'In Progress', 'Review', 'Revision', 'Retake', 'Finalized'];
        } else if (hl === 'peran') {
          uniqueValues = ['Admin', 'Uploader', 'Editor', 'User'];
        } else {
          // Fallback to data driven
          const vals = new Set<string>();
          data.forEach(item => {
            let val = item[`c${idx + 1}`] || '';
            val = val.replace(/<[^>]*>?/gm, '').trim();
            if (val && val !== 'Belum ada' && val !== '-') vals.add(val);
          });
          uniqueValues = Array.from(vals);
        }
        if (uniqueValues.length > 0) f[idx] = uniqueValues;
      }
    });
    return f;
  }, [data, heads]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // 1. Check dropdown filters
      let rowMatches = true;
      for (const [colIdx, filterVal] of Object.entries(filters)) {
        if (filterVal) {
          const val = (item[`c${parseInt(colIdx) + 1}`] || '').replace(/<[^>]*>?/gm, '').toLowerCase();
          if (!val.includes(filterVal)) {
            rowMatches = false;
            break;
          }
        }
      }

      // 2. Check global text search
      if (rowMatches && searchTerm) {
        let searchMatch = false;
        for (let i = 1; i <= heads.length; i++) {
          const val = (item[`c${i}`] || '').replace(/<[^>]*>?/gm, '').toLowerCase();
          if (val.includes(searchTerm.toLowerCase())) {
            searchMatch = true;
            break;
          }
        }
        if (!searchMatch) rowMatches = false;
      }

      return rowMatches;
    });
  }, [data, searchTerm, filters, heads.length]);

  return (
    <>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
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
                  {heads.map((_, colIdx) => (
                    <td key={colIdx} dangerouslySetInnerHTML={{ __html: item[`c${colIdx + 1}`] || '-' }} />
                  ))}
                  {canEdit && (
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      {item.auditLog && (
                        <button type="button" className="btn-primary" title="Lihat Riwayat Audit" style={{ padding: '6px 10px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)', marginRight: '4px', background: '#3b82f6', border: 'none' }} onClick={() => alert(`RIWAYAT PERUBAHAN:\n\n${item.auditLog?.split('|').join('\n')}`)}>
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
