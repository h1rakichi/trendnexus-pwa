// アイコンは以下で代替：

const BrainCircuit = () => <span>🧠</span>;
const Globe2 = () => <span>🌐</span>;
const Zap = () => <span>⚡</span>;
const ExternalLink = () => <span>🔗</span>;
const X = () => <span>✕</span>;
const Sparkles = () => <span>✨</span>;
const LineChart = () => <span>📈</span>;
const ShieldAlert = () => <span>🛡️</span>;
const ArrowRight = () => <span>→</span>;
const Lightbulb = () => <span>💡</span>;
const Terminal = () => <span>💻</span>;
const Gamepad2 = () => <span>🎮</span>;
const Dumbbell = () => <span>💪</span>;
const Activity = () => <span>📊</span>;
const Loader2 = () => <span>⏳</span>;
const Wifi = () => <span>📡</span>;
const Radio = () => <span>📻</span>;
const CheckCircle2 = () => <span>✓</span>;
const Trophy = () => <span>🏆</span>;
const Flame = () => <span>🔥</span>;

// ==========================================
// データ定義セクション
// ==========================================

// 【重要】ユーザーのクエリに応じて、以下の日付を適切に書き換えてください。
const SYSTEM_DATE = "2025.12.01";  // ※現在の日付 (Today)
const TARGET_DATE = "2025.12.01";  // ※ユーザーが指定した対象期間の日付

// カラーパレット定義
const DOMAINS = {
  AI: { 
    label: 'AI・技術', 
    color: 'fuchsia', 
    icon: BrainCircuit, 
    border: 'border-fuchsia-500', 
    bg: 'bg-fuchsia-950/40', 
    text: 'text-fuchsia-400', 
    glow: 'shadow-[0_0_20px_-5px_rgba(232,121,249,0.5)]',
    bgSolid: 'bg-fuchsia-500',
    dotBg: 'bg-fuchsia-500'
  },
  GAME: { 
    label: 'ゲーム', 
    color: 'cyan', 
    icon: Gamepad2, 
    border: 'border-cyan-500', 
    bg: 'bg-cyan-950/40', 
    text: 'text-cyan-400', 
    glow: 'shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)]',
    bgSolid: 'bg-cyan-500',
    dotBg: 'bg-cyan-500'
  },
  FITNESS: { 
    label: 'ヘルスケア', 
    color: 'emerald', 
    icon: Dumbbell, 
    border: 'border-emerald-500', 
    bg: 'bg-emerald-950/40', 
    text: 'text-emerald-400', 
    glow: 'shadow-[0_0_20px_-5px_rgba(52,211,153,0.5)]',
    bgSolid: 'bg-emerald-500',
    dotBg: 'bg-emerald-500'
  },
  ANALYSIS: { 
    label: '戦略分析', 
    color: 'yellow', 
    icon: LineChart, 
    border: 'border-yellow-500', 
    bg: 'bg-yellow-950/40', 
    text: 'text-yellow-400', 
    glow: 'shadow-[0_0_20px_-5px_rgba(250,204,21,0.5)]',
    bgSolid: 'bg-yellow-500',
    dotBg: 'bg-yellow-500'
  }
};

type ImportanceLevel = 'critical' | 'high' | 'medium';

type DataItem = {
  id: string;
  domain: 'AI' | 'GAME' | 'FITNESS' | 'ANALYSIS';
  title: string;
  label?: string;
  value?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  date: string;
  summary: string;
  details: string[];
  url: string; // 【重要】ここに必ず記事のURLを入れること
  sourceName: string;
  importance: ImportanceLevel;
};

/* --------------------------------------------------------------------
   以下のデータ変数を、検索結果に基づいて書き換えてください。
   【重要】信頼できる情報源のURLを必ず含めてください。
   -------------------------------------------------------------------- */

// マーケットデータ
const MARKET_DATA: DataItem[] = [
  // 検索結果からデータを生成
];

// エグゼクティブ・サマリー
const EXEC_SUMMARY: DataItem | null = null;

// インサイト
const INSIGHT_DATA: DataItem | null = null;

// ニュースフィード
const NEWS_DATA: DataItem[] = [
  // 検索結果からデータを生成
];

