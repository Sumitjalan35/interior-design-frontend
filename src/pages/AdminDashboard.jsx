import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedCard, { ServiceCard } from '../components/AnimatedCard';
import { portfolioAPI, servicesAPI, slideshowAPI, BACKEND_URL } from '../services/api';

const TABS = ['Portfolio', 'Services', 'Slideshow'];

const getImageUrl = (path) => path && path.startsWith('/uploads/') && BACKEND_URL ? `${BACKEND_URL}${path}` : path;

function ImagePreview({ src, alt }) {
  return src ? <img src={src} alt={alt} className="w-24 h-24 object-cover rounded shadow" /> : null;
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('Portfolio');
  const [portfolio, setPortfolio] = useState([]);
  const [services, setServices] = useState([]);
  const [slideshow, setSlideshow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null); // {type, data}
  const [form, setForm] = useState({});
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const navigate = useNavigate();

  // Auth check
  useEffect(() => {
    if (!localStorage.getItem('admin_token')) navigate('/admin-login');
  }, [navigate]);

  // Load data
  const loadAll = () => {
    setLoading(true);
    setError('');
    Promise.all([
      portfolioAPI.getAll().then(r => r.data),
      servicesAPI.getAll().then(r => r.data),
      slideshowAPI.getAll().then(r => r.data),
    ]).then(([p, s, ss]) => {
      setPortfolio(p);
      setServices(s);
      setSlideshow(ss);
      setLoading(false);
    }).catch(() => {
      setError('Failed to load admin data');
      setLoading(false);
    });
  };
  useEffect(loadAll, []);

  // Image upload helper
  async function uploadImage(file) {
    const fd = new FormData();
    fd.append('images', file);
    const token = localStorage.getItem('admin_token');
    const res = await fetch(`${BACKEND_URL}/api/admin/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });
    const data = await res.json();
    if (data.path) return data.path;
    throw new Error('Upload failed');
  }

  // Modal open/close helpers
  function openModal(type, data = {}) {
    setForm(data);
    setImgFile(null);
    setImgPreview(data.image || null);
    setModal({ type, data });
  }
  function closeModal() {
    setModal(null);
    setForm({});
    setImgFile(null);
    setImgPreview(null);
  }

  // Handle form input
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }
  function handleImgChange(e) {
    const file = e.target.files[0];
    setImgFile(file);
    setImgPreview(file ? URL.createObjectURL(file) : null);
  }

  // CRUD handlers
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
  // Slideshow add/delete
  async function handleAddSlideshow() {
    setLoading(true);
    try {
      let image = null;
      if (imgFile) image = await uploadImage(imgFile);
      if (!image) throw new Error('No image');
      await slideshowAPI.add({ image });
      closeModal();
      // Force refresh slideshow data specifically
      const ss = await slideshowAPI.getAll().then(r => r.data);
      setSlideshow(ss);
      // Also refresh other data
      loadAll();
      // Show success message
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
      // Show success message
      alert('Slideshow image removed successfully! The main page will update automatically.');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // ...rest of your component rendering logic, using getImageUrl for all <img src=...> usages
} 
