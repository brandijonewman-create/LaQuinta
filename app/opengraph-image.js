import { ImageResponse } from 'next/og';
import { site } from '@/lib/site-config';

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1F3A2E 0%, #2D5142 100%)',
          padding: '80px',
          color: '#FAF6EE',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 30% 20%, rgba(200,162,74,0.18), transparent 50%), radial-gradient(circle at 75% 80%, rgba(180,93,60,0.20), transparent 55%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            fontSize: 22,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#C8A24A',
          }}
        >
          <div style={{ width: 60, height: 2, background: '#C8A24A' }} />
          <span>La Quinta, California</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 40,
          }}
        >
          <div style={{ fontSize: 96, lineHeight: 1.02, fontWeight: 500 }}>
            {site.name}
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 32,
              color: '#FAF6EE',
              opacity: 0.85,
              maxWidth: 880,
              lineHeight: 1.3,
              fontFamily: 'sans-serif',
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#C8A24A',
              opacity: 0.9,
            }}
          >
            7671 Enterprises LLC · Owner &amp; Operator
          </div>
          <div style={{ fontSize: 18, color: '#FAF6EE', opacity: 0.7 }}>
            {site.domain}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
