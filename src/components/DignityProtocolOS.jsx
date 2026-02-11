import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Activity,
  FileText,
  Users,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Leaf,
  Database,
  Lock,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  MessageSquare,
  PenTool,
  Zap,
  Copy,
  Briefcase,
  Clipboard,
  Pickaxe,
  GraduationCap,
  Scale,
  HeartHandshake,
  Phone,
  BookOpen,
  Utensils,
  Map,
  UserCheck,
  Volume2,
  Image as ImageIcon,
  Share2,
  Languages,
  FileSearch,
  MessageCircle,
  Send
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

/**
 * THE DIGNITY PROTOCOL BRAND KIT & DESIGN SYSTEM
 * ----------------------------------------------
 * Primary Palette:
 * - Sovereignty Blue: slate-900 (The Law/Structure)
 * - Land Trust Green: emerald-700 (Growth/Healing)
 * - Asset Gold: amber-500 (Value/Capital)
 * - Alert Red: rose-600 (Urgency/Perishable Waste)
 * * Typography:
 * - Headings: Serif (representing history/constitution) - simulated via font-serif
 * - Body: Sans (representing modern clarity/action) - simulated via font-sans
 */

// --- MOCK DATA FOR VISUALIZATION ---
const HEALING_DATA = [
  { month: 'Jan', waste: 45000, asset: 12000 },
  { month: 'Feb', waste: 42000, asset: 18000 },
  { month: 'Mar', waste: 38000, asset: 25000 },
  { month: 'Apr', waste: 31000, asset: 35000 },
  { month: 'May', waste: 24000, asset: 48000 },
  { month: 'Jun', waste: 18000, asset: 62000 },
];

const FOIA_STATUS = [
  { id: 1, target: 'Arkansas DHS', topic: 'Foster Care Expenditures', status: 'Pending', date: '2025-02-10', deadline: '2025-02-13' },
  { id: 2, target: 'Arkansas DOC', topic: 'Jail Backup Contracts', status: 'Received', date: '2025-02-10', deadline: '2025-02-13' },
  { id: 3, target: 'Van Buren Municipal', topic: 'Fines & Fees Data', status: 'Overdue', date: '2025-02-05', deadline: '2025-02-08' },
  { id: 4, target: 'Sebastian Co. Court', topic: 'Poverty Line Collections', status: 'Pending', date: '2025-02-11', deadline: '2025-02-14' },
];

// --- HELPER FOR AUDIO CONVERSION ---
const pcmToWav = (base64PCM, sampleRate = 24000) => {
  const binaryString = atob(base64PCM);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const pcm16Buffer = bytes.buffer;

  const numChannels = 1;
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = pcm16Buffer.byteLength;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');
  // fmt sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // Bits per sample
  // data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Write PCM data
  const pcmBytes = new Uint8Array(pcm16Buffer);
  const wavBytes = new Uint8Array(buffer, 44);
  wavBytes.set(pcmBytes);

  return new Blob([buffer], { type: 'audio/wav' });
};

const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