export default function MultiTrendApp() {
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
  const [activeTab, setActiveTab] = useState<'ALL' | 'AI' | 'GAME' | 'FITNESS' | 'ANALYSIS'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'DATE_DESC' | 'DATE_ASC' | 'IMPORTANCE'>('DATE_DESC');
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('ja-JP'));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    const clock = setInterval(() => setCurrentTime(new Date().toLocaleTimeString('ja-JP')), 1000);
    return () => { clearTimeout(timer); clearInterval(clock); };
  }, []);

  const filteredData = useMemo(() => {
    let data = NEWS_DATA.filter(item => {
      const matchesTab = activeTab === 'ALL' || item.domain === activeTab;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });

    return data.sort((a, b) => {
      if (sortOrder === 'IMPORTANCE') {
        const impOrder = { critical: 3, high: 2, medium: 1 };
        return impOrder[b.importance] - impOrder[a.importance];
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [activeTab, searchQuery, sortOrder]);

  const stats = useMemo(() => {
    return {
      aiCount: NEWS_DATA.filter(d => d.domain === 'AI').length,
      gameCount: NEWS_DATA.filter(d => d.domain === 'GAME').length,
      fitCount: NEWS_DATA.filter(d => d.domain === 'FITNESS').length
    };
  }, []);

  const getImportanceStyle = (level: ImportanceLevel) => {
    switch (level) {
      case 'critical': return 'border-red-500 shadow-[0_0_15px_-2px_rgba(239,68,68,0.6)] bg-red-950/20';
      case 'high': return 'border-orange-500/70 shadow-[0_0_10px_-2px_rgba(249,115,22,0.4)] bg-orange-950/10';
      case 'medium': return 'border-slate-700 bg-slate-900/40';
      default: return 'border-slate-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-cyan-500 font-mono">
        <Loader2 className="w-16 h-16 animate-spin mb-6 text-fuchsia-500" />
        <div className="text-2xl tracking-[0.3em] animate-pulse font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">SYSTEM BOOTING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-sans text-slate-200 pb-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-black to-black selection:bg-fuchsia-500/50 overflow-x-hidden">
      {/* Top Bar */}
      <div className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-slate-800 h-8 flex items-center justify-between px-4 text-[10px] md:text-xs font-mono tracking-widest text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-emerald-400 animate-pulse"><Wifi className="w-3 h-3" />ONLINE</span>
          <span className="hidden md:inline text-cyan-500">REGION: JPN</span>
        </div>
        <div className="flex items-center gap-4 text-fuchsia-500 font-bold">
          <span>{SYSTEM_DATE}</span>
          <span className="w-20 text-right">{currentTime}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-16 px-4 md:px-6">
        {/* Header */}
        <header className="mb-8 relative">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-2 font-mono text-xs tracking-widest border border-cyan-500/30 bg-cyan-950/20 w-fit px-3 py-1 rounded-sm"><Terminal className="w-3 h-3" />ANALYST_MODE: JPN_LOCALE</div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-2 italic transform -skew-x-6">TREND<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400">NEXUS</span></h1>
              <p className="text-slate-400 text-sm font-mono max-w-lg">マルチドメイン・インテリジェンス・アグリゲーター。AI技術、ゲーミング、ヘルスケア動向をリアルタイム追跡。</p>
            </div>

            <div className="flex gap-2">
              {[{l:'AI NODES',v:stats.aiCount,c:'text-fuchsia-400',b:'border-fuchsia-500/50',i:BrainCircuit},{l:'GAME EVENTS',v:stats.gameCount,c:'text-cyan-400',b:'border-cyan-500/50',i:Gamepad2},{l:'BIO METRICS',v:stats.fitCount,c:'text-emerald-400',b:'border-emerald-500/50',i:Dumbbell}].map((s,i)=>(
                <div key={i} className={`flex flex-col items-center justify-center w-24 h-20 rounded-sm bg-slate-900/80 border-t-2 ${s.b} backdrop-blur-sm shadow-lg`}>
                  <s.i className={`w-4 h-4 mb-1 ${s.c} opacity-70`} />
                  <span className={`text-xl font-black font-mono ${s.c}`}>{s.v}</span>
                  <span className="text-[8px] text-slate-500 uppercase tracking-wider">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Market Data */}
        <section className="mb-4">
          <h3 className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-2"><Activity className="w-3 h-3 text-fuchsia-500" />MARKET WATCH (JPY)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {MARKET_DATA.length > 0 ? MARKET_DATA.map((tile) => (
              <div key={tile.id} onClick={() => setSelectedItem(tile)} className="group relative cursor-pointer overflow-hidden bg-slate-900/60 border border-slate-800 p-3 rounded-md hover:border-cyan-500 hover:bg-slate-900 transition-all duration-200">
                <div className="text-[10px] text-slate-500 font-mono mb-1 flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${DOMAINS[tile.domain].dotBg}`}></span>
                  {tile.domain}
                </div>
                <div className="text-lg font-bold text-white mb-0.5 font-mono tracking-tight">{tile.value}</div>
                <div className="flex justify-between items-end">
                  <div className="text-xs text-slate-400 truncate pr-2">{tile.label}</div>
                  <div className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${tile.trend==='up'?'bg-emerald-950/50 text-emerald-400':'bg-rose-950/50 text-rose-400'}`}>{tile.change}</div>
                </div>
              </div>
            )) : <div className="col-span-4 text-xs text-slate-600 py-2">No Market Data Available</div>}
          </div>
        </section>

        {/* Executive Summary */}
        <section className="mb-8">
          {EXEC_SUMMARY && (
            <div onClick={() => setSelectedItem(EXEC_SUMMARY)} className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-black border-l-4 border-l-fuchsia-500 border-y border-r border-slate-800 rounded-r-md p-4 cursor-pointer hover:border-r-fuchsia-500 transition-all group">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-fuchsia-500/20 p-2 rounded text-fuchsia-400 animate-pulse"><Zap className="w-5 h-5" /></div>
                  <div>
                    <div className="text-[10px] text-fuchsia-400 font-bold tracking-widest mb-1">EXECUTIVE SUMMARY</div>
                    <h2 className="text-sm md:text-base font-bold text-white group-hover:text-fuchsia-200 transition-colors">{EXEC_SUMMARY.summary}</h2>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-black/50 px-3 py-1 rounded border border-slate-800 group-hover:border-fuchsia-500/50 group-hover:text-fuchsia-400 whitespace-nowrap">READ BRIEFING <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
          )}
        </section>

        {/* Controls */}
        <div className="sticky top-8 z-30 mb-6 p-3 rounded-lg bg-black/80 backdrop-blur-xl border border-slate-800 shadow-2xl flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide">
            {['ALL', ...Object.keys(DOMAINS)].map((tab) => {
              const dom = DOMAINS[tab as keyof typeof DOMAINS];
              return (
                <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-4 py-1.5 rounded-sm text-xs font-bold tracking-wider transition-all flex items-center gap-2 border skew-x-[-10deg] ${activeTab===tab && dom ? `${dom.bg} ${dom.text} ${dom.border} ${dom.glow}` : activeTab==='ALL' && tab==='ALL' ? 'bg-slate-100 text-black' : 'text-slate-500 border-transparent hover:bg-slate-900'}`}>
                  <div className="skew-x-[10deg] flex items-center gap-2">{dom ? <dom.icon className="w-3 h-3" /> : null} {dom ? dom.label : '総合フィード'}</div>
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <input type="text" placeholder="キーワード検索..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none" />
          </div>
        </div>

        {/* Main Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between mb-1"><h2 className="text-[10px] font-bold tracking-widest text-slate-500 flex items-center gap-2"><Radio className="w-3 h-3 text-rose-500 animate-pulse" />LATEST INTELLIGENCE</h2></div>

            {filteredData.length > 0 ? filteredData.map((item) => {
              const dom = DOMAINS[item.domain];
              return (
                <div key={item.id} onClick={() => setSelectedItem(item)} className={`group relative p-4 rounded-lg cursor-pointer transition-all border-l-[3px] hover:scale-[1.01] hover:brightness-110 ${getImportanceStyle(item.importance)}`}>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded text-black ${dom.bgSolid}`}>{dom.label}</span>
                        <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                      </div>
                      {item.importance === 'critical' && (<span className="flex items-center gap-1 text-[10px] font-bold text-red-500 animate-pulse"><ShieldAlert className="w-3 h-3" /> CRITICAL</span>)}
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-100 mb-2 leading-tight group-hover:text-white">{item.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3 font-medium">{item.summary}</p>
                    <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-2">
                      <div className="text-[10px] text-slate-600 font-mono flex items-center gap-2"><Globe2 className="w-3 h-3" />{item.sourceName}</div>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              );
            }) : <div className="text-center py-10 text-slate-600">No Intelligence Data Found</div>}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {INSIGHT_DATA && (
              <div onClick={() => setSelectedItem(INSIGHT_DATA)} className="group cursor-pointer bg-gradient-to-br from-slate-900 via-black to-amber-950/20 border border-amber-500/30 p-5 rounded-lg relative overflow-hidden hover:border-amber-500/60 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Lightbulb className="w-20 h-20 text-amber-500" /></div>
                <h3 className="text-amber-500 font-bold tracking-widest text-[10px] mb-3 flex items-center gap-2"><Sparkles className="w-3 h-3" />STRATEGIC INSIGHTS</h3>
                <p className="text-slate-300 text-xs leading-6 mb-3 relative z-10 group-hover:text-white transition-colors">{INSIGHT_DATA.summary}</p>
                <div className="flex items-center gap-1 text-[10px] text-amber-500/70 font-mono justify-end">VIEW REPORT <ArrowRight className="w-3 h-3" /></div>
              </div>
            )}

            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-lg">
              <h3 className="text-slate-500 font-bold tracking-widest text-[10px] mb-3 flex items-center gap-2"><Flame className="w-3 h-3 text-orange-500" />HOT TOPICS</h3>
              <div className="flex flex-wrap gap-1.5">{['Agentic AI', 'Switch 2', 'Glucose Monitor', 'RTX 5090', 'Orion', 'NPC AI'].map(tag => (<span key={tag} className="text-[10px] px-2 py-1 rounded bg-black border border-slate-800 text-slate-400 hover:border-cyan-500 hover:text-cyan-400 cursor-pointer transition-colors">#{tag}</span>))}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div onClick={() => setSelectedItem(null)} className="fixed inset-0 z- flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div onClick={(e) => e.stopPropagation()} className="bg-slate-950 border border-slate-700 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200 ring-1 ring-white/10">
            <div className={`h-1 w-full ${DOMAINS[selectedItem.domain].bgSolid}`}></div>

            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 p-1.5 bg-black rounded-md border border-slate-700 text-slate-400 hover:text-white hover:border-fuchsia-500 transition-all z-20"><X className="w-4 h-4" /></button>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-md bg-opacity-10 border ${DOMAINS[selectedItem.domain].bg} ${DOMAINS[selectedItem.domain].border}`}>{React.createElement(DOMAINS[selectedItem.domain].icon, { className: `w-5 h-5 ${DOMAINS[selectedItem.domain].text}` })}</div>
                <div>
                  <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2"><span>{selectedItem.date}</span><span className="text-slate-700">|</span><span>ID: {selectedItem.id}</span></div>
                  <div className={`text-xs font-bold tracking-wider ${DOMAINS[selectedItem.domain].text}`}>{DOMAINS[selectedItem.domain].label} INTELLIGENCE</div>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">{selectedItem.title}</h2>

              <div className={`p-4 rounded border bg-slate-900/50 mb-6 ${selectedItem.importance === 'critical' ? 'border-red-900/50 bg-red-950/10' : 'border-slate-800'}`}><p className="text-slate-300 text-sm leading-relaxed">{selectedItem.summary}</p></div>

              <div className="mb-6">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2"><Trophy className="w-3 h-3" />KEY DATA POINTS</h3>
                <ul className="space-y-2.5">{selectedItem.details.map((detail, idx) => (<li key={idx} className="flex items-start gap-3 text-sm text-slate-400 group"><CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${DOMAINS[selectedItem.domain].text} opacity-50 group-hover:opacity-100 transition-opacity`} /><span className="group-hover:text-slate-200 transition-colors">{detail}</span></li>))}</ul>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">SOURCE ORIGIN</span>
                  {selectedItem.url && selectedItem.url !== '' ? (
                    <a href={selectedItem.url} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-cyan-500 hover:text-cyan-300 hover:underline transition-colors flex items-center gap-1">
                      {selectedItem.sourceName} <ExternalLink className="w-2.5 h-2.5 inline" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-cyan-500">{selectedItem.sourceName}</span>
                  )}
                </div>

                {selectedItem.url && selectedItem.url !== '#' && selectedItem.url !== '' && (
                  <a href={selectedItem.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2 rounded-sm text-xs font-bold transition-all text-black bg-gradient-to-r from-slate-200 to-white hover:from-cyan-400 hover:to-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]"><ExternalLink className="w-3 h-3" />ACCESS SOURCE</a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
