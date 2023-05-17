import { SECRET_BLOCKFROST_PROJECT_ID } from '$env/static/private'

export async function GET({ url }: { url: URL }) {
  let page = url.searchParams.get('page');
  let latest = url.searchParams.get('latest');


  const project_id = SECRET_BLOCKFROST_PROJECT_ID;

  if (!project_id) {
    return new Response(
      JSON.stringify({
        error: 'BLOCKFROST_PROJECT_ID is not set',
      }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      },
    );
  }

  

	const previousEpochs: EpochData[] = await fetch(`https://cardano-mainnet.blockfrost.io/api/v0/epochs/${latest}/previous?count=100&page=${page}`, {
		headers: {
			project_id: project_id
		}
	}).then((res) => res.json());

  return new Response(
    JSON.stringify(previousEpochs),
    {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    },
  );
}