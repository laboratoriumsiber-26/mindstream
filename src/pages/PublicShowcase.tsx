import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import PublicLayout from '../components/Layout/PublicLayout';
import VideoCard from '../components/UI/VideoCard';

const fallbackSlides = [
  {
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80', // Studio/Podcast
    title: 'Transformasi Pembelajaran Digital',
    subtitle: 'Pusat Inovasi Pembelajaran Digital (PIPD) UIN Siber Syekh Nurjati Cirebon menghadirkan pengalaman belajar interaktif kelas dunia.'
  },
  {
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1920&q=80', // VR
    title: 'Masa Depan Pendidikan',
    subtitle: 'Mengeksplorasi teknologi Immersive Learning dan Virtual Reality untuk pendidikan Islam yang tak terbatas ruang.'
  },
  {
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80', // Digital Classroom
    title: 'Open Islamic Educational Resources',
    subtitle: 'Menyediakan akses terbuka bagi jutaan pencari ilmu ke berbagai literatur, modul, dan video edukasi unggulan.'
  }
];

const PublicShowcase: React.FC = () => {
  const { state } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Extract CMS Slider
  const cmsSliders = state.appData['cms-slider'] || [];
  const activeSlides = cmsSliders.length > 0 ? cmsSliders.map((s: any) => ({
    title: s.c1 || 'Untitled Slide',
    subtitle: s.c2 || '',
    image: s.c3 || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80'
  })) : fallbackSlides;

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);
  
  const finalizedVideos = (state.appData['video-pembelajaran'] || [])
    .filter(v => v.c8 && v.c8.includes('Finalized'))
    .map(v => ({
      title: v.c1 || 'Untitled Video',
      lecturer: v.c2 || 'Unknown',
      course: 'Video Pembelajaran', 
      videoLink: v.c5 || '#',
      date: v.c7 || 'Baru',
      type: 'Video Edukasi' as const
    }));

  const finalizedPodcasts = (state.appData['podcast'] || [])
    .filter(p => p.c8 && p.c8.includes('Finalized'))
    .map(p => ({
      title: p.c1 || 'Untitled Podcast',
      lecturer: p.c3 || 'Unknown',
      course: 'Podcast Mahasiswa',
      videoLink: p.c5 || '#',
      date: p.c7 || 'Baru',
      type: 'Podcast' as const
    }));




  return (
    <PublicLayout>
      {/* Hero Carousel */}
      <div className="hero-slider-container">
        {activeSlides.map((slide: any, idx: number) => (
          <div 
            key={idx} 
            className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="hero-overlay">
          <h2 className="hero-title">{activeSlides[currentSlide]?.title}</h2>
          <p className="hero-subtitle">{activeSlides[currentSlide]?.subtitle}</p>
          
          <div className="hero-search">
            <span className="material-symbols-outlined">search</span>
            <input 
              type="text" 
              placeholder="Cari mata kuliah, dosen, atau materi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="hero-dots">
          {activeSlides.map((_: any, idx: number) => (
            <div 
              key={idx} 
              className={`hero-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <main style={{ padding: '60px 40px', flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
        {/* Section: Video Pembelajaran */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>smart_display</span> Video Pembelajaran Terbaru</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Materi ajar digital interaktif untuk mahasiswa.</p>
            </div>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', background: 'rgba(188, 48, 95, 0.1)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>{finalizedVideos.length} Video</span>
          </div>

          {finalizedVideos.length > 0 ? (
            <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'thin' }} className="horizontal-scroll">
              {finalizedVideos.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.lecturer.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
                <div key={idx} style={{ minWidth: '320px', flex: '0 0 auto' }}>
                  <VideoCard 
                    title={item.title}
                    lecturer={item.lecturer}
                    course={item.course}
                    date={item.date}
                    type={item.type}
                    videoLink={item.videoLink}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px dashed var(--glass-border)' }}>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Belum ada Video Pembelajaran yang dirilis.</p>
            </div>
          )}
        </div>

        {/* Section: Podcast Inovasi */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><span className="material-symbols-outlined" style={{ color: '#f59e0b' }}>mic_external_on</span> Podcast Inovasi Terbaru</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Diskusi inspiratif bersama para pakar.</p>
            </div>
            <span style={{ color: '#f59e0b', fontWeight: 'bold', background: 'rgba(245, 158, 11, 0.1)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>{finalizedPodcasts.length} Episode</span>
          </div>

          {finalizedPodcasts.length > 0 ? (
            <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'thin' }} className="horizontal-scroll">
              {finalizedPodcasts.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.lecturer.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
                <div key={idx} style={{ minWidth: '320px', flex: '0 0 auto' }}>
                  <VideoCard 
                    title={item.title}
                    lecturer={item.lecturer}
                    course={item.course}
                    date={item.date}
                    type={item.type}
                    videoLink={item.videoLink}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px dashed var(--glass-border)' }}>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Belum ada Podcast Inovasi yang dirilis.</p>
            </div>
          )}
        </div>
      </main>
    </PublicLayout>
  );
};

export default PublicShowcase;
