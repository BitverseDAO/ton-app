import { toNano } from '@ton/core';
import { PointExchange } from '../wrappers/PointExchange';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const pointExchange = provider.open(
        PointExchange.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('PointExchange')
        )
    );

    await pointExchange.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(pointExchange.address);

    console.log('ID', await pointExchange.getID());
}
