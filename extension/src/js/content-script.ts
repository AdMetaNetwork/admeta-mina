import browser from 'webextension-polyfill'
import * as U from '@/utils'
class ContentScript {

  constructor() { }

  init() {
    // Listen for messages from background and run the listener from the map
    this.listenMessagesFromBackground();

    this.listenWebPageMessages()
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

      default:
        break;
    }
  }

  listenWebPageMessages() {
    window.addEventListener("message", function (msg) {
      U.Messenger.sendMessageToBackground(msg.data.type, msg.data.data)
    })
  }

}

new ContentScript().init()