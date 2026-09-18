import React, { useState } from 'react';
import { X, UserPlus, Sparkles } from 'lucide-react';
import { Child, SubjectName } from '../types';

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChild: (child: Child) => void;
}

export const AddChildModal: React.FC<AddChildModalProps> = ({
  isOpen,
  onClose,
  onAddChild,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('9');
  const [grade, setGrade] = useState('Grade 4');
  const [primarySubject, setPrimarySubject] = useState<SubjectName>('Mathematics');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newChild: Child = {
      id: `child-${Date.now()}`,
      name: name.trim(),
      age: parseInt(age, 10) || 9,
      grade,
      avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80',
      overallProgress: 60,
      subjects: [
        {
          subject: primarySubject,
          level: 'Beginner',
          progressPercent: 60,
          gaps: [
            { skill: 'Foundational concepts', status: 'Needs practice' },
            { skill: 'Practice consistency', status: 'Developing' },
          ],
        },
      ],
      recommendedPath: {
        id: `path-${Date.now()}`,
        title: `${primarySubject} — Core Fundamentals`,
        subject: primarySubject,
        durationWeeks: 4,
        sessionsPerWeek: 2,
        supportType: 'Peer Mentor',
        description: `Gentle 4-week step-by-step reinforcement for ${name.trim()}.`,
      },
    };

    onAddChild(newChild);
    onClose();
    setName('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Add Child Profile</h3>
              <p className="text-xs text-slate-500">Parent-managed learning account</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Child's First Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jasur, Malika..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-medium text-slate-800 text-sm focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Age
              </label>
              <input
                type="number"
                min={5}
                max={17}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium text-slate-800 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                School Grade
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium text-slate-800 text-sm bg-white focus:outline-none focus:border-blue-600"
              >
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Primary Focus Subject
            </label>
            <select
              value={primarySubject}
              onChange={(e) => setPrimarySubject(e.target.value as SubjectName)}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-medium text-slate-800 text-sm bg-white focus:outline-none focus:border-blue-600"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Programming">Programming</option>
              <option value="Science">Science</option>
            </select>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-[11px] text-blue-900 leading-relaxed">
            🛡️ <strong>Parent Safeguard:</strong> This child profile will be tied to your parent account. All enrollments, tutor bookings, and video permissions remain under your authorization.
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
            >
              Create Child Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
