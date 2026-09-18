import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DemoFlowGuide } from './components/DemoFlowGuide';
import { LandingPage } from './components/LandingPage';
import { ParentDashboard } from './components/ParentDashboard';
import { TutorDiscovery } from './components/TutorDiscovery';
import { TutorProfileModal } from './components/TutorProfileModal';
import { DiagnosticModal } from './components/DiagnosticModal';
import { ChildLearningView } from './components/ChildLearningView';
import { StudyBuddyChat } from './components/StudyBuddyChat';
import { MentorDashboard } from './components/MentorDashboard';
import { AddChildModal } from './components/AddChildModal';
import { SafetyCenterModal } from './components/SafetyCenterModal';
import { PricingModal } from './components/PricingModal';
import { AuthModal } from './components/AuthModal';

import { INITIAL_CHILDREN, INITIAL_ENROLLMENTS } from './data/mockData';
import { UserRole, Child, Tutor, Enrollment } from './types';

export default function App() {
  // Navigation & Role State
  const [activeView, setActiveView] = useState<string>('landing');
  const [currentRole, setCurrentRole] = useState<UserRole>('parent');

  // Children State (Umida's kids: Aisha & Sardor)
  const [childrenList, setChildrenList] = useState<Child[]>(INITIAL_CHILDREN);
  const [activeChildId, setActiveChildId] = useState<string>('child-aisha');

  // Enrollments State
  const [enrollments, setEnrollments] = useState<Enrollment[]>(INITIAL_ENROLLMENTS);

  // Modals
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  const activeChild = childrenList.find((c) => c.id === activeChildId) || childrenList[0];

  // Handlers
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    if (newRole === 'mentor') {
      setActiveView('mentor-dashboard');
    } else if (newRole === 'parent') {
      setActiveView('parent-dashboard');
    } else if (newRole === 'guest') {
      setActiveView('landing');
    }
  };

  const handleAddChild = (newChild: Child) => {
    setChildrenList((prev) => [...prev, newChild]);
    setActiveChildId(newChild.id);
  };

  const handleConfirmEnrollment = (tutor: Tutor, child: Child, schedule: string) => {
    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      childId: child.id,
      childName: child.name,
      tutorId: tutor.id,
      tutorName: tutor.name,
      tutorRole: tutor.role,
      subject: tutor.subjects[0],
      schedule,
      price: tutor.priceLabel,
      status: 'Active',
      parentApproved: true,
    };

    setEnrollments((prev) => [newEnrollment, ...prev]);
  };

  const handleRecommendedPathSelected = (path: any) => {
    // Navigate straight to tutors filtered by matched subject
    setActiveView('tutors');
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-slate-800 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeView={activeView}
        onNavigate={setActiveView}
        onOpenSafety={() => setIsSafetyOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 2. Interactive Hackathon 7-Step Demo Flow Guide */}
      <DemoFlowGuide
        activeView={activeView}
        onNavigate={setActiveView}
        onRoleChange={handleRoleChange}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
      />

      {/* 3. Dynamic Page View Rendering */}
      <main className="flex-1">
        {activeView === 'landing' && (
          <LandingPage
            onNavigate={setActiveView}
            onRoleChange={handleRoleChange}
            onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            onOpenSafety={() => setIsSafetyOpen(true)}
            onOpenPricing={() => setIsPricingOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeView === 'parent-dashboard' && (
          <ParentDashboard
            childrenList={childrenList}
            activeChildId={activeChildId}
            onSelectChild={setActiveChildId}
            onOpenAddChild={() => setIsAddChildOpen(true)}
            onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            onNavigate={setActiveView}
            enrollments={enrollments}
            onOpenSafety={() => setIsSafetyOpen(true)}
          />
        )}

        {activeView === 'tutors' && (
          <TutorDiscovery
            onSelectTutor={(tutor) => setSelectedTutor(tutor)}
            initialRoleFilter="all"
          />
        )}

        {activeView === 'child-learn' && (
          <ChildLearningView
            child={activeChild}
            enrollments={enrollments}
            onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            onAskStudyBuddy={() => setActiveView('studybuddy')}
          />
        )}

        {activeView === 'studybuddy' && (
          <StudyBuddyChat activeChild={activeChild} />
        )}

        {activeView === 'mentor-dashboard' && (
          <MentorDashboard />
        )}
      </main>

      {/* 4. Modals & Dialogs */}
      {/* Diagnostic Assessment Modal */}
      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        child={activeChild}
        onSelectRecommendedPath={handleRecommendedPathSelected}
      />

      {/* Tutor Profile & Parent-Controlled Enrollment Modal */}
      <TutorProfileModal
        tutor={selectedTutor}
        isOpen={!!selectedTutor}
        onClose={() => setSelectedTutor(null)}
        childrenList={childrenList}
        activeChild={activeChild}
        onConfirmEnrollment={handleConfirmEnrollment}
        onOpenSafety={() => setIsSafetyOpen(true)}
      />

      {/* Add Child Modal */}
      <AddChildModal
        isOpen={isAddChildOpen}
        onClose={() => setIsAddChildOpen(false)}
        onAddChild={handleAddChild}
      />

      {/* Safety Center Modal */}
      <SafetyCenterModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
      />

      {/* Pricing & Pro Plan Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onSelectFree={() => {
          setActiveView('parent-dashboard');
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(role) => handleRoleChange(role)}
        initialRole={currentRole}
      />
    </div>
  );
}
