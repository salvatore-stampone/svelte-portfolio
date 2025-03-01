import { Resvg } from '@resvg/resvg-js';
import type { RequestHandler } from '@sveltejs/kit';
import satori from 'satori';

const fontRegular = await fetch(
	'https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&display=display=swap'
).then((res) => res.arrayBuffer());

export const GET: RequestHandler = async () => {
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'flex-start',
					paddingTop: '80px',
					backgroundImage: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
					color: 'white',
					fontFamily: 'Hedvig Letters Serif'
				},
				children: [
					{
						type: 'div',
						props: {
							style: { fontSize: 100, marginBottom: 20 },
							children: '👋'
						}
					},
					{
						type: 'div',
						props: {
							style: {
								fontSize: 60,
								fontWeight: 700,
								letterSpacing: '-0.05em',
								marginBottom: 20,
								textAlign: 'center'
							},
							children: 'Salvatore Stampone'
						}
					},
					{
						type: 'div',
						props: {
							style: {
								fontSize: 30,
								background: 'rgba(255,255,255,0.1)',
								padding: '10px 20px',
								borderRadius: 10,
								textAlign: 'center'
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
					name: 'Hedvig Letters Serif',
					data: fontRegular,
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
