import React from 'react';
import { useAppContext } from '../../context/AppContext';

interface VideoCardProps {
  title: string;
  lecturer: string;
  course: string;
  videoLink: string;
  thumbnailUrl?: string; // Placeholder if any
  date: string;
  type: 'Video Edukasi' | 'Podcast';
}

const VideoCard: React.FC<VideoCardProps> = ({ title, lecturer, course, type, date, videoLink: _videoLink }) => {
  // Extracting plain text if HTML tags exist in strings
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const { showToast } = useAppContext();

  const handlePlay = () => {
    // Di masa depan bisa diarahkan ke halaman detail pemutar video
    showToast(`Membuka pemutar video untuk: ${title}`, 'info');
  };

  return (
    <div className="glass-card" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden', 
      borderRadius: '12px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
      border: '1px solid var(--glass-border)',
      background: 'var(--bg-surface)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 10px 20px rgba(138, 43, 226, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'none';
    }}
    onClick={handlePlay}
    >
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        aspectRatio: '16/9', 
        background: 'linear-gradient(45deg, #1f1f23, #2d2d34)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.2)' }}>
          {type === 'Podcast' ? 'podcasts' : 'play_circle'}
        </span>
        
        {/* Play Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(138, 43, 226, 0.2)', opacity: 0, transition: 'opacity 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
             onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
             onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
           <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'white', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>
              play_circle
           </span>
        </div>
      </div>
      
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(138, 43, 226, 0.1)', color: 'var(--primary)', borderRadius: '12px', fontWeight: 600 }}>
            {type}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{date}</span>
        </div>
        
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {stripHtml(title)}
        </h4>
        
        <div style={{ marginTop: 'auto' }}>
          <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>person</span>
            {stripHtml(lecturer)}
          </p>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>school</span>
            {stripHtml(course)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
