import browser from "webextension-polyfill";
import * as U from '@/utils'
import { ethers } from 'ethers'

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

      default:
        break;
    }
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

  async searchKeyWordAd(tabId: number, tab: browser.Tabs.Tab) { }

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