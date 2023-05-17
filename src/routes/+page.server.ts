import { SECRET_BLOCKFROST_PROJECT_ID } from '$env/static/private';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals }) => {
    const project_id = SECRET_BLOCKFROST_PROJECT_ID;

    const latestEpoch: EpochData = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/epochs/latest', {
        headers: {
            project_id: project_id
        }
    }).then((res) => res.json());

    const allEpochs: EpochData[] = [];
    return {
        latestEpoch,
    };
};
