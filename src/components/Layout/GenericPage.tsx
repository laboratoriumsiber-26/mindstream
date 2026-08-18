import React, { useState, useEffect } from 'react';
import { useAppContext, RowData } from '../../context/AppContext';
import { tableConfigs, pageDataMap } from '../../utils/config';
import Table from '../UI/Table';
import DataForm from '../UI/DataForm';

interface GenericPageProps {
  pageId: string;
}

const GenericPage: React.FC<GenericPageProps> = ({ pageId }) => {
  const { state, addRow, updateRow, deleteRow, showToast, showConfirm } = useAppContext();
  const config = tableConfigs[pageId];
  const pageData = pageDataMap[pageId];
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<RowData | undefined>();

  useEffect(() => {
    setIsFormOpen(false);
    setEditingIndex(null);
    setEditingData(undefined);
  }, [pageId]);

  const dbTableName = pageId.includes('video') && !pageId.includes('podcast') ? 'video-pembelajaran' : pageId.includes('podcast') ? 'podcast' : pageId;
  const data = state.appData[dbTableName] || [];
  
  const canEdit = state.role !== 'user' && !['daftar-admin', 'daftar-uploader', 'daftar-editor', 'daftar-user'].includes(pageId);
  const isEditorMenu = pageId.startsWith('editor-');

  const handleAdd = () => {
    setEditingIndex(null);
    setEditingData(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingData(data[index]);
    setIsFormOpen(true);
  };

  const handleDelete = (index: number) => {
    showConfirm('Yakin ingin menghapus data ini?', () => {
      deleteRow(dbTableName, index);
      showToast('Data berhasil dihapus', 'success');
    });
  };

  const handleSubmit = (formData: RowData) => {
    if (editingIndex !== null) {
      updateRow(dbTableName, editingIndex, formData);
      showToast('Data berhasil diperbarui', 'success');
    } else {
      addRow(dbTableName, formData);
      showToast('Data baru berhasil ditambahkan', 'success');
    }
    setIsFormOpen(false);
  };

  if (isFormOpen) {
    return (
      <div className="fade-in">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
          <button 
            onClick={() => setIsFormOpen(false)}
            style={{ 
              background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-main)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', 
              borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700 }}>
            {editingIndex !== null ? 'Edit Data' : 'Tambah Data'} <span style={{ color: 'var(--primary)' }}>{pageData?.label || pageId}</span>
          </h1>
        </div>

        <div className="glass-card" style={{ padding: '32px' }}>
          <DataForm 
            pageId={pageId} 
            initialData={editingData} 
            onSubmit={handleSubmit} 
            onClose={() => setIsFormOpen(false)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>
          Kelola <span style={{ color: 'var(--primary)' }}>{pageData?.label || pageId}</span>
        </h1>
        {canEdit && !isEditorMenu && (
          <button className="btn-primary" onClick={handleAdd}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', marginRight: '8px' }}>add</span>
            Tambah Data
          </button>
        )}
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
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
          <p style={{ color: 'var(--text-muted)' }}>Konfigurasi tabel tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default GenericPage;
