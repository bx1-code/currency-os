"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="w-[480px] h-[450px] flex items-center justify-center text-blue-500 font-medium">
      جاري تحميل الكرة الأرضية...
    </div>
  ),
});

export default function GlobeSection() {
  const globeRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // بيانات العملات ومواقعها الجغرافية الحقيقية
  const currencyData = [
    { lat: 37.7749, lng: -122.4194, code: "USD", flag: "🇺🇸" },
    { lat: 51.5074, lng: -0.1278, code: "GBP", flag: "🇬🇧" },
    { lat: 48.8566, lng: 2.3522, code: "EUR", flag: "🇪🇺" },
    { lat: 31.7917, lng: -7.0926, code: "MAD", flag: "🇲🇦" },
    { lat: 24.7136, lng: 46.6753, code: "SAR", flag: "🇸🇦" },
    { lat: 35.6762, lng: 139.6503, code: "JPY", flag: "🇯🇵" },
  ];

  // إعداد التحكم بالدوران وإلغاء الزوم عند جهوزية الكرة
  const handleGlobeReady = () => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.enableZoom = false; // تعطيل التكبير والتصغير
        controls.autoRotate = true;  // تفعيل الدوران التلقائي
        controls.autoRotateSpeed = 1.2; // سرعة الدوران
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full bg-[#f4f6f8] rounded-[32px] py-8 px-4 my-8 flex flex-col items-center justify-center border border-gray-200/80 shadow-sm relative overflow-hidden select-none">
      
      <div className="relative w-[480px] h-[450px] max-w-full flex items-center justify-center">
        
        <Globe
          ref={globeRef}
          width={480}
          height={450}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere={true}
          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.15}
          onGlobeReady={handleGlobeReady}
          htmlElementsData={currencyData}
          htmlElement={(d: any) => {
            const el = document.createElement("div");
            el.innerHTML = `
              <div style="
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(8px);
                padding: 4px 10px;
                border-radius: 9999px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border: 1px solid rgba(229, 231, 235, 0.9);
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 11px;
                font-weight: 700;
                color: #1f2937;
                white-space: nowrap;
                transform: translate(-50%, -100%);
                cursor: pointer;
              ">
                <span style="font-size: 14px;">${d.flag}</span>
                <span>${d.code}</span>
              </div>
            `;
            return el;
          }}
        />

      </div>
    </div>
  );
}