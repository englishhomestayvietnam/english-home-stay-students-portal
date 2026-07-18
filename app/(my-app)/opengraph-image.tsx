import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'English Homestay';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', fontSize: 120, fontWeight: 800, letterSpacing: '-0.02em', color: '#0b0c0b' }}>
          English<span style={{ color: '#09a86f' }}>Homestay</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