// --- UI COMPONENTS ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ status }) => {
  const styles = {
    Pending: "bg-blue-100 text-blue-800",
    Received: "bg-emerald-100 text-emerald-800",
    Overdue: "bg-rose-100 text-rose-800",
    Draft: "bg-slate-100 text-slate-600"
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.Draft}`}>
      {status}
    </span>
  );
};

// --- MAIN APP COMPONENT ---

export default function DignityProtocolOS() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Brand Kit Color definitions for inline styles where needed
  const brandColors = {
    sovereignty: '#0f172a',
    healing: '#047857',
    gold: '#f59e0b',
    waste: '#e11d48'
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'foia': return <FOIAManager />;
      case 'healing': return <HealingLedger />;
      case 'ai_tools': return <ProtocolIntelligence />;
      case 'brand': return <BrandSystem />;
      default: return <DashboardView />;
    }
  };

  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors ${
        activeTab === id
          ? 'bg-emerald-50 text-emerald-700 border-r-4 border-emerald-600'
          : 'text-slate-600 hover:bg-slate-50'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">

      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-full">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">LA FAMILIA 479</h1>
              <p className="text-xs text-slate-500 font-serif italic">The Dignity Protocol</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          <NavItem id="dashboard" label="Command Center" icon={Activity} />
          <NavItem id="foia" label="FOIA Execution" icon={FileText} />
          <NavItem id="healing" label="Healing Ledger" icon={Leaf} />
          <NavItem id="ai_tools" label="Protocol Intelligence" icon={Sparkles} />
          <NavItem id="brand" label="Brand & Tech Kit" icon={Database} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-900 rounded-lg p-4 text-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Status</h3>
            <div className="flex items-center text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></div>
              System Operational
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
           <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900">LF479</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-4">
          <nav className="space-y-2">
            <NavItem id="dashboard" label="Command Center" icon={Activity} />
            <NavItem id="foia" label="FOIA Execution" icon={FileText} />
            <NavItem id="healing" label="Healing Ledger" icon={Leaf} />
            <NavItem id="ai_tools" label="Protocol Intelligence" icon={Sparkles} />
            <NavItem id="brand" label="Brand & Tech Kit" icon={Database} />
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto md:p-8 p-4 pt-20 md:pt-8">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );

  // --- SUB-VIEWS ---

  function DashboardView() {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">Executive Overview</h2>
            <p className="text-slate-500">Monitoring the conversion of Perishable Capital into Sovereign Assets.</p>
          </div>
          <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center">
            <Users className="w-4 h-4 mr-2" />
            New Family Intake
          </button>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-l-4 border-l-emerald-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Verifiable Healing</p>
                <h3 className="text-3xl font-bold text-emerald-700 mt-1">1,240 hrs</h3>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Leaf className="w-5 h-5 text-emerald-700" />
              </div>
            </div>
            <div className="text-sm text-slate-600">
              <span className="text-emerald-600 font-medium">↑ 12%</span> vs last month
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-amber-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Assets Secured</p>
                <h3 className="text-3xl font-bold text-amber-600 mt-1">$450k</h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Lock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600">
              Land Trust Equity Value
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-rose-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Systemic Waste</p>
                <h3 className="text-3xl font-bold text-rose-600 mt-1">$2.3M</h3>
              </div>
              <div className="p-2 bg-rose-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600">
              Identified via FOIA (YTD)
            </div>
          </Card>
        </div>

        {/* Main Chart */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">The Inversion Curve</h3>
            <p className="text-sm text-slate-500">Visualizing the shift from punitive costs (Waste) to community value (Assets).</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HEALING_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAsset" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={brandColors.healing} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={brandColors.healing} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={brandColors.waste} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={brandColors.waste} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="waste"
                  stroke={brandColors.waste}
                  fillOpacity={1}
                  fill="url(#colorWaste)"
                  name="System Waste ($)"
                />
                <Area
                  type="monotone"
                  dataKey="asset"
                  stroke={brandColors.healing}
                  fillOpacity={1}
                  fill="url(#colorAsset)"
                  name="Community Assets ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    );
  }

  function FOIAManager() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">FOIA Execution Tracker</h2>
            <p className="text-slate-500">Status of the 11 strategic information requests.</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
              Export Report
            </button>
            <button
              onClick={() => setActiveTab('ai_tools')}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Draft Request with AI
            </button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">Target Entity</th>
                  <th className="px-6 py-3 font-semibold">Data Requested</th>
                  <th className="px-6 py-3 font-semibold">Submission Date</th>
                  <th className="px-6 py-3 font-semibold">Legal Deadline</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FOIA_STATUS.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.target}</td>
                    <td className="px-6 py-4 text-slate-600">{item.topic}</td>
                    <td className="px-6 py-4 text-slate-500">{item.date}</td>
                    <td className="px-6 py-4 text-slate-500 font-mono">{item.deadline}</td>
                    <td className="px-6 py-4">
                      <Badge status={item.status} />
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-slate-400 hover:text-emerald-600">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h4 className="font-bold text-blue-900 flex items-center mb-2">
              <Clock className="w-4 h-4 mr-2" />
              Current Sprint
            </h4>
            <p className="text-sm text-blue-800 mb-4">
              Week of Feb 10-14: Focus on DHS and DOC email submissions.
            </p>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-blue-600 mt-2 text-right">45% Complete</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl text-white">
            <h4 className="font-bold mb-2">Evidence Vault</h4>
            <p className="text-sm text-slate-300 mb-4">
              Once data arrives, input specific dollar amounts into the Protocol Calculator to update the pitch deck automatically.
            </p>
            <button className="text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300">
              Access Vault →
            </button>
          </div>
        </div>
      </div>
    );
  }

  function HealingLedger() {
    return (
      <div className="space-y-6">
         <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">The Healing Ledger</h2>
            <p className="text-slate-500">Converting non-monetary contribution into verifiable equity.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Recent Verified Contributions</h3>
            <div className="space-y-4">
              {[1,2,3].map((i) => (
                <div key={i} className="flex items-center p-3 border border-slate-100 rounded-lg hover:border-emerald-200 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Childcare Exchange (4 hrs)</p>
                    <p className="text-xs text-slate-500">Verified by Community Steward</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-700">+ $120.00</p>
                    <p className="text-xs text-slate-400">Equivalent Value</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
             <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <h3 className="text-lg font-bold font-serif mb-1">Co-Care Credits</h3>
              <p className="text-3xl font-bold text-amber-400 mb-6">2,450 <span className="text-sm text-slate-400 font-normal">Credits</span></p>

              <div className="space-y-3">
                <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-colors">
                  Log Activity
                </button>
                <button className="w-full py-2 bg-transparent border border-slate-600 hover:border-slate-500 rounded-lg text-sm font-medium transition-colors">
                  View Wallet
                </button>
              </div>
             </Card>

             <Card className="p-6 border-l-4 border-emerald-500">
               <h4 className="font-bold text-slate-900 mb-2">The Formula</h4>
               <p className="text-sm text-slate-600 italic">
                 "Sovereignty + Perishable Capital Conversion + Healing Infrastructure = Predictable Thriving"
               </p>
             </Card>
          </div>
        </div>
      </div>
    );
  }

  function ProtocolIntelligence() {
    const [activeTool, setActiveTool] = useState('assistant');
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [response, setResponse] = useState('');
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const audioRef = useRef(null);

    // Reset outputs when tool changes
    useEffect(() => {
      setResponse('');
      setGeneratedImageUrl('');
      setAudioUrl('');
      setChatHistory([]);
      if (activeTool === 'assistant') {
        setChatHistory([{
           role: 'assistant',
           text: "Welcome to La Familia 479. I am your Sovereign Assistant. How can I help you today? I can guide you through our tools, explain the protocol, or help you find resources."
        }]);
      }
      if(audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }, [activeTool]);

    // Text Generation (Gemini 2.5 Flash)
    const callGeminiText = async (prompt) => {
      setLoading(true);
      setResponse('');
      try {
        const apiKey = "";
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          }
        );
        const data = await response.json();
        if (data.candidates && data.candidates[0].content) {
          setResponse(data.candidates[0].content.parts[0].text);
        } else {
          setResponse("System notification: Unable to contact intelligence network.");
        }
      } catch (error) {
        setResponse("System notification: Connection interrupted.");
      }
      setLoading(false);
    };

    // Chat with Gemini
    const callGeminiChat = async (userMessage) => {
      setLoading(true);
      const newHistory = [...chatHistory, { role: 'user', text: userMessage }];
      setChatHistory(newHistory);
      setInput1('');

      try {
        const apiKey = "";
        const systemPrompt = "You are the Sovereign Guide for La Familia 479. Your goal is to help families move from 'Perishable' to 'Sovereign'. You are empathetic, knowledgeable about the Dignity Protocol (Waste-to-Asset conversion), and practical. Answer questions about the Land Trust, financial defense, or community healing.";

        const prompt = `${systemPrompt}\n\nCurrent conversation:\n${newHistory.map(m => `${m.role}: ${m.text}`).join('\n')}\n\nassistant:`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          }
        );
        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (aiText) {
          setChatHistory([...newHistory, { role: 'assistant', text: aiText }]);
        }
      } catch (error) {
        setChatHistory([...newHistory, { role: 'assistant', text: "I'm having trouble connecting to the network right now." }]);
      }
      setLoading(false);
    };

    // Translate Response
    const translateResponse = async () => {
      if (!response && chatHistory.length === 0) return;

      const textToTranslate = activeTool === 'assistant'
        ? chatHistory[chatHistory.length - 1].text
        : response;

      setLoading(true);
      try {
        const apiKey = "";
        const prompt = `Translate the following text into Spanish. Maintain a dignified, warm, and professional tone suitable for community members of La Familia 479:\n\n"${textToTranslate}"`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          }
        );
        const data = await res.json();
        const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (translatedText) {
          if (activeTool === 'assistant') {
             setChatHistory(prev => [...prev, { role: 'assistant', text: translatedText, isTranslation: true }]);
          } else {
             setResponse(translatedText);
          }
        }
      } catch (e) {
        console.error("Translation failed");
      }
      setLoading(false);
    };

    // Text-to-Speech (Gemini 2.5 Flash TTS)
    const callGeminiTTS = async (textToRead) => {
      if (!textToRead) return;
      try {
        const apiKey = "";
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: textToRead }] }],
              generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                  voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } }
                }
              }
            }),
          }
        );
        const data = await response.json();
        const audioData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (audioData) {
          const wavBlob = pcmToWav(audioData, 24000);
          const url = URL.createObjectURL(wavBlob);
          setAudioUrl(url);
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.src = url;
              audioRef.current.play();
            }
          }, 100);
        }
      } catch (error) {
        console.error("TTS Error", error);
      }
    };

    // Image Generation (Imagen)
    const callImagen = async (prompt) => {
      setLoading(true);
      setGeneratedImageUrl('');
      try {
        const apiKey = "";
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              instances: [{ prompt: prompt + " The style should be realistic, dignified, warm, architectural photography, golden hour lighting." }],
              parameters: { sampleCount: 1 }
            }),
          }
        );
        const data = await response.json();
        if (data.predictions && data.predictions[0]) {
          const base64 = data.predictions[0].bytesBase64Encoded;
          setGeneratedImageUrl(`data:image/png;base64,${base64}`);
        } else {
          setResponse("Visual generation failed. Please try again.");
        }
      } catch (error) {
        setResponse("System notification: Connection interrupted during visualization.");
      }
      setLoading(false);
    };

    const handleAction = () => {
      let prompt = "";

      if (activeTool === 'assistant') {
        callGeminiChat(input1);
        return;
      } else if (activeTool === 'sentinel') {
        prompt = `You are a Legal Advocate for tenants and workers. Analyze this contract/document for "Extraction Risks" (predatory clauses, unfair terms, hidden fees): "${input1}". \n\nOutput:\n1. Red Flags (Dangerous terms)\n2. Green Flags (Protections present)\n3. Plain English Summary\n4. Clarifying Questions to ask the signer.`;
        callGeminiText(prompt);
      } else if (activeTool === 'foia') {
        prompt = `You are an expert in Arkansas Freedom of Information Act (FOIA) law. Draft a formal, authoritative FOIA request letter to: ${input1}. Requesting: ${input2}. Cite "Ark. Code Ann. § 25-19-101 et seq.". State this is for La Familia 479 (non-profit) and request fee waiver. Tone: Professional, firm.`;
        callGeminiText(prompt);
      } else if (activeTool === 'decoder') {
        prompt = `Decode this legal text into plain English: "${input1}". Start with BLUF (Bottom Line Up Front). List deadlines, money amounts, next steps. Tone: Supportive.`;
        callGeminiText(prompt);
      } else if (activeTool === 'impact') {
        prompt = `Write an inspiring "Impact Narrative" for La Familia 479 based on: "${input1}". Use brand voice: authoritative, restorative, hopeful. Concept: "Verifiable Healing".`;
        callGeminiText(prompt);
      } else if (activeTool === 'grant') {
        prompt = `Write the "${input1}" section for a grant proposal regarding: "${input2}". Context: Converting "Perishable Capital" to "Sovereign Assets".`;
        callGeminiText(prompt);
      } else if (activeTool === 'meeting') {
        prompt = `Synthesize these meeting notes: "${input1}". Output: Executive Summary, Decisions, Action Items, Next Steps.`;
        callGeminiText(prompt);
      } else if (activeTool === 'miner') {
        prompt = `Analyze this family narrative for "Verifiable Healing" actions: "${input1}". Assign "Co-Care Credit" values. Calculate TOTAL Sovereign Equity.`;
        callGeminiText(prompt);
      } else if (activeTool === 'tutor') {
        prompt = `Create a learning module for: "${input1}". Context: "${input2}". 3-Step Action Plan, connection to sovereignty, one immediate action.`;
        callGeminiText(prompt);
      } else if (activeTool === 'ordinance') {
        prompt = `Analyze this ordinance for impact on low-income families: "${input1}". Output: Risk Level, Impact, 3 Actionable Talking Points.`;
        callGeminiText(prompt);
      } else if (activeTool === 'mediator') {
        prompt = `Draft a Non-Violent Communication (NVC) script for: "${input1}". Context: "${input2}". Structure: Observation, Feeling, Need, Request.`;
        callGeminiText(prompt);
      } else if (activeTool === 'negotiator') {
        prompt = `Draft a negotiation script for dealing with creditor "${input1}". Situation: "${input2}". Cite FDCPA protections. Goal: Manageable plan.`;
        callGeminiText(prompt);
      } else if (activeTool === 'legacy') {
        prompt = `Write a dignified "Family Chapter" biography for: "${input1}". Notes: "${input2}". Highlight resilience and contribution.`;
        callGeminiText(prompt);
      } else if (activeTool === 'resume') {
        prompt = `Translate this informal experience into professional resume bullets: "${input1}". Use corporate action verbs.`;
        callGeminiText(prompt);
      } else if (activeTool === 'chef') {
        prompt = `Create 3 dignified, healthy zero-waste meal ideas using: "${input1}".`;
        callGeminiText(prompt);
      } else if (activeTool === 'vision') {
        prompt = `Create a 5-Year "Sovereignty Roadmap" for this dream: "${input1}". Milestones for Year 1, 3, 5 and immediate action.`;
        callGeminiText(prompt);
      } else if (activeTool === 'painter') {
        callImagen(input1);
      } else if (activeTool === 'social') {
        prompt = `You are a Social Media Strategist for the Dignity Protocol. Create 3 posts (LinkedIn, Instagram, Facebook) based on this impact story: "${input1}". Use hashtags like #VerifiableHealing #LandSovereignty.`;
        callGeminiText(prompt);
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif flex items-center">
            <Sparkles className="w-6 h-6 mr-3 text-amber-500" />
            Protocol Intelligence
          </h2>
          <p className="text-slate-500">AI-powered tools to accelerate sovereignty and decoding.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Tool Selection Sidebar */}
          <Card className="p-4 space-y-2 h-full overflow-y-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-2">Concierge</h3>
            <button
              onClick={() => { setActiveTool('assistant'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'assistant' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Sovereign Assistant</div><div className="text-xs opacity-70">General Help & Chat</div></div>
            </button>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 mt-4 px-2">Defense Tools</h3>
            <button
              onClick={() => { setActiveTool('sentinel'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'sentinel' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <FileSearch className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Contract Sentinel</div><div className="text-xs opacity-70">Audit leases/loans</div></div>
            </button>
            <button
              onClick={() => { setActiveTool('foia'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'foia' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <FileText className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">FOIA Drafter</div><div className="text-xs opacity-70">Generate legal requests</div></div>
            </button>
            <button
              onClick={() => { setActiveTool('decoder'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'decoder' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Zap className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Legalese Decoder</div><div className="text-xs opacity-70">Simplify complex docs</div></div>
            </button>
            <button
              onClick={() => { setActiveTool('negotiator'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'negotiator' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Phone className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Creditor Negotiator</div><div className="text-xs opacity-70">Fair Debt scripts</div></div>
            </button>
             <button
              onClick={() => { setActiveTool('ordinance'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'ordinance' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Scale className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Ordinance Watchdog</div><div className="text-xs opacity-70">Analyze local policy</div></div>
            </button>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 mt-4 px-2">Growth Tools</h3>
            <button
              onClick={() => { setActiveTool('impact'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'impact' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <PenTool className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Impact Narrator</div><div className="text-xs opacity-70">Write grant reports</div></div>
            </button>
            <button
              onClick={() => { setActiveTool('grant'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'grant' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Briefcase className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Grant Architect</div><div className="text-xs opacity-70">Draft proposals</div></div>
            </button>
            <button
              onClick={() => { setActiveTool('meeting'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'meeting' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Clipboard className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Meeting Synthesizer</div><div className="text-xs opacity-70">Clean up notes</div></div>
            </button>
            <button
              onClick={() => { setActiveTool('miner'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'miner' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Pickaxe className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Dignity Miner</div><div className="text-xs opacity-70">Find hidden assets</div></div>
            </button>
            <button
              onClick={() => { setActiveTool('tutor'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'tutor' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <GraduationCap className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Sovereignty Tutor</div><div className="text-xs opacity-70">Personal curriculum</div></div>
            </button>

            <button
              onClick={() => { setActiveTool('mediator'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'mediator' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <HeartHandshake className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Community Mediator</div><div className="text-xs opacity-70">Conflict script (NVC)</div></div>
            </button>

            <button
              onClick={() => { setActiveTool('legacy'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'legacy' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <BookOpen className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Legacy Keeper</div><div className="text-xs opacity-70">Record family history</div></div>
            </button>
            <button
              onClick={() => { setActiveTool('resume'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'resume' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <UserCheck className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Resilience Resume</div><div className="text-xs opacity-70">Translate informal work</div></div>
            </button>
            <button
              onClick={() => { setActiveTool('chef'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'chef' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Utensils className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Pantry Chef</div><div className="text-xs opacity-70">Zero-waste meal plans</div></div>
            </button>
            <button
              onClick={() => { setActiveTool('vision'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'vision' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Map className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Vision Mapper</div><div className="text-xs opacity-70">5-Year Roadmaps</div></div>
            </button>
            <button
              onClick={() => { setActiveTool('social'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'social' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Share2 className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Social Amplifier</div><div className="text-xs opacity-70">Generate viral posts</div></div>
            </button>
            <button
              onClick={() => { setActiveTool('painter'); setInput1(''); setInput2(''); }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTool === 'painter' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <ImageIcon className="w-5 h-5 mr-3" />
              <div><div className="font-bold text-sm">Vision Painter</div><div className="text-xs opacity-70">Visualize dreams</div></div>
            </button>
          </Card>

          {/* Input & Output Area */}
          <div className="lg:col-span-2 flex flex-col gap-6 h-full overflow-hidden">
            {/* Input Section */}
            <Card className="p-6 flex-shrink-0">

              {activeTool === 'assistant' ? (
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
                    {chatHistory.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.role === 'user' ? 'bg-emerald-700 text-white' : 'bg-white border border-slate-200 text-slate-800 shadow-sm'}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {loading && <div className="text-xs text-slate-400 italic">Writing...</div>}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input1}
                      onChange={(e) => setInput1(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAction()}
                      placeholder="Type your message..."
                      className="flex-1 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <button
                      onClick={handleAction}
                      disabled={loading || !input1}
                      className="bg-emerald-700 text-white p-2 rounded-lg hover:bg-emerald-800"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {activeTool === 'sentinel' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Paste Contract or Lease Text</label>
                        <textarea value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="e.g., 'The tenant agrees to pay a $50 daily late fee...'" className="w-full border border-slate-300 rounded-lg p-2 h-32 focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'painter' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Describe Your Dream to Visualize</label>
                        <textarea value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="e.g., A community garden with raised beds, sunflowers, and happy families harvesting vegetables in the golden hour light..." className="w-full border border-slate-300 rounded-lg p-2 h-32 focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'social' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Impact Story / News</label>
                        <textarea value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="e.g., We just secured a $50k grant and 3 new families moved into safe housing this week..." className="w-full border border-slate-300 rounded-lg p-2 h-32 focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'foia' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Target Entity (Who has the data?)</label>
                      <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="e.g., Sebastian County Sheriff's Office" className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Records Requested (What do you need?)</label>
                      <textarea value={input2} onChange={(e) => setInput2(e.target.value)} placeholder="e.g., All invoices related to inmate transportation services from Jan 2024 to present." className="w-full border border-slate-300 rounded-lg p-2 h-24 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                  </div>
                  )}

                  {(activeTool !== 'painter' && activeTool !== 'social' && activeTool !== 'foia' && activeTool !== 'sentinel') && (
                     <div className="space-y-4">
                       <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Input Data</label>
                        <textarea value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="Enter details..." className="w-full border border-slate-300 rounded-lg p-2 h-32 focus:ring-2 focus:ring-emerald-500 outline-none" />
                       </div>
                       {(activeTool === 'grant' || activeTool === 'tutor' || activeTool === 'mediator' || activeTool === 'negotiator' || activeTool === 'legacy') && (
                         <div>
                           <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Context / Details</label>
                           <textarea value={input2} onChange={(e) => setInput2(e.target.value)} placeholder="Additional context..." className="w-full border border-slate-300 rounded-lg p-2 h-24 focus:ring-2 focus:ring-emerald-500 outline-none" />
                         </div>
                       )}
                     </div>
                  )}

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleAction}
                      disabled={loading || !input1}
                      className={`px-6 py-2 bg-emerald-700 text-white rounded-lg font-bold shadow-sm flex items-center transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-800 hover:shadow-md'}`}
                    >
                      {loading ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </Card>

            {/* Output Section */}
            {activeTool !== 'assistant' && (
            <Card className="flex-1 p-6 overflow-auto bg-slate-50 border-slate-200">
              <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                <h4 className="font-bold text-slate-700 text-sm">System Output</h4>
                <div className="flex space-x-2">
                   {audioUrl && (
                     <audio ref={audioRef} controls className="h-8 w-48" src={audioUrl} />
                   )}

                   {response && !audioUrl && (
                     <button
                       onClick={() => callGeminiTTS(response)}
                       className="text-xs text-slate-600 hover:text-emerald-700 font-medium flex items-center bg-white px-2 py-1 rounded border border-slate-200"
                     >
                       <Volume2 className="w-3 h-3 mr-1" />
                       Listen
                     </button>
                   )}

                   {response && (
                     <button
                       onClick={translateResponse}
                       className="text-xs text-slate-600 hover:text-emerald-700 font-medium flex items-center bg-white px-2 py-1 rounded border border-slate-200"
                     >
                       <Languages className="w-3 h-3 mr-1" />
                       Español
                     </button>
                   )}

                  {response && (
                    <button
                      onClick={() => navigator.clipboard.writeText(response)}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center bg-white px-2 py-1 rounded border border-slate-200"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </button>
                  )}
                </div>
              </div>

              {loading ? (
                 <div className="flex flex-col items-center justify-center h-32 text-slate-400">
                   <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-3"></div>
                   <p className="text-xs">Consulting Protocol Intelligence...</p>
                 </div>
              ) : (
                <>
                  {generatedImageUrl && (
                    <div className="mb-4 rounded-xl overflow-hidden shadow-lg border border-slate-200">
                      <img src={generatedImageUrl} alt="Generated Vision" className="w-full h-auto" />
                      <div className="bg-white p-2 text-xs text-center text-slate-500">
                        Visualized by Imagen 3
                      </div>
                    </div>
                  )}

                  {response ? (
                    <div className="prose prose-sm max-w-none text-slate-800 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                      {response}
                    </div>
                  ) : !generatedImageUrl && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <Sparkles className="w-12 h-12 mb-3 opacity-20" />
                      <p className="text-sm">Ready to generate. Select a tool and input data.</p>
                    </div>
                  )}
                </>
              )}
            </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  function BrandSystem() {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif mb-2">Technical Brand Kit</h2>
          <p className="text-slate-600 max-w-3xl">
            This design system is built to ensure trust, authority, and organic growth. It avoids "startup" aesthetics in favor of "institutional permanence."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-slate-900 shadow-lg"></div>
            <h4 className="font-bold text-slate-900">Sovereignty Blue</h4>
            <p className="text-xs text-slate-500">Slate-900 (#0f172a)</p>
            <p className="text-xs text-slate-600">Used for navigation, primary text, and structural elements. Represents the law and stability.</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-emerald-700 shadow-lg"></div>
            <h4 className="font-bold text-slate-900">Land Trust Green</h4>
            <p className="text-xs text-slate-500">Emerald-700 (#047857)</p>
            <p className="text-xs text-slate-600">Used for primary actions, growth metrics, and success states. Represents the land and healing.</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-amber-500 shadow-lg"></div>
            <h4 className="font-bold text-slate-900">Asset Gold</h4>
            <p className="text-xs text-slate-500">Amber-500 (#f59e0b)</p>
            <p className="text-xs text-slate-600">Used for monetary value, alerts, and highlights. Represents the wealth generated by families.</p>
          </div>
           <div className="space-y-2">
            <div className="h-24 rounded-lg bg-slate-50 border border-slate-200"></div>
            <h4 className="font-bold text-slate-900">Protocol Canvas</h4>
            <p className="text-xs text-slate-500">Slate-50 (#f8fafc)</p>
            <p className="text-xs text-slate-600">Backgrounds. Clean, distraction-free, paper-like.</p>
          </div>
        </div>

        <hr className="border-slate-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Typography Logic</h3>
            <div className="space-y-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="text-3xl font-serif text-slate-900 mb-2">The Dignity Protocol</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Serif Headings</p>
                <p className="text-sm text-slate-600">Used for titles and major statements to evoke legal/historical weight.</p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="text-base font-sans text-slate-900 mb-2">Families achieving economic stability through verifiable metrics.</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Sans-Serif Body</p>
                <p className="text-sm text-slate-600">Used for UI elements, data tables, and reading text for maximum clarity.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Iconography</h3>
            <div className="flex gap-4 mb-4">
              <div className="p-3 bg-slate-100 rounded-lg"><Shield className="w-6 h-6 text-slate-900" /></div>
              <div className="p-3 bg-emerald-100 rounded-lg"><Leaf className="w-6 h-6 text-emerald-700" /></div>
              <div className="p-3 bg-amber-100 rounded-lg"><Database className="w-6 h-6 text-amber-600" /></div>
            </div>
            <p className="text-sm text-slate-600">
              Icons should be outlined (Lucide React), clean, and functional. Avoid "cartoonish" or "filled" styles unless indicating a button state.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
