'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { SplineScene } from '@/components/ui/splite';
import { GooeyText } from '@/components/GooeyText';
import { BlurTextEffect } from '@/components/BlurTextEffect';

const FADE_IN_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Page() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-xl border-b border-white/5"
      >
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="font-bold text-lg text-white">V</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white/90">Vibe.ai</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Showcase</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div>
          <button className="px-5 py-2 text-sm font-semibold rounded-full bg-white text-black hover:scale-105 transition-transform">
            Get Access
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <main className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center px-6 lg:px-12 pt-20">
        
        {/* Mobile Background Robot (overlay) */}
        <div className="absolute inset-0 lg:hidden opacity-30 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
          <div className="w-full h-full scale-125">
             <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
          </div>
        </div>

        {/* Text Area */}
        <motion.div 
          variants={STAGGER}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-start max-w-2xl mt-12 lg:mt-0"
        >
          <motion.div variants={FADE_IN_UP} className="mb-6 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-sm font-medium text-purple-200 tracking-wide">Vibe Coding 2.0 is Here</span>
          </motion.div>

          <motion.h1 variants={FADE_IN_UP} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            <span className="block mb-2">Code with your</span>
            <div className="h-[80px] sm:h-[100px] overflow-hidden relative w-full -ml-2 text-purple-400">
               <GooeyText 
                  texts={["Vibe.", "Instinct.", "Voice.", "Mind."]} 
                  morphTime={1.2}
                  cooldownTime={1.8}
                  className="w-full h-full justify-start items-start"
                  textClassName="text-5xl sm:text-7xl font-extrabold tracking-tight left-0 origin-left object-left pl-2"
               />
            </div>
          </motion.h1>

          <motion.p variants={FADE_IN_UP} className="mt-8 text-lg sm:text-xl text-neutral-400 leading-relaxed max-w-lg">
            타이핑은 에이전트에 맡기세요. 당신은 그저 상상하고, 원하는 감각을 전달하기만 하면 됩니다. 
            <strong className="text-white font-semibold"> 아름답고 완벽한 코드</strong>가 즉시 빌드됩니다.
          </motion.p>

          <motion.div variants={FADE_IN_UP} className="mt-10 flex flex-wrap items-center gap-4">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:shadow-[0_0_40px_-10px_rgba(147,51,234,0.5)] transition-all hover:-translate-y-0.5 whitespace-nowrap">
              Start Vibe Coding
            </button>
            <button className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg backdrop-blur-md transition-all whitespace-nowrap">
              Watch the Demo
            </button>
          </motion.div>
          
          <motion.div variants={FADE_IN_UP} className="mt-14 flex items-center gap-6 opacity-60">
             <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-neutral-800" />
                ))}
             </div>
             <div className="text-sm">
               <p className="text-white font-medium">Join 10,000+ creators</p>
               <p className="text-neutral-500">who already trust their vibes.</p>
             </div>
          </motion.div>

        </motion.div>

        {/* Right Spline Robot */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:flex w-full h-[800px] items-center justify-center relative translate-x-[10%]"
        >
           <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
             <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
             <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
           </div>
        </motion.div>

      </main>

      {/* Feature Section Example */}
      <section className="relative z-10 bg-black py-32 px-6 lg:px-12 border-t border-white/5">
         <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
               <BlurTextEffect className="text-sm font-semibold tracking-widest text-purple-500 uppercase">
                 The Magic of Next-Gen
               </BlurTextEffect>
               <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                 생각의 속도,<br/>그대로 화면에 구현되다.
               </h2>
               <p className="text-xl text-neutral-400">
                 더 이상 코딩 문법에 얽매일 필요가 없습니다. 머릿속에 그리는 멋진 디자인과 기능의 '느낌(Vibe)'만 말해주세요. 로봇 에이전트가 복잡한 개발을 전부 대신합니다.
               </p>
               <ul className="space-y-4 pt-4">
                 {[
                   "실시간 렌더링 피드백", 
                   "복잡한 인터랙션 자동 생성",
                   "엔터프라이즈급 성능 최적화"
                 ].map((text, idx) => (
                   <li key={idx} className="flex items-center gap-3 text-neutral-300">
                     <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                     </svg>
                     {text}
                   </li>
                 ))}
               </ul>
            </div>
            
            {/* Feature Visual */}
            <div className="flex-1 w-full relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-3xl" />
               <div className="relative rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-xl p-8 aspect-video flex flex-col justify-between overflow-hidden">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/80" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                   <div className="w-3 h-3 rounded-full bg-green-500/80" />
                 </div>
                 <div className="space-y-4 mt-8 flex-1 font-mono text-sm">
                   <div className="text-purple-400">{'// User Intent: "Make a fancy button"'}</div>
                   <div className="text-blue-400">Agent.generateComponent(&#123;</div>
                   <div className="pl-4 text-neutral-300">type: 'button',</div>
                   <div className="pl-4 text-neutral-300">vibe: 'stunning glassmorphism',</div>
                   <div className="pl-4 text-neutral-300">animation: 'spring-hover'</div>
                   <div className="text-blue-400">&#125;)</div>
                 </div>
                 <div className="absolute bottom-[-10px] right-[-10px] w-32 h-32 bg-white/5 rounded-full blur-2xl" />
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 lg:px-12 text-center text-neutral-500 text-sm">
         <p>© 2026 Vibe.ai. Elevate your development experience.</p>
      </footer>
    </div>
  );
}
