/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  ChevronRight, 
  Globe, 
  Shield, 
  Smartphone, 
  Zap, 
  ArrowUpRight,
  Search,
  MessageCircle,
  Menu,
  Plus,
  Gavel,
  Briefcase,
  Users,
  ArrowUp
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // View State (home | admin)
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  
  // Consultation Data State
  const [inquiries, setInquiries] = useState<any[]>([
    { id: 1, name: '김철수', phone: '010-1234-5678', category: '형사 소송', message: '사기 피해 관련 상담 요청합니다.', date: '2026-04-23 11:30', status: '대기' },
    { id: 2, name: '이영희', phone: '010-9876-5432', category: '기업 법무', message: '스타트업 투자 계약서 검토 부탁드립니다.', date: '2026-04-22 15:45', status: '진행중' },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultationSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newInquiry = {
      id: Date.now(),
      name: formData.get('name'),
      phone: formData.get('phone'),
      category: formData.get('category'),
      message: formData.get('message'),
      date: new Date().toLocaleString(),
      status: '대기'
    };
    setInquiries([newInquiry, ...inquiries]);
    alert('상담 신청이 완료되었습니다! 관리자 모드에서 확인해 보세요.');
    e.target.reset();
  };

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-slate pt-24 px-6">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-navy px-8 py-4 flex items-center justify-between shadow-2xl">
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
             <Scale className="text-azure w-6 h-6" />
             <span className="font-display font-bold text-xl text-white">LEX ADMIN</span>
           </div>
           <button 
            onClick={() => setCurrentView('home')}
            className="text-white/70 hover:text-white text-sm font-bold flex items-center gap-2"
           >
             나가기 <Plus size={18} className="rotate-45" />
           </button>
        </nav>

        <main className="max-w-7xl mx-auto py-12">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
             <div>
               <h1 className="text-4xl font-black text-navy mb-4 uppercase">의뢰 현황 관리</h1>
               <p className="text-navy/50 font-medium">실시간으로 접수된 상담 내역을 확인하고 관리할 수 있습니다.</p>
             </div>
             <div className="flex gap-4">
                <div className="bg-white px-6 py-4 rounded-3xl border border-navy/5 shadow-sm text-center min-w-[120px]">
                   <p className="text-[10px] font-bold text-navy/40 uppercase mb-1">총 의뢰</p>
                   <p className="text-2xl font-black text-navy">{inquiries.length}</p>
                </div>
                <div className="bg-azure px-6 py-4 rounded-3xl shadow-lg text-center min-w-[120px]">
                   <p className="text-[10px] font-bold text-white/50 uppercase mb-1">진행중</p>
                   <p className="text-2xl font-black text-white">{inquiries.filter(i => i.status === '진행중').length}</p>
                </div>
             </div>
           </div>

           <div className="bg-white rounded-[40px] border border-navy/5 shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-navy/5 border-b border-navy/10">
                      <th className="px-8 py-6 text-xs font-bold text-navy/40 uppercase tracking-widest">날짜</th>
                      <th className="px-8 py-6 text-xs font-bold text-navy/40 uppercase tracking-widest">성함/연락처</th>
                      <th className="px-8 py-6 text-xs font-bold text-navy/40 uppercase tracking-widest">상담 분야</th>
                      <th className="px-8 py-6 text-xs font-bold text-navy/40 uppercase tracking-widest">내용 요약</th>
                      <th className="px-8 py-6 text-xs font-bold text-navy/40 uppercase tracking-widest text-center">상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/5">
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-slate/30 transition-colors group">
                        <td className="px-8 py-6">
                           <p className="text-sm font-bold text-navy whitespace-nowrap">{inquiry.date}</p>
                        </td>
                        <td className="px-8 py-6">
                           <p className="font-bold text-navy">{inquiry.name}</p>
                           <p className="text-xs text-navy/40">{inquiry.phone}</p>
                        </td>
                        <td className="px-8 py-6">
                           <span className="px-3 py-1 rounded-full bg-azure/10 text-azure text-[10px] font-bold uppercase">
                             {inquiry.category}
                           </span>
                        </td>
                        <td className="px-8 py-6">
                           <p className="text-sm text-navy/60 line-clamp-1 max-w-xs">{inquiry.message}</p>
                        </td>
                        <td className="px-8 py-6 text-center">
                           <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase ${
                             inquiry.status === '대기' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                           }`}>
                             {inquiry.status}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {inquiries.length === 0 && (
                <div className="py-24 text-center">
                   <Search className="mx-auto text-navy/10 mb-4" size={48} />
                   <p className="text-navy/30 font-bold uppercase tracking-widest">접수된 상담이 없습니다.</p>
                </div>
              )}
           </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500">
        <div className={`rounded-full px-8 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled 
            ? 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate scale-[0.98]' 
            : 'bg-white/10 backdrop-blur-md border border-white/20'
        }`}>
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${
              scrolled ? 'bg-navy' : 'bg-azure'
            }`}>
              <Scale className="text-white w-4 h-4" />
            </div>
            <span className={`font-display font-bold text-xl tracking-tight transition-colors duration-500 ${
              scrolled ? 'text-navy' : 'text-white'
            }`}>LEX LAW</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold">
            {[
              { name: '변호사 소개', href: '#hero' },
              { name: '전문 분야', href: '#features' },
              { name: '스마트 포털', href: '#portal' },
              { name: '긴급 상담', href: '#contact' }
            ].map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`transition-colors duration-500 ${
                  scrolled ? 'text-navy/70 hover:text-azure' : 'text-white/90 hover:text-azure'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentView('admin')}
              className={`hidden sm:block text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                scrolled ? 'text-navy border-navy/10 hover:bg-navy hover:text-white' : 'text-white border-white/20 hover:bg-white hover:text-navy'
              }`}
            >
              관리자
            </button>
            <button className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all group shadow-lg ${
              scrolled 
                ? 'bg-navy text-white hover:bg-azure' 
                : 'bg-azure text-white hover:bg-blue-600'
            }`}>
              의뢰인 로그인
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-azure text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          >
            <ArrowUp className="group-hover:-translate-y-1 transition-transform" size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[110vh] bg-navy pt-40 pb-20 overflow-hidden flex items-center justify-center">
        {/* Background Large Text */}
        <div className="absolute inset-x-0 top-1/4 select-none pointer-events-none">
          <h1 className="text-[25vw] font-display font-black text-white/[0.03] leading-none text-center">
            LAWYER
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-24 h-24 bg-azure/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-8 overflow-hidden border border-azure/30"
              >
                <div className="w-16 h-16 bg-azure rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(58,134,255,0.5)]">
                   <Shield className="text-white w-8 h-8" />
                </div>
              </motion.div>
              
              <h2 className="text-white text-3xl mb-4 font-light">당신의 가장 확실한 조력자</h2>
              <h3 className="text-white text-7xl md:text-8xl font-black mb-8 leading-[0.9]">
                법률을 넘어, <br />
                <span className="text-azure italic">가치를 지킵니다</span>
              </h3>
              
              <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto lg:mx-0">
                복잡한 법률 분쟁, 이제 렉스 법률사무소와 함께 스마트하고 신속하게 해결하세요. 데이터 기반의 분석과 강력한 변론으로 의뢰인의 승리를 이끕니다.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button className="bg-white text-navy px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                  무료 진단 신청 <Plus size={20} />
                </button>
                <button className="text-white/70 hover:text-white transition-colors text-sm font-semibold underline underline-offset-8">
                  전문 변호사 프로필 보기
                </button>
              </div>
            </div>

            <div className="relative">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="bg-white/10 backdrop-blur-3xl rounded-[40px] p-8 border border-white/10 aspect-square flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Scale className="text-navy" size={24} />
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-xs uppercase tracking-widest font-bold">누적 해결 사건</p>
                      <h4 className="text-white text-4xl font-bold">12,000+</h4>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3">
                      <p className="text-white/60 font-bold text-xs uppercase tracking-widest px-2">최근 승소 소식</p>
                      {[
                        { title: '대형 기업 횡령 무죄 판결', time: '24시간 전', icon: Zap },
                        { title: '부동산 가처분 이의 신청 인용', time: '2일 전', icon: Shield },
                        { title: '가상자산 사기 피해 전액 회수', time: '3일 전', icon: Globe }
                      ].map((news, idx) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 border border-white/10 hover:bg-white/10 transition-colors group cursor-default">
                          <div className="w-10 h-10 bg-azure/20 rounded-full flex items-center justify-center group-hover:bg-azure transition-colors">
                            <news.icon size={18} className="text-azure group-hover:text-white" />
                          </div>
                          <div>
                            <p className="text-white font-bold text-sm leading-tight">{news.title}</p>
                            <p className="text-white/30 text-[10px] mt-1">{news.time} 완료</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-azure/20 blur-[120px] -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section (Bento Style) */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto px-0">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">서비스 전문 분야</h2>
            <p className="text-navy/50 max-w-2xl mx-auto">각 분야 최고의 전문 변호사팀이 의뢰인의 상황에 최적화된 맞춤형 법률 솔루션을 제공합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate rounded-[32px] p-10 group hover:bg-navy transition-all duration-500 overflow-hidden relative">
              <div className="relative z-10">
                <div className="mb-6 text-azure group-hover:text-white">
                  <Briefcase size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-white">기업/금융</h3>
                <p className="text-navy/40 group-hover:text-white/50 mb-8">스타트업 자문부터 복잡한 M&A, 기업 분쟁까지 비즈니스의 모든 법률 리스크를 관리합니다.</p>
                <button className="text-azure font-bold flex items-center gap-1 group-hover:text-white">
                  자세히 보기 <ChevronRight size={16} />
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-500 text-navy group-hover:text-white">
                <Briefcase size={200} />
              </div>
            </div>

            <div className="bg-slate rounded-[32px] p-10 group hover:bg-azure transition-all duration-500 relative">
              <div className="mb-6 text-navy group-hover:text-white">
                <Gavel size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-white font-display">형사 전문</h3>
              <p className="text-navy/40 group-hover:text-white/50 mb-8">수사 단계부터 재판까지, 피의자의 방어권을 최대한 보장하며 최선의 결과를 도출합니다.</p>
              <button className="text-navy font-bold flex items-center gap-1 group-hover:text-white">
                전문가 상담 <ChevronRight size={16} />
              </button>
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-500 text-white">
                <Gavel size={200} />
              </div>
            </div>

            <div className="bg-slate rounded-[32px] p-10 group hover:bg-navy transition-all duration-500 overflow-hidden relative">
              <div className="relative z-10">
                <div className="mb-6 text-azure group-hover:text-white">
                  <Users size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-white">이혼/가사</h3>
                <p className="text-navy/40 group-hover:text-white/50 mb-8">의뢰인의 심적 고통에 공감하며, 재산 분할 및 양육권 등 예민한 문제를 섬세하게 해결합니다.</p>
                <button className="text-azure font-bold flex items-center gap-1 group-hover:text-white">
                  솔루션 보기 <ChevronRight size={16} />
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-500 text-navy group-hover:text-white">
                <Users size={200} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Promo Section */}
      <section id="portal" className="bg-slate py-32 rounded-[60px] mx-6 mb-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                스마트 법률 <br />
                <span className="text-azure">포털 시스템</span>
              </h2>
              <div className="space-y-12">
                {[
                  { num: '001', title: '실시간 사건 진행 추적', desc: '의뢰하신 사건의 진행 상황과 재판 일정을 실시간으로 확인하고 알림을 받으세요.' },
                  { num: '002', title: '전담 변호사 다이렉트 챗', desc: '보안이 보장된 암호화 채널을 통해 언제 어디서든 담당 변호사와 즉시 소통하세요.' },
                  { num: '003', title: '디지털 증거 보관함', desc: '중요한 서류와 동영상 증거를 클라우드에 안전하게 보관하고 관리하세요.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <div className="w-14 h-14 rounded-full border border-navy/10 flex items-center justify-center shrink-0 text-xs font-bold group-hover:bg-azure group-hover:text-white group-hover:border-azure transition-all">
                      {item.num}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 uppercase tracking-wide">{item.title}</h4>
                      <p className="text-navy/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="w-[280px] h-[580px] bg-navy rounded-[40px] border-[8px] border-ink shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 w-full h-8 bg-ink" />
                <div className="p-6 pt-12 space-y-6">
                   <div className="flex justify-between items-center text-white/50 text-[10px] font-bold uppercase tracking-widest">
                     <span>진행 사건 목록</span>
                     <Search size={14} />
                   </div>
                   <div className="bg-white/10 rounded-2xl p-4 border border-white/5">
                      <p className="text-white text-xs font-bold mb-1">민사소송: 손해배상 청구</p>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                         <div className="bg-azure w-3/4 h-full" />
                      </div>
                      <p className="text-azure text-[10px] mt-2 font-bold select-none">상고심 준비 중</p>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="bg-azure rounded-2xl h-24 p-3 flex flex-col justify-between cursor-pointer">
                         <MessageCircle className="text-white" size={16} />
                         <span className="text-white text-[10px] font-bold">1:1 상담</span>
                      </div>
                      <div className="bg-white/5 rounded-2xl h-24 p-3 flex flex-col justify-between border border-white/5 cursor-pointer">
                         <Plus className="text-white" size={16} />
                         <span className="text-white text-[10px] font-bold">자료 제출</span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-azure/30 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            {/* Contact Info */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                당신의 권리를 위한 <br />
                <span className="text-azure text-3xl md:text-5xl">가장 빠른 첫걸음</span>
              </h2>
              <p className="text-navy/50 text-lg mb-12 max-w-md">
                상담은 비공개로 진행되며, 전문 변호사가 직접 검토 후 24시간 이내에 연락드립니다. 망설이지 말고 지금 바로 진단을 신청하세요.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate flex items-center justify-center text-azure group-hover:bg-azure group-hover:text-white transition-all">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy/40 uppercase tracking-widest">상담 전화</p>
                    <p className="text-xl font-bold text-navy">02-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate flex items-center justify-center text-azure group-hover:bg-azure group-hover:text-white transition-all">
                    <Search size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy/40 uppercase tracking-widest">상담 가능 시간</p>
                    <p className="text-xl font-bold text-navy">평일 09:00 - 19:00 (주말 예약제)</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate flex items-center justify-center text-azure group-hover:bg-azure group-hover:text-white transition-all">
                    <Globe size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy/40 uppercase tracking-widest">사무소 위치</p>
                    <p className="text-xl font-bold text-navy">서울특별시 서초구 서초대로 397 (법학빌딩)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate rounded-[40px] p-10 lg:p-14 border border-navy/5">
              <form className="space-y-8" onSubmit={handleConsultationSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-1">의뢰인 성함</label>
                    <input name="name" type="text" required className="w-full bg-white px-6 py-4 rounded-2xl border border-navy/5 outline-none focus:border-azure transition-colors font-medium" placeholder="홍길동" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-1">연락처</label>
                    <input name="phone" type="tel" required className="w-full bg-white px-6 py-4 rounded-2xl border border-navy/5 outline-none focus:border-azure transition-colors font-medium" placeholder="010-1234-5678" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-1">상담희망 분야</label>
                  <select name="category" required className="w-full bg-white px-6 py-4 rounded-2xl border border-navy/5 outline-none focus:border-azure transition-colors font-medium appearance-none">
                    <option value="">분야를 선택해 주세요</option>
                    <option value="기업 법무 / 금융">기업 법무 / 금융</option>
                    <option value="형사 소송 / 방어">형사 소송 / 방어</option>
                    <option value="이혼 / 가사 분쟁">이혼 / 가사 분쟁</option>
                    <option value="부동산 / 민사">부동산 / 민사</option>
                    <option value="기타 법률 자문">기타 법률 자문</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-1">상담 내용 요약</label>
                  <textarea name="message" required rows={4} className="w-full bg-white px-6 py-4 rounded-2xl border border-navy/5 outline-none focus:border-azure transition-colors font-medium resize-none" placeholder="문의하실 내용을 간단히 작성해 주세요."></textarea>
                </div>
                <button type="submit" className="w-full bg-navy text-white hover:bg-azure py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group shadow-xl">
                  법률 컨설팅 신청하기
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-navy pt-32 pb-16 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Scale className="text-navy w-4 h-4" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-white">LEX LAW</span>
              </div>
              <p className="text-white/40 max-w-sm">법률의 문턱을 낮추고 의뢰인의 권리를 혁신적인 방식으로 보호합니다. 전국 2000개 이상의 기업과 개인이 신뢰하는 법률 파트너입니다.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
              <div>
                <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">전문 분야</h5>
                <ul className="space-y-3 text-white/50 text-sm">
                  <li><a href="#" className="hover:text-azure transition-colors">기업 법무</a></li>
                  <li><a href="#" className="hover:text-azure transition-colors">형사 소송</a></li>
                  <li><a href="#" className="hover:text-azure transition-colors">이혼/가사</a></li>
                  <li><a href="#" className="hover:text-azure transition-colors">금융 자문</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">사무소 정보</h5>
                <ul className="space-y-3 text-white/50 text-sm">
                  <li><a href="#" className="hover:text-azure transition-colors">변호사 소개</a></li>
                  <li><a href="#" className="hover:text-azure transition-colors">오시는 길</a></li>
                  <li><a href="#" className="hover:text-azure transition-colors">인재 채용</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">고객 지원</h5>
                <ul className="space-y-3 text-white/50 text-sm">
                  <li><a href="#" className="hover:text-azure transition-colors">온라인 상담</a></li>
                  <li><a href="#" className="hover:text-azure transition-colors">자주 묻는 질문</a></li>
                  <li><a href="#" className="hover:text-azure transition-colors">긴급 상담: 02-123-4567</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
             <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em]">© 2026 Lex Law Firm. All Rights Reserved.</p>
             <div className="flex gap-8 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                <a href="#" className="hover:text-white transition-colors">개인정보 처리방침</a>
                <a href="#" className="hover:text-white transition-colors">이용 약관</a>
             </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-[0.03]">
          <h1 className="text-[30vw] font-display font-black text-white leading-none text-center transform translate-y-1/2">
            LEX LAW
          </h1>
        </div>
      </footer>
    </div>
  );
}

