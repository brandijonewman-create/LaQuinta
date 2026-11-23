'use client';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';
import { X, Bed, Bath, Maximize, AlertCircle } from 'lucide-react';

export default function ListingsMap({ listings = [], communities = [], pois = [], height = 600, center = [-111.91, 33.70], zoom = 10.5 }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const initRef = useRef(false);
  const [selected, setSelected] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (initRef.current || !containerRef.current) return;
    initRef.current = true;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      setError('Mapbox token missing. Add NEXT_PUBLIC_MAPBOX_TOKEN to /app/.env');
      return;
    }
    mapboxgl.accessToken = token;

    let map;
    try {
      map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center,
        zoom,
        attributionControl: false,
      });
    } catch (e) {
      setError('Failed to initialize map: ' + e.message);
      return;
    }
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new mapboxgl.AttributionControl({ compact: true }));

    // Force resize on container size changes (fixes initial 300px height bug)
    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) mapRef.current.resize();
    });
    resizeObserver.observe(containerRef.current);

    // Force resize after layout flush — multiple times because of dev mode timing
    [50, 200, 500, 1000, 2000].forEach(ms => setTimeout(() => mapRef.current?.resize(), ms));

    // Also resize on window resize
    const onResize = () => mapRef.current?.resize();
    window.addEventListener('resize', onResize);

    map.on('error', (e) => {
      const msg = e.error?.message || 'Map error';
      console.error('Mapbox error:', msg, e);
      if (msg.includes('Not Authorized') || msg.includes('401')) {
        setError('Mapbox token unauthorized. Check token settings in Mapbox dashboard.');
      } else if (msg.includes('Failed to fetch')) {
        setError('Could not reach Mapbox servers. Check network / ad-blocker.');
      }
    });

    map.on('load', () => {
      setLoaded(true);

      // ---- Community boundary polygons (approximate, visual orientation only) ----
      const polyFeatures = communities
        .filter(c => Array.isArray(c.polygon) && c.polygon.length >= 4)
        .map(c => ({
          type: 'Feature',
          geometry: { type: 'Polygon', coordinates: [c.polygon] },
          properties: { slug: c.slug, name: c.name }
        }));
      if (polyFeatures.length > 0) {
        try {
          map.addSource('community-polygons', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: polyFeatures }
          });
          map.addLayer({
            id: 'community-polygons-fill',
            type: 'fill',
            source: 'community-polygons',
            paint: {
              'fill-color': '#10b981',     // emerald-500
              'fill-opacity': 0.12
            }
          });
          map.addLayer({
            id: 'community-polygons-line',
            type: 'line',
            source: 'community-polygons',
            paint: {
              'line-color': '#062840',
              'line-width': 1.5,
              'line-opacity': 0.65,
              'line-dasharray': [2, 2]
            }
          });
          // Click anywhere inside a polygon to open the community card
          map.on('click', 'community-polygons-fill', (e) => {
            const slug = e.features?.[0]?.properties?.slug;
            const c = communities.find(x => x.slug === slug);
            if (c) { setSelected(null); setSelectedCommunity(c); }
          });
          map.on('mouseenter', 'community-polygons-fill', () => { map.getCanvas().style.cursor = 'pointer'; });
          map.on('mouseleave', 'community-polygons-fill', () => { map.getCanvas().style.cursor = ''; });
        } catch (err) {
          console.warn('Could not draw polygons:', err);
        }
      }

      communities.forEach(c => {
        if (!c.lat || !c.lng) return;
        const el = document.createElement('div');
        el.style.cssText = 'background:#d3ae8c;color:#062840;border:2px solid #062840;border-radius:9999px;padding:4px 10px;font-family:Cormorant Garamond,serif;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.25);white-space:nowrap;';
        el.textContent = c.name;
        el.addEventListener('click', () => { setSelected(null); setSelectedCommunity(c); });
        new mapboxgl.Marker({ element: el, anchor: 'bottom' }).setLngLat([c.lng, c.lat]).addTo(map);
      });
      listings.forEach(l => {
        if (!l.lat || !l.lng) return;
        const el = document.createElement('div');
        el.style.cssText = 'background:#062840;color:#d3ae8c;border:2px solid #d3ae8c;border-radius:9999px;padding:5px 10px;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.3);white-space:nowrap;';
        el.textContent = '$' + (l.price >= 1000000 ? (l.price / 1000000).toFixed(2) + 'M' : Math.round(l.price / 1000) + 'K');
        el.addEventListener('click', (ev) => { ev.stopPropagation(); setSelectedCommunity(null); setSelected(l); });
        new mapboxgl.Marker({ element: el, anchor: 'bottom' }).setLngLat([l.lng, l.lat]).addTo(map);
      });

      // ---- Lifestyle POI markers (schools, hospitals, dining, airport) ----
      const POI_STYLE = {
        school:   { bg: '#0e7490', emoji: '\ud83c\udf93' }, // graduation cap
        hospital: { bg: '#dc2626', emoji: '\u2795' },       // medical cross
        dining:   { bg: '#b45309', emoji: '\ud83c\udf74' }, // fork & knife
        airport:  { bg: '#1d4ed8', emoji: '\u2708' },       // plane
        retail:   { bg: '#7c3aed', emoji: '\ud83d\udecd' }, // shopping bag
        golf_public:  { bg: '#15803d', emoji: '\u26f3' },   // flag in hole (public)
        golf_private: { bg: '#334155', emoji: '\u26f3' }    // flag in hole (private)
      };
      const esc = (s) => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
      pois.forEach(p => {
        if (!p.lat || !p.lng) return;
        if (p.type === 'golf') {
          const isPrivate = p.access === 'private';
          const gs = POI_STYLE[isPrivate ? 'golf_private' : 'golf_public'];
          const gel = document.createElement('div');
          gel.style.cssText = `background:${gs.bg};color:#fff;border:2px solid #fff;border-radius:9999px;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:13px;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.35);`;
          gel.textContent = gs.emoji;
          gel.title = `${p.name} (${isPrivate ? 'Private' : 'Public'})`;
          new mapboxgl.Marker({ element: gel, anchor: 'center' })
            .setLngLat([p.lng, p.lat])
            .setPopup(new mapboxgl.Popup({ offset: 16, closeButton: false }).setHTML(
              `<div style="font-family:Georgia,serif;font-size:13px;font-weight:600;color:#062840;">${esc(p.name)}</div>
               <div style="font-size:11px;font-weight:700;margin-top:2px;color:${gs.bg};">${isPrivate ? 'Private golf course' : 'Public golf course'}</div>
               ${p.address ? `<div style="font-size:11px;color:#062840;opacity:0.7;margin-top:2px;">${esc(p.address)}</div>` : ''}
               ${p.detail ? `<div style="font-size:11px;color:#062840;opacity:0.6;margin-top:2px;">${esc(p.detail)}</div>` : ''}`
            ))
            .addTo(map);
          return;
        }
        const style = POI_STYLE[p.type] || { bg: '#374151', emoji: '\u25cf' };
        const el = document.createElement('div');
        el.style.cssText = `background:${style.bg};color:#fff;border:2px solid #fff;border-radius:9999px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.35);`;
        el.textContent = style.emoji;
        el.title = p.name;
        new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([p.lng, p.lat])
          .setPopup(new mapboxgl.Popup({ offset: 18, closeButton: false }).setHTML(
            `<div style="font-family:Georgia,serif;font-size:13px;font-weight:600;color:#062840;">${p.name}</div>
             <div style="font-size:11px;color:#062840;opacity:0.65;margin-top:2px;text-transform:capitalize;">${p.type}${p.detail ? ' \u00b7 ' + p.detail : ''}</div>`
          ))
          .addTo(map);
      });
      const golfPois = pois.filter(p => p.type === 'golf' && p.lat && p.lng);
      if (listings.length + communities.length + golfPois.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        listings.forEach(l => l.lat && bounds.extend([l.lng, l.lat]));
        // Include golf courses so outlying ones (e.g. Anthem, north Tempe) are visible on load
        golfPois.forEach(p => bounds.extend([p.lng, p.lat]));
        communities.forEach(c => {
          if (c.lat) bounds.extend([c.lng, c.lat]);
          if (Array.isArray(c.polygon)) c.polygon.forEach(pt => bounds.extend(pt));
        });
        if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 60, maxZoom: 13, duration: 0 });
      }
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-900/10 shadow-sm bg-emerald-50 w-full" style={{ height: `${height}px`, minHeight: `${height}px` }}>
      <div ref={containerRef} className="absolute inset-0" style={{ width: '100%', height: '100%' }} />
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center text-emerald-900/60 text-sm">Loading map&hellip;</div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl p-6 max-w-md text-center shadow-lg border border-rose-200">
            <AlertCircle className="h-8 w-8 text-rose-600 mx-auto mb-3" />
            <div className="font-serif text-lg text-[#062840] mb-2">Map could not load</div>
            <div className="text-sm text-emerald-900/70">{error}</div>
          </div>
        </div>
      )}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-80 bg-white rounded-xl shadow-2xl overflow-hidden border border-emerald-900/10 z-10">
          <button onClick={() => setSelected(null)} className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white rounded-full p-1"><X className="h-4 w-4 text-emerald-900" /></button>
          <Link href={`/homes/${selected.id}`} className="block">
            <div className="aspect-[16/9] bg-emerald-50"><img src={selected.image} alt={selected.address} className="w-full h-full object-cover" /></div>
            <div className="p-4">
              <div className="font-serif text-xl text-[#062840]">${selected.price.toLocaleString()}</div>
              <div className="text-xs text-emerald-900/70 mt-0.5">{selected.address}</div>
              <div className="text-xs text-amber-700 mt-1">{selected.communityName}</div>
              <div className="flex items-center gap-3 text-xs text-emerald-900/80 mt-3 pt-3 border-t border-emerald-900/10">
                <span className="flex items-center gap-1"><Bed className="h-3 w-3" /> {selected.beds}</span>
                <span className="flex items-center gap-1"><Bath className="h-3 w-3" /> {selected.baths}</span>
                <span className="flex items-center gap-1"><Maximize className="h-3 w-3" /> {selected.sqft.toLocaleString()}</span>
              </div>
            </div>
          </Link>
        </div>
      )}
      {selectedCommunity && (
        <div className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-80 bg-white rounded-xl shadow-2xl overflow-hidden border border-emerald-900/10 z-10">
          <button onClick={() => setSelectedCommunity(null)} className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white rounded-full p-1"><X className="h-4 w-4 text-emerald-900" /></button>
          <Link href={`/communities/${selectedCommunity.slug}`} className="block">
            <div className="aspect-[16/9] bg-emerald-50"><img src={selectedCommunity.image} alt={selectedCommunity.name} className="w-full h-full object-cover" /></div>
            <div className="p-4">
              <div className="text-xs uppercase tracking-wider text-amber-700">Community</div>
              <div className="font-serif text-xl text-[#062840]">{selectedCommunity.name}</div>
              <div className="text-xs text-emerald-900/70 mt-1">{selectedCommunity.priceRange}</div>
              <div className="text-[10px] text-emerald-900/50 mt-1">Illustrative range from public sources; verify with a licensed Arizona real estate professional.</div>
              <p className="text-xs text-emerald-900/70 mt-2 line-clamp-2">{selectedCommunity.tagline}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
