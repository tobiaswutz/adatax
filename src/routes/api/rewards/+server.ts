export function GET() {
	const number = Math.floor(Math.random() * 6) + 1;

	return new Response(
		JSON.stringify({
			number,
			message: `You rolled a ${number}`
		}),
		{
			headers: {
				'content-type': 'application/json;charset=UTF-8'
			}
		}
	);
}
