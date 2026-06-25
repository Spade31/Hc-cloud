import * as pulumi from "@pulumi/pulumi";
import * as hcloud from "@pulumi/hcloud";

const networkZone = new pulumi.Config().get("networkZone") || "eu-central";
const token = new pulumi.Config("hcloud").requireSecret("token");

export const provider = new hcloud.Provider("hcloud", { token });

export const network = new hcloud.Network("main-network", {
    name: "main-network",
    ipRange: "10.0.0.0/16",
}, { provider });

const networkId = network.id.apply(id => parseInt(id, 10));

const subnet = (name: string, ipRange: string) =>
    new hcloud.NetworkSubnet(name, {
        networkId,
        type: "cloud",
        networkZone,
        ipRange,
    }, { provider });

export const publicSubnet  = subnet("public-subnet",  "10.0.1.0/24");
export const privateSubnet = subnet("private-subnet", "10.0.2.0/24");
