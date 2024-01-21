import { heading, OnCronjobHandler, OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';
import { isObject, Json } from "@metamask/utils"

async function getNotification() {
  const response = await fetch(
    `https://aave-snap.vercel.app/api/notifications`
    );
  return response.text();
}

async function getPoolInfo() {
  const response = await fetch(
    `https://aave-snap.vercel.app/api/pools`
    );
  return response.text();
}

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
      return getPoolInfo().then((response) => {
        const { data } = JSON.parse(response)
        return snap.request({
          method: 'snap_dialog',
          params: {
            type: 'confirmation',
            content: panel([
              heading('AAVE Pools Infomations: '),
              text(`Pool: ${data[0].name}`),
              text(`APY: ${data[0].supplyAPY}`),
              text(`IsIsolated: ${data[0].isIsolated}`),
              text('-----------------------------'),
              text(`Pool: ${data[1].name}`),
              text(`APY: ${data[1].supplyAPY}`),
              text(`IsIsolated: ${data[1].isIsolated}`),
              text('-----------------------------'),
              text(`Pool: ${data[2].name}`),
              text(`APY: ${data[2].supplyAPY}`),
              text(`IsIsolated: ${data[2].isIsolated}`),
              text('-----------------------------'),
              text(`Pool: ${data[3].name}`),
              text(`APY: ${data[3].supplyAPY}`),
              text(`IsIsolated: ${data[3].isIsolated}`),
              text('-----------------------------'),
              text(`Pool: ${data[4].name}`),
              text(`APY: ${data[4].supplyAPY}`),
              text(`IsIsolated: ${data[4].isIsolated}`),
              text('-----------------------------'),
              text(`Pool: ${data[5].name}`),
              text(`APY: ${data[5].supplyAPY}`),
              text(`IsIsolated: ${data[5].isIsolated}`),
              text('-----------------------------'),
              text(`Pool: ${data[6].name}`),
              text(`APY: ${data[6].supplyAPY}`),
              text(`IsIsolated: ${data[6].isIsolated}`),
            ]),
          },
        });
      })
    default:
      throw new Error('Method not found.');
  }
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  try {
    switch (request.method) {
      case 'notifyPoolChanged':
        return getNotification().then( response => {
          if(JSON.parse(response).notifications !== "" ) {
            snap.request({
              method: 'snap_notify',
              params: {
                type: 'inApp',
                message: JSON.parse(response).notifications,
              },
            });
          }
        })
      default:
      // throw new Error('Snap: Method not found.');
    }
  } catch (error) {
    console.log(error);
  }
};
