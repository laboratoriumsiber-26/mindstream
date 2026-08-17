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

  const allContent = [...finalizedVideos, ...finalizedPodcasts].sort((a, b) => b.date.localeCompare(a.date));

  const filteredContent = allContent.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.lecturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <main style={{ padding: '60px 40px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <h3 style={{ fontSize: '2rem', margin: '0 0 8px 0' }}>Katalog Video Inovasi</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Menampilkan karya final dari ekosistem MindStream.</p>
          </div>
          <span style={{ color: 'var(--primary)', fontWeight: 'bold', background: 'rgba(188, 48, 95, 0.1)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>{filteredContent.length} Video Ditemukan</span>
        </div>

        {filteredContent.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {filteredContent.map((item, idx) => (
              <VideoCard 
                key={idx}
                title={item.title}
                lecturer={item.lecturer}
                course={item.course}
                date={item.date}
                type={item.type}
                videoLink={item.videoLink}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '4rem', marginBottom: '16px', opacity: 0.5 }}>search_off</span>
            <p style={{ fontSize: '1.2rem' }}>Tidak ada video yang sesuai dengan kriteria pencarian Anda.</p>
          </div>
        )}
      </main>
    </PublicLayout>
  );
};

export default PublicShowcase;
