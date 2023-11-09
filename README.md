### AdMeta x Mina
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


# Project Chart
![AdMeta Product](./img/admeta_mina.jpg)

# Dapp Screenshot
![Home Page](./img/home-page.png)
![Deploy Page](./img/deploy-page.png)
![ZK Proof Page](./img/zk-proof-page.png)
![Dashboard Page](./img/dashboard-page.png)

# Extension Screenshot
![Agree Page](./img/extension-agree.png)
![Home Page](./img/extension-home-1.png)
![Home Page](./img/extension-home-2.png)


# Project Demo Video
[![Demo Video](https://img.youtube.com/vi/DTSoZLiz3HM/hqdefault.jpg)](https://www.youtube.com/watch?v=DTSoZLiz3HM)


# License
Apache 2.0
