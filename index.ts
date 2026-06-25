import { network } from "./network";
import { bastionIp, appServerPrivateIp } from "./servers";

export const networkId = network.id;
export const bastionPublicIp = bastionIp;
export const appPrivateIp = appServerPrivateIp;