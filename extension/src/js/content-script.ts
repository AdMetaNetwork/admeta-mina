import browser from 'webextension-polyfill'
import * as U from '@/utils'
import { pushAdCard, completeLitBtn, completeWeb3GoBtn } from './ui'
class ContentScript {

  constructor() { }

  init() {
    // Listen for messages from background and run the listener from the map
    this.listenMessagesFromBackground();

    this.listenWebPageMessages()

    this.listenWebPageScrollBottom()
  }

  listenMessagesFromBackground() {
    browser.runtime.onMessage.addListener((message, sender) => {
      const { type, data } = message;
      this.handleDealMessages(type, data)
    });
  }

  handleDealMessages(type: string, data: any) {
    switch (type) {
      case U.C.ADMETA_MSG_ACCOUNT:
        U.Messenger.sendMessageToBackground(U.C.ADMETA_MSG_ACCOUNT, data)
        break;
      case U.C.ADMETA_MSG_SYNC_DATA:
        U.Messenger.sendMessageToBackground(U.C.ADMETA_MSG_SYNC_DATA, data)
        break;
      case U.C.ADMETA_MSG_SYNC_DATA_BACK:
        window.postMessage({ type: U.C.ADMETA_MSG_SYNC_DATA_BACK, data }, '*');
        break;
      case U.C.ADMETA_MSG_UPDATE_SUCCESS:
        U.Messenger.sendMessageToBackground(U.C.ADMETA_MSG_UPDATE_SUCCESS, data)
        break;
      case U.C.ADMETA_MSG_AD_PUSH:
        pushAdCard(data.message.callbackLink.includes('youtube') ? 'VIDEO' : 'PICTURE', data.message.callbackLink, data.message.metadata, data.message.id, data.address)
        break;
      case U.C.ADMETA_MSG_MINA_DEVELOP_ADDRESS:
        U.Messenger.sendMessageToBackground(U.C.ADMETA_MSG_MINA_DEVELOP_ADDRESS, data)
        break;

      default:
        break;
    }
  }

  listenWebPageMessages() {
    window.addEventListener("message", function (msg) {
      U.Messenger.sendMessageToBackground(msg.data.type, msg.data.data)
    })
  }

  listenWebPageScrollBottom() {
    const url = location.href
    if (url.includes('litentry.com')) {
      completeLitBtn()
    }
    if (url.includes('web3go.xyz')) {
      completeWeb3GoBtn()
    }
    
  }

}

new ContentScript().init()