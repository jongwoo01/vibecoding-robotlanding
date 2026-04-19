'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { SplineScene } from '@/components/ui/splite';
import { BlurTextEffect } from '@/components/BlurTextEffect';
import { ParticleHeadline } from '@/components/ParticleHeadline';

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
    <div className="relative min-h-screen overflow-hidden bg-white font-sans text-slate-950 selection:bg-slate-200">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-slate-200/80 bg-white/75 px-6 py-4 backdrop-blur-xl lg:px-12"
      >
          <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="flex relative h-10 w-10 items-center justify-center transition-transform group-hover:scale-105 overflow-hidden mix-blend-multiply">
            <img src="/logo.png" alt="VibeCoding Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-[22px] font-extrabold tracking-tight text-slate-900">VibeCoding</span>
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
          <a href="#" className="transition-colors hover:text-slate-900">Features</a>
          <a href="#" className="transition-colors hover:text-slate-900">Showcase</a>
          <a href="#" className="transition-colors hover:text-slate-900">Pricing</a>
        </div>
        <div>
          <button className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)] transition-all hover:-translate-y-0.5 hover:bg-slate-800">
            Get Access
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <main className="relative grid min-h-screen grid-cols-1 items-center overflow-hidden px-6 pt-20 md:px-8 lg:min-h-[880px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch lg:pr-12 lg:pl-16 xl:pr-14 xl:pl-24 2xl:pl-32">

        {/* Mobile Background Robot (overlay) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-35 pointer-events-none lg:hidden">
          <div className="h-full w-full scale-125 [filter:saturate(0.45)_brightness(0.98)_contrast(0.96)]">
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
          </div>
        </div>

        {/* Text Area */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate="visible"
          className="relative z-10 mt-12 flex max-w-2xl flex-col items-start lg:mt-0 lg:self-center"
        >
          <motion.div variants={FADE_IN_UP} className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 shadow-[0_16px_45px_-35px_rgba(15,23,42,0.55)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8DB4FF] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5B8CFF]"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-slate-600">VibeCoding 2.0 is Here</span>
          </motion.div>

          <motion.h1 variants={FADE_IN_UP} className="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            <span className="block mb-2">Code with your</span>
            <ParticleHeadline
              words={['Vibe.', 'Instinct.', 'Intent.', 'Mind.']}
              color="#22283A"
              intervalMs={3100}
              className="h-[80px] w-full sm:h-[100px] lg:h-[108px]"
            />
          </motion.h1>

          <motion.p variants={FADE_IN_UP} className="mt-8 max-w-lg text-lg leading-relaxed text-slate-600 sm:text-xl">
            구현은 에이전트에 맡기세요. 당신은 그저 상상하고, 원하는 감각을 전달하세요.
            <strong className="font-semibold text-slate-950"> 아름답고 완벽한 코드</strong>를 즉시 만들어보세요.
          </motion.p>

          <motion.div variants={FADE_IN_UP} className="mt-10 flex flex-wrap items-center gap-4">
            <button className="whitespace-nowrap rounded-full bg-slate-950 px-8 py-4 text-lg font-semibold text-white shadow-[0_25px_50px_-28px_rgba(15,23,42,0.85)] transition-all hover:-translate-y-0.5 hover:bg-slate-800">
              Start Vibe Coding
            </button>
            <button className="whitespace-nowrap rounded-full border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-900 shadow-[0_20px_40px_-32px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-0.5 hover:bg-slate-50">
              Watch the Demo
            </button>
          </motion.div>

          <motion.div variants={FADE_IN_UP} className="mt-14 text-sm">
            <p className="font-medium text-slate-900">A more native way to build in the AI era</p>
            <p className="mt-1 text-slate-500">만드는 방식 자체를 AI에 맞게 다시 정의해보세요</p>
          </motion.div>

        </motion.div>

        {/* Right Spline Robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="relative hidden h-[800px] min-w-[640px] items-center justify-center lg:flex lg:w-[115%] lg:self-end lg:-translate-x-[4%] xl:w-[122%] xl:-translate-x-[6%]"
        >
          <div className="relative h-full w-full cursor-grab overflow-visible active:cursor-grabbing">
            <div className="h-full w-full translate-y-8 scale-[0.92] opacity-80 [filter:saturate(0.5)_brightness(0.98)_contrast(0.95)] xl:translate-y-10 xl:scale-[0.95]">
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
            </div>
          </div>
        </motion.div>

      </main>

      {/* Feature Section Example */}
      <section className="relative z-10 border-t border-slate-200 bg-slate-50/80 px-6 py-32 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 lg:flex-row">
          <div className="flex-1 space-y-8">
            <BlurTextEffect className="text-sm font-semibold uppercase tracking-widest text-[#5B8CFF]">
              The Magic of Next-Gen
            </BlurTextEffect>
            <h2 className="text-4xl font-bold tracking-tight text-slate-950 lg:text-5xl">
              생각의 속도,<br />그대로 화면에 구현되다.
            </h2>
            <p className="text-xl text-slate-600">
              더 이상 코딩 문법에 얽매일 필요가 없습니다. 머릿속에 그리는 멋진 디자인과 기능의 {`'느낌(Vibe)'`}만 말해주세요. AI 에이전트가 복잡한 개발을 전부 대신합니다.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "실시간 렌더링 피드백",
                "복잡한 인터랙션 자동 생성",
                "엔터프라이즈급 성능 최적화"
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700">
                  <svg className="h-5 w-5 flex-shrink-0 text-[#44506B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Feature Visual */}
          <div className="relative w-full flex-1">
            <div className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
                 <div className="mt-8 flex-1 space-y-4 font-mono text-sm">
                    <div className="text-[#44506B]">{'// User Intent: "AI 시대에 맞는 근본적인 제작 경험"'}</div>
                    <div className="text-slate-900">Agent.generateInterface(&#123;</div>
                    <div className="pl-4 text-slate-600">{`direction: 'native AI workflow',`}</div>
                    <div className="pl-4 text-slate-600">{`tone: 'precise and premium',`}</div>
                    <div className="pl-4 text-slate-600">{`output: 'production-ready UI'`}</div>
                    <div className="text-slate-900">&#125;)</div>
                  </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-12 text-center text-sm text-slate-500 lg:px-12">
        <p>© 2026 VibeCoding. Elevate your development experience.</p>
      </footer>
    </div>
  );
}
