import { APP_ICON_URL, APP_NAME, PUSH_NOTIFICATIONS_ENV, PUSH_PK } from "./constants";
import * as ethers from "ethers";
import * as PushAPI from "@pushprotocol/restapi"
import { abbreviate } from ".";


const createUser = address => `eip155:5:${address}`


export const fetchNotifications = async (address) => {
  const user = createUser(address);
  const notifications = await PushAPI.user.getFeeds({
    user,
    env: PUSH_NOTIFICATIONS_ENV
  });

  console.log('Notifications: \n', user, notifications);
  return (notifications || []).filter(n => n.title)
}


// https://docs.push.org/developers/developer-guides/sending-notifications/using-epns-sdk-gasless
export const sendPush = async (ownerAddress, boardId, boardName, ticketName) => {
  if (!PUSH_PK) {
    console.error('Skipping notification - No push private key found')
    return;
  }

  const notification = {
    title: `${abbreviate(boardName, 40)}`,
    body: `New request: ${abbreviate(ticketName, 100)}`
  }
  const key = PUSH_PK;
  // Step 1: Convert the private key to a Uint8Array
  // Convert the private key to a Uint8Array

  // Create a new wallet with the private key
  // const privateKeyBytes = ethers.utils.arrayify(key);

  // Create a new wallet from the private key bytes
  const wallet = new ethers.Wallet(key);

  console.log(wallet.address);

  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: wallet,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification,
      payload: {
        ...notification,
        cta: '',
        boardId,
        img: APP_ICON_URL,
      },
      channel: createUser(ownerAddress),
      env: PUSH_NOTIFICATIONS_ENV
    });
    console.log('push response', apiResponse)
  } catch (err) {
    console.error('Error: ', err);
  }
}