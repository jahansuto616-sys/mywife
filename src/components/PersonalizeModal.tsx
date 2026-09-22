import React, { useState } from 'react';
import { AppSettings, PhotoItem } from '../types';
import { X, Save, RotateCcw, Heart, Image as ImageIcon } from 'lucide-react';
import { DEFAULT_SETTINGS } from '../data/defaultData';

interface PersonalizeModalProps {
  isOpen: boolean;
  settings: AppSettings;
  onClose: () => void;
  onSave: (newSettings: AppSettings) => void;
  onReset: () => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  settings,
  onClose,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<AppSettings>({ ...settings });
  const [activeTab, setActiveTab] = useState<'general' | 'photos' | 'letter'>('general');

  if (!isOpen) return null;

  const handleChange = (field: keyof AppSettings, val: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handlePhotoChange = (index: number, key: keyof PhotoItem, value: string) => {
    const updated = [...formData.photos];
    updated[index] = { ...updated[index], [key]: value };
    setFormData((prev) => ({ ...prev, photos: updated }));
  };

  const handlePhotoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handlePhotoChange(index, 'url', url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#140b22] border border-rose-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-900/40 bg-[#1c0f30]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <h2 className="text-lg font-serif-romantic font-semibold text-white">
              Personalize Your Gift Experience
            </h2>
          </div>
          <button
            id="close-customize-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-rose-500/20 text-rose-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-rose-900/40 bg-[#170e28] px-6 text-sm">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 px-4 font-medium transition-colors border-b-2 ${
              activeTab === 'general'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-rose-300/60 hover:text-rose-200'
            }`}
          >
            Names & Birthday
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`py-3 px-4 font-medium transition-colors border-b-2 ${
              activeTab === 'photos'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-rose-300/60 hover:text-rose-200'
            }`}
          >
            Your 10 Photos & Memories
          </button>
          <button
            onClick={() => setActiveTab('letter')}
            className={`py-3 px-4 font-medium transition-colors border-b-2 ${
              activeTab === 'letter'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-rose-300/60 hover:text-rose-200'
            }`}
          >
            Love Letter
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5 text-rose-100 text-sm">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1">
                    Her Name / Pet Name
                  </label>
                  <input
                    id="input-wife-name"
                    type="text"
                    value={formData.wifeName}
                    onChange={(e) => handleChange('wifeName', e.target.value)}
                    placeholder="e.g. Jessica / My Love"
                    className="w-full bg-[#201335] border border-rose-800/60 rounded-xl px-3.5 py-2 text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1">
                    Her Nickname
                  </label>
                  <input
                    id="input-nickname"
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => handleChange('nickname', e.target.value)}
                    placeholder="e.g. My Princess / Angel"
                    className="w-full bg-[#201335] border border-rose-800/60 rounded-xl px-3.5 py-2 text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1">
                    Birthday Date
                  </label>
                  <input
                    id="input-birthday-date"
                    type="text"
                    value={formData.birthdayDate}
                    onChange={(e) => handleChange('birthdayDate', e.target.value)}
                    placeholder="e.g. September 23"
                    className="w-full bg-[#201335] border border-rose-800/60 rounded-xl px-3.5 py-2 text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1">
                    Age / Milestone
                  </label>
                  <input
                    id="input-age-number"
                    type="number"
                    value={formData.ageNumber}
                    onChange={(e) => handleChange('ageNumber', parseInt(e.target.value) || 23)}
                    placeholder="e.g. 23"
                    className="w-full bg-[#201335] border border-rose-800/60 rounded-xl px-3.5 py-2 text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1">
                  Your Signature / Husband's Name
                </label>
                <input
                  id="input-husband-name"
                  type="text"
                  value={formData.husbandName}
                  onChange={(e) => handleChange('husbandName', e.target.value)}
                  placeholder="e.g. Your Loving Husband / Alex"
                  className="w-full bg-[#201335] border border-rose-800/60 rounded-xl px-3.5 py-2 text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1">
                  Welcome Screen Quote
                </label>
                <textarea
                  id="input-welcome-quote"
                  rows={3}
                  value={formData.welcomeQuote}
                  onChange={(e) => handleChange('welcomeQuote', e.target.value)}
                  className="w-full bg-[#201335] border border-rose-800/60 rounded-xl px-3.5 py-2 text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-4">
              <p className="text-xs text-rose-300/80">
                You can upload your own photos or paste image URLs. Each photo appears in the timeline and the "10 Reasons I Love You" interactive cards!
              </p>
              <div className="space-y-4">
                {formData.photos.map((photo, idx) => (
                  <div key={photo.id} className="p-3 bg-[#1e1133] rounded-2xl border border-rose-900/50 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-rose-300">
                      <span>Photo #{idx + 1}: {photo.title}</span>
                      <label className="cursor-pointer bg-rose-900/40 hover:bg-rose-800/60 text-rose-200 px-2.5 py-1 rounded-lg border border-rose-700/50 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handlePhotoUpload(idx, e)}
                        />
                      </label>
                    </div>
                    <div className="flex gap-3 items-center">
                      <img
                        src={photo.url}
                        alt={`Photo ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded-xl border border-rose-700/40"
                      />
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={photo.title}
                          onChange={(e) => handlePhotoChange(idx, 'title', e.target.value)}
                          placeholder="Title / Moment"
                          className="w-full bg-[#2a1744] border border-rose-900/60 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) => handlePhotoChange(idx, 'caption', e.target.value)}
                          placeholder="Memory message"
                          className="w-full bg-[#2a1744] border border-rose-900/60 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={photo.reason}
                          onChange={(e) => handlePhotoChange(idx, 'reason', e.target.value)}
                          placeholder="Reason I love you"
                          className="w-full bg-[#2a1744] border border-rose-900/60 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-rose-300 uppercase tracking-wider">
                Your Personal Birthday Letter
              </label>
              <textarea
                id="input-love-letter"
                rows={12}
                value={formData.loveLetter}
                onChange={(e) => handleChange('loveLetter', e.target.value)}
                className="w-full bg-[#201335] border border-rose-800/60 rounded-2xl p-4 text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-500 font-sans text-sm leading-relaxed"
              />
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-rose-900/40">
            <button
              type="button"
              id="reset-defaults-btn"
              onClick={() => {
                if (confirm('Reset all values to romantic defaults?')) {
                  setFormData(DEFAULT_SETTINGS);
                  onReset();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-rose-400 hover:text-rose-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="cancel-customize-btn"
                onClick={onClose}
                className="px-4 py-2 text-xs rounded-xl bg-white/5 hover:bg-white/10 text-rose-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="save-customize-btn"
                className="flex items-center gap-1.5 px-5 py-2 text-xs rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium shadow-lg shadow-rose-950 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
