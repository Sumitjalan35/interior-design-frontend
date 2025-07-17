import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';

export default function AdminProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [multipleImgFiles, setMultipleImgFiles] = useState([]);
  const [multipleImgPreviews, setMultipleImgPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/admin/portfolio/${id}`)
      .then(res => res.json())
      .then(data => {
        setProject(data);
        setForm(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load project');
        setLoading(false);
      });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleFeatureChange(idx, value) {
    setForm(f => ({ ...f, features: f.features.map((ft, i) => i === idx ? value : ft) }));
  }

  function handleAddFeature() {
    setForm(f => ({ ...f, features: [...(f.features || []), ''] }));
  }

  function handleRemoveFeature(idx) {
    setForm(f => ({ ...f, features: f.features.filter((_, i) => i !== idx) }));
  }

  function handleEdit() {
    setEditing(true);
  }

  function handleCancel() {
    setForm(project);
    setEditing(false);
  }

  async function handleSave() {
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch(`/admin/portfolio/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Save failed');
      const updated = await res.json();
      setProject(updated);
      setForm(updated);
      setEditing(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Replace uploadMultipleImages and uploadImage with multi-upload support
  async function uploadImage(file) {
    // Single image upload (for backward compatibility)
    const fd = new FormData();
    fd.append('images', file);
    const res = await apiFetch('/admin/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.path) return data.path;
    throw new Error('Upload failed');
  }

  async function uploadMultipleImages(files) {
    const fd = new FormData();
    files.forEach(file => fd.append('images', file));
    try {
      const res = await apiFetch('/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.paths) return data.paths;
      if (data.path) return [data.path];
      throw new Error('Upload failed');
    } catch (err) {
      console.error('Upload error:', err);
      throw err;
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gold-400">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-400">{error}</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center text-red-400">Project not found</div>;

  return (
    <div className="min-h-screen bg-charcoal-900">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <img 
          src={form.mainImage || form.image} 
          alt={form.title}
          className="w-full h-full object-cover"
        />
        {editing && (
          <div className="absolute top-20 right-4 flex flex-col gap-2 bg-charcoal-900/80 p-4 rounded-xl shadow-lg z-10">
            <label className="text-gold-400 font-semibold mb-2">Change Hero Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={async e => {
                const file = e.target.files[0];
                if (file) {
                  setUploading(true);
                  try {
                    const path = await uploadImage(file);
                    setForm(f => ({ ...f, mainImage: path }));
                    setImgPreview(URL.createObjectURL(file));
                  } catch (err) {
                    alert('Failed to upload hero image');
                  } finally {
                    setUploading(false);
                  }
                }
              }}
              className="text-cream-300 mb-2"
            />
            {imgPreview && (
              <img src={imgPreview} alt="Hero Preview" className="w-40 h-24 object-cover rounded-lg border border-gold-400" />
            )}
            <span className="text-xs text-cream-300">Current: <br /><img src={form.mainImage || form.image} alt="Current Hero" className="w-40 h-12 object-cover rounded mt-1" /></span>
          </div>
        )}
        {/* Soft vignette: top, bottom, left, right borders only */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>
        {/* Project Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {editing ? (
                <input name="category" value={form.category || ''} onChange={handleChange} className="input-dark w-40" />
              ) : (
                <span className="px-4 py-2 bg-bronze-400/20 text-bronze-400 text-sm font-medium rounded-full border border-bronze-400/30">
                  {form.category}
                </span>
              )}
              <span className="text-cream-300/70 text-sm">
                {editing ? (
                  <>
                    <input name="area" value={form.area || ''} onChange={handleChange} className="input-dark w-32" placeholder="Area" />
                    <input name="duration" value={form.duration || ''} onChange={handleChange} className="input-dark w-32 ml-2" placeholder="Duration" />
                  </>
                ) : (
                  `${form.area} • ${form.duration}`
                )}
              </span>
            </div>
            {editing ? (
              <input name="title" value={form.title || ''} onChange={handleChange} className="input-dark text-4xl font-bold mb-4 w-full" />
            ) : (
              <h1 className="text-5xl md:text-7xl font-bold text-cream-100 mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
                {form.title}
              </h1>
            )}
            {editing ? (
              <textarea name="description" value={form.description || ''} onChange={handleChange} className="input-dark text-xl w-full" rows={2} />
            ) : (
              <p className="text-xl text-cream-300 max-w-2xl">{form.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div>
                <h2 className="text-3xl font-bold text-cream-100 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
                  Project Overview
                </h2>
                {editing ? (
                  <textarea name="longDescription" value={form.longDescription || ''} onChange={handleChange} className="input-dark text-lg w-full mb-8" rows={4} />
                ) : (
                  <p className="text-cream-300 text-lg leading-relaxed mb-8">
                    {form.longDescription}
                  </p>
                )}

                {/* Image Gallery */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-cream-100 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
                    Project Gallery
                  </h3>
                  {/* Main Image */}
                  <div className="mb-6">
                    <img 
                      src={form.images && form.images[selectedImage]} 
                      alt={`${form.title} - Image ${selectedImage + 1}`}
                      className="w-full h-96 md:h-[500px] object-cover rounded-2xl"
                    />
                  </div>
                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {form.images && form.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                          selectedImage === index 
                            ? 'ring-2 ring-bronze-400 scale-105' 
                            : 'hover:scale-105'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`${form.title} - Thumbnail ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                        {editing && (
                          <button type="button" onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== index) })); }} className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">&times;</button>
                        )}
                      </button>
                    ))}
                    {editing && (
                      <button type="button" onClick={() => setShowImageModal(true)} className="rounded-lg border-2 border-dashed border-bronze-400 text-bronze-400 flex items-center justify-center h-20">+ Upload Image</button>
                    )}
                  </div>
                  {/* Only keep the upload image modal and remove other add options */}
                  {editing && showImageModal && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                      <div className="bg-charcoal-800 p-8 rounded-xl shadow-xl w-full max-w-2xl flex flex-col gap-4 relative">
                        <button onClick={() => { 
                          setShowImageModal(false); 
                          setImgFile(null); 
                          setImgPreview(null);
                          setMultipleImgFiles([]);
                          setMultipleImgPreviews([]);
                        }} className="absolute top-2 right-4 text-gold-400 text-2xl">&times;</button>
                        <h2 className="text-xl font-bold text-gold-400 mb-2">Add Project Images</h2>
                        <p className="text-cream-300 text-sm mb-4">Select multiple images to upload at once</p>
                        
                        <input 
                          type="file" 
                          accept="image/*" 
                          multiple
                          onChange={e => {
                            const files = Array.from(e.target.files);
                            setMultipleImgFiles(files);
                            const previews = files.map(file => URL.createObjectURL(file));
                            setMultipleImgPreviews(previews);
                          }} 
                          className="text-cream-300"
                        />
                        
                        {multipleImgPreviews.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                            {multipleImgPreviews.map((preview, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedImage(index)}
                                className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                                  selectedImage === index 
                                    ? 'ring-2 ring-bronze-400 scale-105' 
                                    : 'hover:scale-105'
                                }`}
                              >
                                <img
                                  src={preview}
                                  alt={`Preview ${index}`}
                                  className="object-cover w-full h-24"
                                />
                                {/* Remove button as span, not button */}
                                <span
                                  onClick={e => { e.stopPropagation(); handleRemoveMultipleImg(index); }}
                                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer"
                                  aria-label="Remove"
                                >
                                  ×
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <button
                            onClick={async () => {
                              if (multipleImgFiles.length === 0) return;
                              setUploading(true);
                              try {
                                const paths = await uploadMultipleImages(multipleImgFiles);
                                setForm(f => ({ ...f, images: [...(f.images || []), ...paths] }));
                                setShowImageModal(false);
                                setMultipleImgFiles([]);
                                setMultipleImgPreviews([]);
                              } catch (error) {
                                console.error('Upload failed:', error);
                                alert('Some images failed to upload. Please try again.');
                              } finally {
                                setUploading(false);
                              }
                            }}
                            disabled={multipleImgFiles.length === 0 || uploading}
                            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {uploading ? 'Uploading...' : `Upload ${multipleImgFiles.length} Image${multipleImgFiles.length !== 1 ? 's' : ''}`}
                          </button>
                          <button
                            onClick={() => { 
                              setShowImageModal(false); 
                              setMultipleImgFiles([]);
                              setMultipleImgPreviews([]);
                            }}
                            className="btn-secondary"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div>
                {/* Project Stats */}
                <div className="bg-charcoal-800/50 rounded-2xl p-6 border border-charcoal-700/50 mb-8">
                  <h3 className="text-xl font-bold text-cream-100 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-cream-300/70 text-sm">Location</span>
                      {editing ? (
                        <input name="location" value={form.location || ''} onChange={handleChange} className="input-dark w-full" />
                      ) : (
                        <p className="text-cream-100 font-medium">{form.location}</p>
                      )}
                    </div>
                    <div>
                      <span className="text-cream-300/70 text-sm">Area</span>
                      {editing ? (
                        <input name="area" value={form.area || ''} onChange={handleChange} className="input-dark w-full" />
                      ) : (
                        <p className="text-cream-100 font-medium">{form.area}</p>
                      )}
                    </div>
                    <div>
                      <span className="text-cream-300/70 text-sm">Duration</span>
                      {editing ? (
                        <input name="duration" value={form.duration || ''} onChange={handleChange} className="input-dark w-full" />
                      ) : (
                        <p className="text-cream-100 font-medium">{form.duration}</p>
                      )}
                    </div>
                    <div>
                      <span className="text-cream-300/70 text-sm">Budget</span>
                      {editing ? (
                        <input name="budget" value={form.budget || ''} onChange={handleChange} className="input-dark w-full" />
                      ) : (
                        <p className="text-cream-100 font-medium">{form.budget}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-charcoal-800/50 rounded-2xl p-6 border border-charcoal-700/50 mb-8">
                  <h3 className="text-xl font-bold text-cream-100 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {form.features && form.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-cream-300">
                        <i className="fas fa-check text-bronze-400 text-sm"></i>
                        {editing ? (
                          <>
                            <input value={feature} onChange={e => handleFeatureChange(index, e.target.value)} className="input-dark w-full" />
                            <button type="button" onClick={() => handleRemoveFeature(index)} className="ml-2 text-red-400">Remove</button>
                          </>
                        ) : feature}
                      </li>
                    ))}
                  </ul>
                  {editing && <button type="button" onClick={handleAddFeature} className="btn-secondary mt-2">+ Add Feature</button>}
                </div>

                {/* Testimonials */}
                <div className="bg-charcoal-800/50 rounded-2xl p-6 border border-charcoal-700/50">
                  <h3 className="text-xl font-bold text-cream-100 mb-6" style={{fontFamily: 'Playfair Display, serif'}}>
                    Client Feedback
                  </h3>
                  {form.testimonials && form.testimonials.map((testimonial, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      {editing ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-cream-300/70 text-sm">Rating:</span>
                            <select 
                              value={testimonial.rating} 
                              onChange={e => {
                                const newTestimonials = [...form.testimonials];
                                newTestimonials[index] = { ...testimonial, rating: parseInt(e.target.value) };
                                setForm(f => ({ ...f, testimonials: newTestimonials }));
                              }}
                              className="input-dark w-20"
                            >
                              {[1,2,3,4,5].map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                            <button 
                              type="button" 
                              onClick={() => {
                                setForm(f => ({ 
                                  ...f, 
                                  testimonials: f.testimonials.filter((_, i) => i !== index) 
                                }));
                              }}
                              className="ml-2 text-red-400 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                          <textarea 
                            value={testimonial.content} 
                            onChange={e => {
                              const newTestimonials = [...form.testimonials];
                              newTestimonials[index] = { ...testimonial, content: e.target.value };
                              setForm(f => ({ ...f, testimonials: newTestimonials }));
                            }}
                            className="input-dark w-full text-sm" 
                            rows={2}
                            placeholder="Testimonial content"
                          />
                          <input 
                            value={testimonial.name} 
                            onChange={e => {
                              const newTestimonials = [...form.testimonials];
                              newTestimonials[index] = { ...testimonial, name: e.target.value };
                              setForm(f => ({ ...f, testimonials: newTestimonials }));
                            }}
                            className="input-dark w-full text-sm" 
                            placeholder="Client name"
                          />
                          <input 
                            value={testimonial.role} 
                            onChange={e => {
                              const newTestimonials = [...form.testimonials];
                              newTestimonials[index] = { ...testimonial, role: e.target.value };
                              setForm(f => ({ ...f, testimonials: newTestimonials }));
                            }}
                            className="input-dark w-full text-sm" 
                            placeholder="Client role/position"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`fas fa-star text-sm ${i < testimonial.rating ? 'text-bronze-400' : 'text-charcoal-600'}`}></i>
                            ))}
                          </div>
                          <p className="text-cream-300 text-sm italic mb-2">"{testimonial.content}"</p>
                          <p className="text-bronze-400 text-sm font-medium">{testimonial.name}</p>
                          <p className="text-cream-300/70 text-xs">{testimonial.role}</p>
                        </>
                      )}
                    </div>
                  ))}
                  {editing && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setForm(f => ({ 
                          ...f, 
                          testimonials: [...(f.testimonials || []), { rating: 5, content: '', name: '', role: '' }] 
                        }));
                      }}
                      className="btn-secondary mt-2"
                    >
                      + Add Testimonial
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Admin Controls */}
          <div className="flex gap-4 mt-8">
            {!editing && <button onClick={handleEdit} className="btn-primary">Edit</button>}
            {editing && <>
              <button onClick={handleSave} className="btn-primary">Save</button>
              <button onClick={handleCancel} className="btn-secondary">Cancel</button>
            </>}
            <button onClick={() => navigate(-1)} className="btn-secondary">Back to Dashboard</button>
          </div>
        </div>
      </section>
    </div>
  );
} 
