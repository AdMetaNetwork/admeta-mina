import browser from "webextension-polyfill";
import * as U from '@/utils'
import { ethers, BigNumber } from 'ethers'
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

class Background {

  // contract
  private contract: ethers.Contract | undefined

  // whiteList
  private whiteList: U.T.Domains[] = U.W.default.products

  constructor() { }

  async init() {
    // Listen extension install
    this.listenInstall()

    // Listen msg from web app
    this.listenMessagesFromWeb()

    // Get contract address and abi
    const { address, abi } = await this.getEvmContractInfo()

    // Connect EVM contract
    this.connectEvmContract(address, abi)

    // Listen for tab change
    this.listenTabChange();

    // Listen for tab update
    this.listenTabUpdate();

  }

  listenInstall() {
    browser.runtime.onInstalled.addListener((message) => {
      if (message.reason === 'install') {
        // Init stroage
        this.initStorage()

        // Go web app
        U.H.goOrigin()
      }
    })
  }

  initStorage() {
    const categories = U.W.default.categories;
    const defaultScore = categories.reduce((acc, currentValue) => {
      acc[currentValue] = 0;
      return acc;
    }, {} as { [key: string]: number });
    browser.storage.local.set({ agree: 0, score: defaultScore })
  }

  async getEvmContractInfo() {
    const { abi, address } = await U.H.apiCall({
      URI: `admeta/getContractVersion`,
      full_url: false,
      method: 'POST',
      params: {}
    })

    return { abi, address }
  }

  connectEvmContract(address: any, abi: any) {
    const provider = new ethers.providers.JsonRpcProvider(U.C.RPC);
    const w = ethers.Wallet.fromMnemonic(U.C.TEST_ACCOUNT);
    const p = w.privateKey;
    const wallet = new ethers.Wallet(p, provider);
    this.contract = new ethers.Contract(address, abi, wallet)
  }

  listenMessagesFromWeb() {
    browser.runtime.onMessage.addListener((message, sender) => {
      const { type, data } = message;
      this.handleDealMessages(type, data)
    });
  }

  saveAccount(EVMAddress: string, minaAddress: string) {
    browser.storage.local.set({ EVMAddress, minaAddress })
  }

  saveDevelopAddress(deploy_address: string) {
    browser.storage.local.set({ deploy_address })
  }

  deleteLocalScore() {
    const categories = U.W.default.categories;
    const defaultScore = categories.reduce((acc, currentValue) => {
      acc[currentValue] = 0;
      return acc;
    }, {} as { [key: string]: number });
    browser.storage.local.set({ score: defaultScore })
  }

  async handleDealMessages(type: string, data: any) {
    switch (type) {
      case U.C.ADMETA_MSG_ACCOUNT:
        this.saveAccount(data.EVMAddress, data.minaAddress)
        break;
      case U.C.ADMETA_MSG_SYNC_DATA:
        const tabid = await U.H.goOriginId()
        if (tabid) {
          const { score } = await browser.storage.local.get(['score'])
          U.Messenger.sendMessageToContentScript(tabid, U.C.ADMETA_MSG_SYNC_DATA_BACK, score)
        }
        break;
      case U.C.ADMETA_MSG_UPDATE_SUCCESS:
        this.deleteLocalScore()
        break;
      case U.C.ADMETA_MSG_MINA_DEVELOP_ADDRESS:
        this.saveDevelopAddress(data.deploy_address)
        break;

      default:
        break;
    }
  }

  syncMinaScore(data: any) {
    browser.storage.local.set({ chainScore: data })
  }

  listenTabChange() {
    browser.tabs.onActivated.addListener((l) => {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then((activeTab) => {
          const isIn = U.H.isInWhiteList(this.whiteList, activeTab[0].url || '-1')
          if (isIn) {
            this.reportBroswer(activeTab[0])
          }
        });
    });
  }

  listenTabUpdate() {
    browser.tabs.onUpdated.addListener(
      async (tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete') {
          this.searchKeyWordAd(tabId, tab)
          const isIn = U.H.isInWhiteList(this.whiteList, tab.url || '-1')
          if (isIn) {
            this.reportBroswer(tab)
          }
        }
      }
    );
  }

  async searchKeyWordAd(tabId: number, tab: browser.Tabs.Tab) {
    const q = U.H.getBroswerSearch(tab.url || '');

    switch (q) {
      case 'web3go':
      case 'ai':
        this.callEVM(tabId, 6);
        break;
      case 'did':
      case 'litentry':
        this.callEVM(tabId, 5);
        break;
      default:
        break;
    }
  }

  async getChainScore(deploy_address: string) {
    if (!deploy_address) return;

    const GET_DATA = gql`
        query {
          account(publicKey: "${deploy_address}") {
            zkappState
          }
        }
    `;

    const endpoint = 'https://proxy.berkeley.minaexplorer.com/graphql';

    const client = new ApolloClient({
      link: new HttpLink({
        uri: endpoint,
      }),
      cache: new InMemoryCache(),
    });

    const { data } = await client.query({
      query: GET_DATA,
    });

    const zkappState = data.account.zkappState.slice(0, 7);

    const chainScore: { [key: string]: number } = {};
    U.W.default.categories.forEach((category) => {
      chainScore[category] = 0;
    });

    Object.keys(chainScore).forEach((key, index) => {
      if (index < zkappState.length) {
        chainScore[key] = +zkappState[index];
      }
    });

    return chainScore
  }

  private async callEVM(tabId: number, tag: number = 0) {
    const { EVMAddress, deploy_address } = await browser.storage.local.get(['EVMAddress', 'deploy_address'])

    const chainScore = await this.getChainScore(deploy_address)

    // Score less than 100 does not match 
    if ((tag === 5 && +chainScore!.DID < 100) || (tag === 6 && +chainScore!.AI < 100)) {
      return;
    }

    const matchIndex = await this.contract?.matchAd(BigNumber.from(tag), EVMAddress)
    console.log(matchIndex)
    this.contract?.adInfo(matchIndex).then((b: any) => {
      const message = {
        callbackLink: b[6],
        metadata: b[4],
        id: b[0].toNumber(),
        address: b[1],
        tag
      }
      U.Messenger.sendMessageToContentScript(
        tabId,
        U.C.ADMETA_MSG_AD_PUSH,
        { message, address: EVMAddress }
      );
    })
  }

  private reportBroswer(tab: any) {
    if (!this.whiteList.length) {
      return
    }
    const idx = U.H.currentDomainIdx(this.whiteList, tab.url || '-1')
    const timer = setTimeout(async () => {
      clearTimeout(timer)

      console.log('report', idx, this.whiteList[idx].category)
      const categorys = this.whiteList[idx].category
      const { score } = await browser.storage.local.get(['score'])
      categorys.forEach((item) => {
        score[item] += 50
      })

      await browser.storage.local.set({ score: { ...score } })
    }, U.C.REPORTING_TIME)
  }
}

new Background().init()