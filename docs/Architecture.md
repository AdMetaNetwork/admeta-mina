# AdMeta Architecture

AdMeta created a browser extension to integrate with the Mina zkApp framework. The browser extension allows users to opt-in to a privacy-preserving ad service. The service, which runs only on the user's browser, calculates and converts the user's browsing behavior into a score for each category. The calculation of these scores also takes into account on-chain behavior. For example, 2 hours of GameFi play + 2 relevant transactions are considered 10 GameFi points, while 30 minutes of DeFi browsing + 2 days of farming are considered 5 DeFi points. These scores are used for users to gain levels in each Web3 niche, such as DeFi, GameFi, which are used for later advertising categories. The score-based levels are designed to be used in different categories and for each level a user achieves, a ZK proof needs to be generated as a certificate received by that user.

On the other hand, advertisers are able to publish ads with selected groups of users (e.g. DeFi Level 2 and above) as their target audience segment. Thanks to ZKP, qualified users can receive certain advertisements without compromising their privacy at all. Users can enable this advertising service in a hassle-free manner and receive rewards once they complete the advertising tasks provided by advertisers.

![AdMeta Product](https://github.com/AdMetaNetwork/admeta-mina/blob/main/img/admeta_mina.jpg?raw=true)