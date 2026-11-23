/* eslint-disable react/jsx-key */
import { ImageResponse } from 'next/og';

export const alt = 'Scottsdale Golf Lifestyle';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function og() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        background: 'linear-gradient(135deg, #062840 0%, #143832 60%, #062840 100%)',
        color: '#fcecc4', fontFamily: 'serif', padding: 80
      }}>
        <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg,#e5cdb6,#BA9273)', color: '#062840', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, fontWeight: 700, marginBottom: 30 }}>S</div>
        <div style={{ fontSize: 76, textAlign: 'center', lineHeight: 1.05, marginBottom: 14 }}>Scottsdale Golf Lifestyle</div>
        <div style={{ fontSize: 26, color: '#e5cdb6', letterSpacing: 8, textTransform: 'uppercase' }}>Luxury · Scottsdale · Arizona</div>
        <div style={{ fontSize: 22, color: '#cfe6dd', marginTop: 30, textAlign: 'center', maxWidth: 800 }}>Grayhawk · DC Ranch · Troon North · Silverleaf · Desert Mountain</div>
      </div>
    ),
    { ...size }
  );
}
