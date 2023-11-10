# AdMeta Protocol

AdMeta is a ZK-based Web3 advertising protocol, completely designed and customized for Web3.

Based on users' on-chain and off-chain behaviors, AdMeta helps Web3 projects acquire users and promote their products in a decentralized way.

AdMeta emphasizes user privacy, seamlessly integrating Mina's discreet user tagging with EVM's ad publishing, and rewards engagement while maintaining data integrity across platforms.

# Problem Statement

Current issues in Web3 marketing topics:

Web3 start-ups/companies: They want to promote their products and services, especially in the early stages. However, there are not many ways to do this at the moment. A typical Web3 marketing strategy is to build a community of users on Telegram and Discord, which is maintained by marketing experts. This is typically time and human resource intensive and inflexible for shifts in marketing strategy, inefficient, and marketing performance metrics, such as conversion rates, are difficult to analyze. Existing digital advertising platforms, such as Google Ads, are only for general advertising and do not specifically serve the various niche markets of Web3. A Web3 native advertising platform can solve most of the problems.

Web3 users: In the background of privacy concerns of tech giants, not only Web3 users but also ordinary internet users are increasingly concerned about privacy issues. Even though they promise not to use these data for other purposes without users' consent, there are still exceptions, such as lengthy agreement terms that no one reads but must agree to, data leakage from centralized databases, behind-the-scenes data misuse, etc. With ZK-based solutions, we can guarantee no data misuse and leakage through cryptographic algorithms. In addition, unlike traditional ad services where advertisers pay the platform for advertising, AdMeta's advertising fees are paid directly to users, and the platform only takes a small portion as commission. The percentage of the fee model is managed in a decentralized way and is controlled by all users rather than the platform owner.

# Solution

AdMeta allows advertisers to propose ads with specific tasks or acceptance rules, for example, connecting their wallets, following official Twitters, or completing NFT purchases in certain collections. Advertisers can also specify groups of users as target audiences to maximize conversion rates. Because all of this happens on the blockchain, all data, including conversion rates and other marketing KPIs, are transparent and traceable.

For users, they don't need to worry about any privacy issues due to the use of ZK. All data related to advertising is done on the local browser and is not exposed elsewhere. In this way, users can put the ownership of their data back into their hands and can profit from their data without compromising any privacy.

# Products and Workflow

AdMeta provides four integrated programs — Dapp Extension, EVM Contract, and Mina Contract — to establish a complete closed-loop project:

- Users install the AdMeta Extension and consent to the agreement.
- This leads to an automatic redirection to the Dapp, where linking Metamask and Auro wallets enables the homepage display within the Extension.
- As users navigate whitelisted websites, the Extension calculates local scores based on their activities.
- To update scores on Mina, users must first deploy a Mina contract. Successful deployment is followed by setting a verification address provided by AdMeta.
- For updating scores on Mina, users must load data from the Extension, sign it using the private key of the verification address after hashing, and then invoke the Mina contract.
- The Mina contract utilizes state as a label to store user scores. Score updates require verification through the verification address to ensure success.
- When searching in Chrome, the Extension evaluates the search terms. If criteria are met, it calls the Mina contract for the stored scores. Upon satisfying the score conditions, it invokes the EVM contract to align users with targeted ads.
- Clicking an ad takes users directly to the designated ad page. Upon completing the advertiser's interactive tasks and passing verification, users receive rewards for the ad completion.
