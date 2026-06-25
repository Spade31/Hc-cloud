
import * as pulumi from "@pulumi/pulumi";
import * as hcloud from "@pulumi/hcloud";
import { provider, network, publicSubnet, privateSubnet } from "./network";

const config = new pulumi.Config();
const serverType = config.get("serverType") || "cx22";

const bastion = new hcloud.Server("bastion", {
    name: "bastion",
    serverType,
    image: "ubuntu-24.04",
    publicNets: [{ ipv4Enabled: true, ipv6Enabled: false }],
    networks: [{
        networkId: network.id.apply(id => parseInt(id, 10)),
        ip: "10.0.1.10",
    }],
}, { provider, dependsOn: [publicSubnet] });

const appServer = new hcloud.Server("app-server", {
    name: "app-server",
    serverType,
    image: "ubuntu-24.04",
    publicNets: [{ ipv4Enabled: false, ipv6Enabled: false }],
    networks: [{
        networkId: network.id.apply(id => parseInt(id, 10)),
        ip: "10.0.2.10",
    }],
}, { provider, dependsOn: [privateSubnet] });

export const bastionIp = bastion.ipv4Address;
export const appServerPrivateIp = "10.0.2.10";