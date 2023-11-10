# AdMeta Dapp Tutorial

TL;DR The following steps walk you through the whole process of how AdMeta works together with Mina Berkeley testnet and Ethereum Testnet, and it requires you to have both wallets from these two testnets and sufficient balances. If you just want to understand how it works, this video demonstrates it in a clear way:
[![Demo Video](https://img.youtube.com/vi/DTSoZLiz3HM/hqdefault.jpg)](https://www.youtube.com/watch?v=DTSoZLiz3HM)

## 1. Running the Dapp

Start the Dapp on your local server:
Visit `https://mina.admeta.network/` to view the Dapp in your browser.
Remember to move the build_mina directory from the mina-contract build to the root directory of the Dapp.

![Home Page](https://github.com/AdMetaNetwork/admeta-mina/blob/main/img/home-page.png?raw=true)

## 2. Setting Up the AdMeta Extension

To install the extension:

```sh
cd extension/
yarn
yarn build
```

Load the extension in Chrome from `chrome://extensions/` using the dist folder.

## 3. Deploying the Mina Contract

Access the Dapp at `https://mina.admeta.network/`, connect your wallet, and navigate to the deployment section.

![Deploy Page](https://github.com/AdMetaNetwork/admeta-mina/blob/main/img/deploy-page.png?raw=true)

- Generate a Mina deployment address.
- Import your private key into your Auro wallet.
- Obtain tokens from the faucet to cover deployment costs.
- Use your Auro wallet to deploy the contract.
- Set the verification address; it's crucial for authenticating transactions within the contract.

## 4. Earning Scores

Earn points by visiting whitelisted domains:

- `uniswap.org` for the "Defi" tag.
- `litentry.com` for the "DID" tag.
- `web3go.xyz` for the "AI" tag.
- And more...

## 5. Monitoring Score Changes

Your local score changes will be visible within the AdMeta Extension.

![Home Page](https://github.com/AdMetaNetwork/admeta-mina/blob/main/img/extension-home-2.png?raw=true)

## 6. Generating Zero-Knowledge Proofs

On the Dapp's ZK-Proof page, load the proof data from the extension, generate trusted ZK data, and upload your updated scores to the Mina blockchain.

![ZK Proof Page](https://github.com/AdMetaNetwork/admeta-mina/blob/main/img/zk-proof-page.png?raw=true)

- Load proof data from extension
- Generate zk trusted data
- Upload updated scores to the Mina blockchain

## 7. Checking the Dashboard

The Dashboard page will reflect your updated score.

![Dashboard Page](https://github.com/AdMetaNetwork/admeta-mina/blob/main/img/dashboard-page.png?raw=true)

- score updated!

## 8. Engaging with Ads

Search for "ai" on Google and interact with the ads that appear.

![Show Ad](https://github.com/AdMetaNetwork/admeta-mina/blob/main/img/show-ad-card.png?raw=true)

## 9. Completing Ad Tasks

Click on the ad card to go to the task page and complete the advertiser's interactive task.

![Ad Task](https://github.com/AdMetaNetwork/admeta-mina/blob/main/img/ad-task.png?raw=true)

## 10. Claiming Rewards

After completing the task, verify the completion and claim your rewards through the wallet connection.

- Connect wallet
- Go task link
- Verify ad complete
- Claim rewards
