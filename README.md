# AdMeta x Mina
AdMeta emphasizes user privacy, seamlessly integrating Mina's discreet user tagging with EVM's ad publishing, and rewards engagement while maintaining data integrity across platforms.

# Project Introduction
AdMeta provides four integrated programs — Dapp Extension, EVM Contract, and Mina Contract — to establish a complete closed-loop project:

- Users install the AdMeta Extension and consent to the agreement.
- This leads to an automatic redirection to the Dapp, where linking Metamask and Auro wallets enables the homepage display within the Extension.
- As users navigate whitelisted websites, the Extension calculates local scores based on their activities.
- To update scores on Mina, users must first deploy a Mina contract. Successful deployment is followed by setting a verification address provided by AdMeta.
- For updating scores on Mina, users must load data from the Extension, sign it using the private key of the verification address after hashing, and then invoke the Mina contract.
- The Mina contract utilizes state as a label to store user scores. Score updates require verification through the verification address to ensure success.
- When searching in Chrome, the Extension evaluates the search terms. If criteria are met, it calls the Mina contract for the stored scores. Upon satisfying the score conditions, it invokes the EVM contract to align users with targeted ads.
- Clicking an ad takes users directly to the designated ad page. Upon completing the advertiser's interactive tasks and passing verification, users receive rewards for the ad completion.

# Mina Contract Deployed
The address where the contract was successfully deployed on the Mina testnet Berkeley: `B62qjzGGBGanxd64yt1HANGUsoHuAMSyJVEyD3uuJh8BomrLdaWfeYh`

[MinaScan](https://minascan.io/berkeley/account/B62qjzGGBGanxd64yt1HANGUsoHuAMSyJVEyD3uuJh8BomrLdaWfeYh/zkApp?type=zk-acc)

# Online experience address
[AdMeta x Mina](https://mina.admeta.network/)


# Project Video
[![Demo Video](https://img.youtube.com/vi/DTSoZLiz3HM/hqdefault.jpg)](https://www.youtube.com/watch?v=DTSoZLiz3HM)


# Software Engineering Architecture Diagram
![AdMeta Product](./img/admeta_mina.jpg)

# AdMeta x Mina Dapp Tutorial

## 1. Building the Mina Contract
Navigate to the mina-contract directory and compile the contract:
```sh
cd mina-contract
yarn 
yarn build
```
A `build_mina` directory will appear in the root folder after a successful build.

## 2. Running the Dapp
Start the Dapp on your local server:
```sh
cd dapp/
yarn 
yarn dev
```
Visit `http://localhost:3000` to view the Dapp in your browser.
Remember to move the build_mina directory from the mina-contract build to the root directory of the Dapp.

![Home Page](./img/home-page.png)

## 3. Setting Up the AdMeta Extension
To install the extension:
```sh
cd extension/
yarn
yarn build
```
Load the extension in Chrome from `chrome://extensions/` using the dist folder.

## 4. Deploying the Mina Contract
Access the Dapp at `http://localhost:3000`, connect your wallet, and navigate to the deployment section.

![Deploy Page](./img/deploy-page.png)

- Generate a Mina deployment address.
- Import your private key into your Auro wallet.
- Obtain tokens from the faucet to cover deployment costs.
- Use your Auro wallet to deploy the contract.
- Set the verification address; it's crucial for authenticating transactions within the contract.

## 5. Earning Scores
Earn points by visiting whitelisted domains:
  - `uniswap.org` for the "Defi" tag.
  - `litentry.com` for the "DID" tag.
  - `web3go.xyz` for the "AI" tag.
  - And more...

## 6. Monitoring Score Changes
Your local score changes will be visible within the AdMeta Extension.

![Home Page](./img/extension-home-2.png)

## 7. Generating Zero-Knowledge Proofs
On the Dapp's ZK-Proof page, load the proof data from the extension, generate trusted ZK data, and upload your updated scores to the Mina blockchain.

![ZK Proof Page](./img/zk-proof-page.png)
  - Load proof data from extension
  - Generate zk trusted data
  - Upload updated scores to the Mina blockchain

## 8. Checking the Dashboard
The Dashboard page will reflect your updated score.

![Dashboard Page](./img/dashboard-page.png)
  - score updated!

## 9. Engaging with Ads
Search for "ai" on Google and interact with the ads that appear.

![Show Ad](./img/show-ad-card.png)

## 10. Completing Ad Tasks
Click on the ad card to go to the task page and complete the advertiser's interactive task.

![Ad Task](./img/ad-task.png)

## 11. Claiming Rewards
After completing the task, verify the completion and claim your rewards through the wallet connection.
  - Connect wallet
  - Go task link
  - Verify ad complete
  - Claim rewards

# Milestone
- Milestone 0: Design a Domain Model with a Focus on Mina zk Privacy.
- Develop a privacy-focused domain model leveraging Mina's zero-knowledge proofs for secure and confidential score storage.

- Milestone 1: Build a Mina zk Privacy Chain Contract for Score Management.
Create a Mina contract for managing user scores, ensuring privacy and security through zero-knowledge proofs.

- Milestone 2: Develop and Integrate Unit Tests for the Mina Contract.
Ensure the integrity and functionality of privacy features and score handling through comprehensive unit testing of the Mina contract.

- Milestone 3: Integrate EVM Contract for Ad Storage and Matching.
Incorporate EVM Contracts for storing advertisements and executing ad matching based on user scores from the Mina blockchain.

- Milestone 4: Implement Ad Interaction Workflow with Reward Mechanism.
Develop a workflow where users interact with matched ads and complete tasks, receiving rewards processed through EVM Contracts.

- Milestone 5: Document the Privacy-Centric System and Ad Matching Logic.
Produce extensive documentation detailing the Mina zk privacy contract, EVM ad matching process, and the entire system workflow.

- Milestone 6: Conduct End-to-End Testing Emphasizing Privacy and Rewards.
Execute rigorous end-to-end testing focusing on the system's privacy-preserving features and the EVM contract's reward distribution mechanisms.

- Bonus Milestone: Cross-Chain Interaction and Advanced Advertising Mechanics.
Achieve a major technical and product development by facilitating cross-chain interactions between Mina and EVM blockchains, which enhances the advertising model with complex score calculations, precise ad matching, and a comprehensive reward system.

# Dapp Screenshot
![Home Page](./img/home-page.png)

![Deploy Page](./img/deploy-page.png)

![ZK Proof Page](./img/zk-proof-page.png)

![Dashboard Page](./img/dashboard-page.png)

# Extension Screenshot
![Agree Page](./img/extension-agree.png)

![Home Page](./img/extension-home-1.png)

![Home Page](./img/extension-home-2.png)

# Future
Mina bridge to EVM

# License
Apache 2.0
