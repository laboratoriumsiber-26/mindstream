import React, { useState } from 'react';
import { useAppContext, RowData } from '../../context/AppContext';
import { tableConfigs, pageDataMap } from '../../utils/config';
import Table from '../UI/Table';
import FormModal from '../UI/FormModal';

interface GenericPageProps {
  pageId: string;
}

const GenericPage: React.FC<GenericPageProps> = ({ pageId }) => {
  const { state, addRow, updateRow, deleteRow, showToast, showConfirm } = useAppContext();
  const config = tableConfigs[pageId];
  const pageData = pageDataMap[pageId];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<RowData | undefined>();

  const data = state.appData[pageId] || [];
  
  const canEdit = state.role !== 'user' && !['daftar-admin', 'daftar-uploader', 'daftar-editor', 'daftar-user'].includes(pageId);

  const handleAdd = () => {
    setEditingIndex(null);
    setEditingData(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingData(data[index]);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    showConfirm('Yakin ingin menghapus data ini?', () => {
      deleteRow(pageId, index);
      showToast('Data berhasil dihapus', 'success');
    });
  };

  const handleSubmit = (formData: RowData) => {
    if (editingIndex !== null) {
      updateRow(pageId, editingIndex, formData);
      showToast('Data berhasil diperbarui', 'success');
    } else {
      addRow(pageId, formData);
      showToast('Data baru berhasil ditambahkan', 'success');
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <a href="#dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface-hover)', border: '1px solid var(--glass-border)', transition: 'all 0.2s ease' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>home</span> Beranda
        </a> 
        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chevron_right</span>
        <span style={{ fontWeight: 500, color: 'var(--primary)' }}>{pageData?.label || pageId}</span>
      </div>
      
      {isModalOpen && (
        <FormModal 
          pageId={pageId}
          initialData={editingData}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
      
      <div className="glass-card" style={{ padding: '24px', border: 'var(--glass-border)', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h3 style={{ margin: 0 }}>{pageData?.label || pageId}</h3>
          {canEdit && <button className="btn-primary" onClick={handleAdd} style={{ whiteSpace: 'nowrap' }}>+ Tambah Data</button>}
        </div>

        {config ? (
          <Table 
            pageId={pageId} 
            data={data} 
            heads={config.heads} 
            canEdit={canEdit}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div>Belum ada konfigurasi untuk {pageId}</div>
        )}
      </div>
    </>
  );
};

export default GenericPage;
