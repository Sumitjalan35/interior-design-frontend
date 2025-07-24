import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedCard, { ServiceCard } from '../components/AnimatedCard';
import { portfolioAPI, servicesAPI, slideshowAPI, BACKEND_URL } from '../services/api';

const TABS = ['Portfolio', 'Services', 'Slideshow'];

function ImagePreview({ src, alt }) {
  return src ? <img src={src} alt={alt} className="w-24 h-24 object-cover rounded shadow" /> : null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(TABS[0]);
  const [portfolio, setPortfolio] = useState([]);
  const [services, setServices] = useState([]);
  const [slideshow, setSlideshow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  // Auth check
  useEffect(() => {
    if (!localStorage.getItem('admin_token')) navigate('/admin-login');
  }, [navigate]);

  // Load data
  const loadAll = async () => {
    setLoading(true);
    setError('');
    try {
      const [p, s, ss] = await Promise.all([
        portfolioAPI.getAll().then(r => r.data),
        servicesAPI.getAll().then(r => r.data),
        slideshowAPI.getAll().then(r => r.data),
      ]);
      setPortfolio(Array.isArray(p) ? p : []);
      setServices(Array.isArray(s) ? s : []);
      setSlideshow(Array.isArray(ss) ? ss : []);
    } catch (e) {
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  async function uploadImage(file) {
    const fd = new FormData();
    fd.append('images', file);
    // Use the new Cloudinary upload endpoint
    const res = await fetch('/api/admin/upload-cloudinary', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
      body: fd,
    });
    const data = await res.json();
    if (data.url) return data.url;
    throw new Error('Upload failed');
  }

  function openModal(type, data = {}) {
    setModal({ type, ...data });
    setForm(data);
    setImgFile(null);
    setImgPreview(data.image ? data.image : null);
  }

  function closeModal() {
    setModal(null);
    setForm({});
    setImgFile(null);
    setImgPreview(null);
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleImgChange(e) {
    const file = e.target.files[0];
    setImgFile(file);
    setImgPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSave(type) {
    setLoading(true);
    try {
      let image = form.image;
      if (imgFile) image = await uploadImage(imgFile);
      let body = { ...form, image };
      if (type === 'portfolio') {
        if (form.id) {
          await portfolioAPI.update(form.id, body);
        } else {
          await portfolioAPI.create(body);
        }
      } else if (type === 'services') {
        if (form.id) {
          await servicesAPI.update(form.id, body);
        } else {
          await servicesAPI.create(body);
        }
      }
      closeModal();
      loadAll();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(type, id) {
    if (!window.confirm('Are you sure?')) return;
    setLoading(true);
    try {
      if (type === 'portfolio') {
        await portfolioAPI.delete(id);
      } else if (type === 'services') {
        await servicesAPI.delete(id);
      }
      loadAll();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddSlideshow() {
    setLoading(true);
    try {
      let image = null;
      if (imgFile) image = await uploadImage(imgFile);
      if (!image) throw new Error('No image');
      await slideshowAPI.add({ image });
      closeModal();
      const ss = await slideshowAPI.getAll().then(r => r.data);
      setSlideshow(Array.isArray(ss) ? ss : []);
      loadAll();
      alert('Slideshow image added successfully! The main page will update automatically.');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteSlideshow(idx) {
    if (!window.confirm('Remove this image?')) return;
    setLoading(true);
    try {
      await slideshowAPI.delete(idx);
      loadAll();
      alert('Slideshow image removed successfully! The main page will update automatically.');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Render modals
  function renderModal() {
    if (!modal) return null;
    if (modal.type === 'portfolio' || modal.type === 'services') {
      return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-charcoal-800 p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col gap-4 relative">
            <button onClick={closeModal} className="absolute top-2 right-4 text-gold-400 text-2xl">&times;</button>
            <h2 className="text-xl font-bold text-gold-400 mb-2">{form.id ? 'Edit' : 'Add'} {modal.type === 'portfolio' ? 'Portfolio Card' : 'Service Card'}</h2>
            <input name="title" value={form.title || ''} onChange={handleChange} placeholder="Title" className="input-dark" required />
            <textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" className="input-dark" rows={3} required />
            <input type="file" accept="image/*" onChange={handleImgChange} />
            {imgPreview && <ImagePreview src={imgPreview} alt="Preview" />}
            <button onClick={() => handleSave(modal.type)} className="btn-primary w-full">{form.id ? 'Save Changes' : 'Add'}</button>
          </div>
        </div>
      );
    }
    if (modal.type === 'slideshow') {
      return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-charcoal-800 p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col gap-4 relative">
            <button onClick={closeModal} className="absolute top-2 right-4 text-gold-400 text-2xl">&times;</button>
            <h2 className="text-xl font-bold text-gold-400 mb-2">Add Slideshow Image</h2>
            <input type="file" accept="image/*" onChange={handleImgChange} />
            {imgPreview && <ImagePreview src={imgPreview} alt="Preview" />}
            <button onClick={handleAddSlideshow} className="btn-primary w-full">Add Image</button>
          </div>
        </div>
      );
    }
    if (modal.type === 'portfolioDetails') {
      return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-charcoal-800 p-8 rounded-xl shadow-xl w-full max-w-lg flex flex-col gap-4 relative">
            <button onClick={closeModal} className="absolute top-2 right-4 text-gold-400 text-2xl">&times;</button>
            <h2 className="text-xl font-bold text-gold-400 mb-2">Edit Project Details</h2>
            <input name="title" value={form.title || ''} onChange={handleChange} placeholder="Title" className="input-dark" required />
            <input name="subtitle" value={form.subtitle || ''} onChange={handleChange} placeholder="Subtitle" className="input-dark" />
            <textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" className="input-dark" rows={3} required />
            <input name="location" value={form.location || ''} onChange={handleChange} placeholder="Location" className="input-dark" />
            <input name="year" value={form.year || ''} onChange={handleChange} placeholder="Year" className="input-dark" />
            <label className="text-gold-400 font-semibold">Features (comma separated)</label>
            <input name="features" value={form.features ? form.features.join(', ') : ''} onChange={e => setForm(f => ({ ...f, features: e.target.value.split(',').map(s => s.trim()) }))} placeholder="Feature1, Feature2, ..." className="input-dark" />
            <label className="text-gold-400 font-semibold">Project Images</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(form.images || []).map((img, idx) => (
                <div key={img + idx} className="relative">
                  <img src={img} alt="Project" className="w-16 h-16 object-cover rounded" />
                  <button type="button" onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">&times;</button>
                </div>
              ))}
            </div>
            <input type="text" placeholder="Add image URL and press Enter" className="input-dark" onKeyDown={e => {
              if (e.key === 'Enter' && e.target.value) {
                setForm(f => ({ ...f, images: [...(f.images || []), e.target.value] }));
                e.target.value = '';
              }
            }} />
            <button onClick={() => handleSave('project-details')} className="btn-primary w-full">Save Details</button>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-charcoal-900 text-cream-100 p-8">
      <h1 className="text-3xl font-bold text-gold-400 mb-6">Admin Dashboard</h1>
      <div className="flex gap-4 mb-8">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg font-semibold ${tab === t ? 'bg-gold-400 text-charcoal-900' : 'bg-charcoal-800 text-gold-400'}`}>{t}</button>
        ))}
      </div>
      {loading ? <div>Loading...</div> : error ? <div className="text-red-400">{error}</div> : (
        <div>
          {tab === 'Portfolio' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Portfolio Cards</h2>
                <button onClick={() => openModal('portfolio')} className="btn-primary">Add New</button>
              </div>
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {portfolio.map((card, idx) => (
                  <div
                    key={card.id}
                    className="group glass-card hover-lift rounded-xl overflow-hidden shadow-lg border border-gold-400/20 hover:border-gold-400/60 transition-all duration-300 flex flex-col items-center cursor-pointer relative"
                    style={{ perspective: 1000 }}
                    onClick={() => navigate(`/admin/project/${card.id}`)}
                  >
                    <div className="overflow-hidden w-full aspect-square flex items-center justify-center bg-[#222]">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="py-6 text-center">
                      <div className="text-gold-400 text-xl font-playfair font-medium tracking-wide">{card.title}</div>
                      <div className="text-xs text-cream-300 mt-1 uppercase tracking-widest">{card.category}</div>
                      <div className="text-cream-200 text-sm mt-2">{card.description}</div>
                    </div>
                    {/* Admin Controls */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2 z-10" onClick={e => e.stopPropagation()}>
                      <button onClick={() => openModal('portfolio', card)} className="btn-secondary text-xs">Edit</button>
                      <button onClick={() => handleDelete('portfolio', card.id)} className="btn-secondary bg-red-600 hover:bg-red-700 text-white text-xs">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'Services' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Service Cards</h2>
                <button onClick={() => openModal('services')} className="btn-primary">Add New</button>
              </div>
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {services.map((card, idx) => (
                  <div key={card.id} className="relative">
                    <ServiceCard
                      icon={card.icon || 'fas fa-couch'}
                      title={card.title}
                      description={card.description}
                      className="w-full"
                    />
                    {/* Admin Controls */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                      <button onClick={() => openModal('services', card)} className="btn-secondary text-xs">Edit</button>
                      <button onClick={() => handleDelete('services', card.id)} className="btn-secondary bg-red-600 hover:bg-red-700 text-white text-xs">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'Slideshow' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Slideshow Images</h2>
                <div className="flex gap-2">
                  <button onClick={() => {
                    slideshowAPI.getAll().then(r => r.data).then(data => {
                      setSlideshow(Array.isArray(data) ? data : []);
                    });
                  }} className="btn-secondary">Refresh</button>
                  <button onClick={() => openModal('slideshow')} className="btn-primary">Add Image</button>
                </div>
              </div>
              <div className="mb-4 p-4 bg-blue-900/30 border border-blue-400/30 rounded-lg">
                <p className="text-blue-300 text-sm">
                  <i className="fas fa-info-circle mr-2"></i>
                  Changes to slideshow images will automatically appear on the main page within 30 seconds.
                </p>
              </div>
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {slideshow.map((img, idx) => (
                  <div key={img + idx} className="relative group overflow-hidden rounded-xl shadow-lg border border-gold-400/20 bg-black/70">
                    <img
                      src={img}
                      alt={`Slideshow ${idx + 1}`}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = '/assets/placeholder.jpg'; // Make sure you have a placeholder image in your assets
                      }}
                    />
                    <button
                      onClick={() => handleDeleteSlideshow(idx)}
                      className="absolute top-2 right-2 px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs z-10 shadow font-bold"
                      style={{ fontSize: '0.95rem', minWidth: 'auto', minHeight: 'auto' }}
                      aria-label="Remove image"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {renderModal()}
    </div>
  );
} 
