import { heading, OnCronjobHandler, OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            heading('AAVE Pools notification'),
            text('High Risk'),
            text('**Network**: Ethereum Mainnet'),
            text('You received this alert because this attack may interact with contract you subscribed to: **Aave WETH V3**'),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  try {
    switch (request.method) {
      case 'getPools':
        // snap.request({
        //   method: 'snap_notify',
        //   params: {
        //     type: 'inApp',
        //     message: ,
        //   },
        // });

      default:
      // throw new Error('Snap: Method not found.');
    }
  } catch (error) {
    console.log(error);
  }
};
