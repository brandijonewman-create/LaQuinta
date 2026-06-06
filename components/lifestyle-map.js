'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LA_QUINTA_CENTER, mapPoints } from '@/lib/map-points';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const COLOR = { club: '#B45D3C', place: '#C8A24A', trail: '#1F3A2E' };

export default function LifestyleMap() {
  const node = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!TOKEN || !node.current || map.current) return;
    mapboxgl.accessToken = TOKEN;
    map.current = new mapboxgl.Map({
      container: node.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [LA_QUINTA_CENTER.lon, LA_QUINTA_CENTER.lat],
      zoom: LA_QUINTA_CENTER.zoom,
      attributionControl: true,
    });
    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    map.current.on('load', () => {
      for (const p of mapPoints) {
        const el = document.createElement('div');
        el.style.cssText = `width:${p.type==='club'?16:11}px;height:${p.type==='club'?16:11}px;border-radius:50%;background:${COLOR[p.type]||'#1F3A2E'};border:2px solid #FAF6EE;box-shadow:0 1px 4px rgba(26,23,20,0.3);cursor:pointer;`;
        const popupHtml = p.href
          ? `<div style="font-family:Georgia,serif;"><div style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#B45D3C;font-family:Arial,sans-serif;margin-bottom:4px;">Private Club</div><div style="font-size:16px;color:#1F3A2E;">${p.name}</div><a href="${p.href}" style="display:inline-block;margin-top:8px;font-size:11px;font-family:Arial,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:#B45D3C;text-decoration:none;border-bottom:1px solid #B45D3C;">Read profile →</a></div>`
          : `<div style="font-family:Georgia,serif;"><div style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#7A6E60;font-family:Arial,sans-serif;margin-bottom:4px;">${p.type==='trail'?'Trail':'Landmark'}</div><div style="font-size:15px;color:#1F3A2E;">${p.name}</div></div>`;
        new mapboxgl.Marker(el)
          .setLngLat([p.lon, p.lat])
          .setPopup(new mapboxgl.Popup({ offset: 14, closeButton: false }).setHTML(popupHtml))
          .addTo(map.current);
      }
    });

    return () => { map.current?.remove(); map.current = null; };
  }, []);

  if (!TOKEN) {
    return (
      <div className="border border-border bg-sand-50 p-10 text-center">
        <p className="text-foreground/70">Map token not configured.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={node} className="w-full h-[68vh] min-h-[460px] border border-border" />
      <div className="mt-5 flex flex-wrap gap-5 text-xs uppercase tracking-[0.18em] text-foreground/65">
        <span className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{background: COLOR.club, border:'2px solid #FAF6EE'}} />Private Club</span>
        <span className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{background: COLOR.place, border:'2px solid #FAF6EE'}} />Landmark</span>
        <span className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{background: COLOR.trail, border:'2px solid #FAF6EE'}} />Trailhead</span>
      </div>
    </div>
  );
}
