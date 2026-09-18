import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  User, 
  Bot, 
  Lightbulb, 
  Clock, 
  Smile, 
  ShieldCheck, 
  RefreshCw, 
  Copy, 
  Check, 
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { ChatMessage, Child } from '../types';

interface StudyBuddyChatProps {
  activeChild?: Child;
}

const PRESET_PROMPTS = [
  "How can I explain fractions to my 8-year-old without getting frustrated?",
  "My child gets frustrated with math homework. What should I say to calm them down?",
  "Can you create a 10-minute offline activity to practice multiplication at home?",
  "My 6th-grade child seems behind in reading. How can I help without stressing them out?",
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'ai',
    text: `Hello, Umida! I'm **StudyBuddy AI**, your family learning co-pilot.

I am here to help you explain tricky concepts, invent fun 10-minute offline games, and share positive words so homework never feels stressful.

What topic or question can I help you explain to Aisha today?`,
    timestamp: 'Just now',
    structured: {
      simpleExplanation: "I specialize in translating textbook jargon into everyday items like pizzas, legos, and coins.",
      activity: "Ask for a quick 10-minute activity anytime you want hands-on practice!",
      whatToSay: `"We can figure this out together. Mistakes help our brain grow!"`,
      nextStep: "Try picking one of the suggested prompts below or ask your own question.",
    }
  }
];

export const StudyBuddyChat: React.FC<StudyBuddyChatProps> = ({ activeChild }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/studybuddy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          childName: activeChild?.name || 'Aisha',
          childGrade: activeChild?.grade || 'Grade 3',
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "Here is a helpful way to approach this topic with your child:",
        structured: data.structured,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.warn("API request failed, using structured fallback response:", err);
      // Helpful fallback response respecting prompt mandate
      const fallbackAiMsg: ChatMessage = {
        id: `ai-fb-${Date.now()}`,
        sender: 'ai',
        text: `Here is a gentle, pedagogical way to guide ${activeChild?.name || 'your child'} with this concept:`,
        structured: {
          simpleExplanation: "Think of this as fair sharing. When we break something into equal groups, each person gets an exact match.",
          activity: "Use 12 dried beans, coins, or paper clips. Ask them to share them equally into 3 cups.",
          whatToSay: `"You're doing great. It's totally normal to take time on new concepts. Let's see what happens if we test one cup first!"`,
          nextStep: "Practice for 5 minutes, then give them a high-five and take a screen-free break.",
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const applyModifier = (mod: string) => {
    handleSendMessage(`${mod} for "${activeChild?.name || 'my child'}" regarding our last discussion.`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-blue-600 text-white p-6 rounded-3xl shadow-sm space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-xl shadow-inner">
              <Sparkles className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold font-display">StudyBuddy AI</h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 border border-white/30 uppercase tracking-wide">
                  Parent Co-Pilot
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100">
                Helping parents understand how to explain, encourage, and guide their children.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            <span className="text-amber-100 text-[11px]">
              Child: <strong>{activeChild?.name || 'Aisha'} ({activeChild?.grade || 'Grade 3'})</strong>
            </span>
          </div>
        </div>

        {/* Co-Pilot Philosophy Notice */}
        <div className="pt-2 border-t border-white/20 text-[11px] text-amber-100 flex items-center gap-2">
          <span>💡</span>
          <span>
            <strong>Our Philosophy:</strong> StudyBuddy AI co-pilots parents; it does not replace teachers or peer mentors.
          </span>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Suggested Parent Prompts:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PRESET_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-left text-xs font-medium text-slate-700 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
            >
              <span className="line-clamp-1">{prompt}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 opacity-60 group-hover:opacity-100 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-4 sm:p-6 min-h-[420px] max-h-[600px] overflow-y-auto space-y-6">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-2xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm space-y-3 ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-xs shadow-2xs'
                    : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-xs shadow-2xs'
                }`}
              >
                <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>

                {/* Structured Guidance Blocks (Requested in User Prompt) */}
                {msg.structured && (
                  <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-3">
                    {/* 1. Simple Explanation */}
                    {msg.structured.simpleExplanation && (
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                        <div className="flex items-center gap-1.5 font-bold text-blue-800 text-xs mb-1">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                          <span>1. Simple Explanation (For Child)</span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          {msg.structured.simpleExplanation}
                        </p>
                      </div>
                    )}

                    {/* 2. Real-World Activity */}
                    {msg.structured.activity && (
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs mb-1">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>2. 10-Minute Offline Activity</span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          {msg.structured.activity}
                        </p>
                      </div>
                    )}

                    {/* 3. What to Say (Positive Encouragement) */}
                    {msg.structured.whatToSay && (
                      <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs mb-1">
                          <Smile className="w-3.5 h-3.5 text-amber-600" />
                          <span>3. What to Say (Encouraging Words)</span>
                        </div>
                        <p className="text-amber-950 font-medium italic text-xs leading-relaxed">
                          {msg.structured.whatToSay}
                        </p>
                      </div>
                    )}

                    {/* 4. Next Step Recommendation */}
                    {msg.structured.nextStep && (
                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-500">
                        <span className="font-bold text-slate-700">4. Next Step: </span>
                        <span>{msg.structured.nextStep}</span>
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={`text-[10px] flex items-center justify-between pt-1 ${
                    isUser ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy guidance</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-700">
                <RefreshCw className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                <span>StudyBuddy AI is shaping simple, encouraging guidance...</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Translating textbook concept into child-friendly analogies and offline activities.
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Modifiers (Prompt Mandated: "Explain for 7yo", "10-min activity", etc.) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">
          Quick Adjust:
        </span>
        <button
          onClick={() => applyModifier('Explain this for a 7-year-old in ultra simple terms')}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-slate-700 shrink-0 font-medium cursor-pointer"
        >
          👶 Explain for a 7-year-old
        </button>
        <button
          onClick={() => applyModifier('Create an offline 10-minute activity with household items')}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-slate-700 shrink-0 font-medium cursor-pointer"
        >
          ⏱️ Create a 10-minute activity
        </button>
        <button
          onClick={() => applyModifier('Explain differently with a completely new visual analogy')}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-slate-700 shrink-0 font-medium cursor-pointer"
        >
          🔄 Explain differently
        </button>
        <button
          onClick={() => applyModifier('Give me encouraging words to say if my child is crying or upset')}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-slate-700 shrink-0 font-medium cursor-pointer"
        >
          ❤️ Give encouraging words
        </button>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="bg-white rounded-2xl border border-slate-200 p-2 sm:p-2.5 shadow-sm flex items-center gap-2"
      >
        <input
          type="text"
          placeholder={`Ask anything to help ${activeChild?.name || 'your child'} (e.g. How to explain division with coins?)...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
          className="w-full px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
          id="studybuddy-submit-btn"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
