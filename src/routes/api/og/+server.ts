import { Resvg } from '@resvg/resvg-js';
import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { join } from 'path';
import satori from 'satori';

// Carica il font Inter come fallback
const interRegular = readFileSync(join(process.cwd(), 'static', 'fonts', 'Inter-Regular.ttf'));

export const GET: RequestHandler = async () => {
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					display: 'flex',
					height: '100%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					backgroundImage: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
					fontSize: 60,
					letterSpacing: -2,
					fontWeight: 700,
					textAlign: 'center',
					color: 'white',
					fontFamily: 'Inter'
				},
				children: [
					{
						type: 'div',
						props: {
							style: { fontSize: 100 },
							children: '👋'
						}
					},
					{
						type: 'div',
						props: {
							style: { marginTop: 20 },
							children: 'Salvatore Stampone'
						}
					},
					{
						type: 'div',
						props: {
							style: {
								fontSize: 30,
								marginTop: 20,
								background: 'rgba(255,255,255,0.1)',
								padding: '10px 20px',
								borderRadius: 10
							},
							children: 'Developer • YouTuber • Writer'
						}
					}
				]
			}
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Inter',
					data: interRegular,
					weight: 400,
					style: 'normal'
				}
			]
		}
	);

	const resvg = new Resvg(svg);
	const pngData = resvg.render();
	const png = pngData.asPng();

	return new Response(png, {
		headers: {
			'content-type': 'image/png',
			'cache-control': 'public, max-age=31536000, immutable'
		}
	});
};
