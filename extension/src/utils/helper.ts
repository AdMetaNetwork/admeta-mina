import browser from 'webextension-polyfill'
import * as C from './constant'
import * as T from './types'

export const formatAddress = (address: string | undefined | null): string => {
  if (!address) {
    return ''
  }
  const str_1 = address.substring(0, 5)
  const str_2 = address.substring(address.length - 6)
  return `${str_1}......${str_2}`
}

export const goOrigin = async () => {
  const tabs = await browser.tabs.query({});
  const origin = new URL(C.LINK_HTTP).host;

  const matchingTab = tabs.find(item => new URL(item.url!).host === origin);

  if (matchingTab) {
    browser.tabs.update(matchingTab.id, { active: true });
  } else {
    browser.tabs.create({ url: C.LINK_HTTP });
  }
}

export const goOriginId = async () => {
  const tabs = await browser.tabs.query({});
  const origin = new URL(C.LINK_HTTP).host;

  const matchingTab = tabs.find(item => new URL(item.url!).host === origin);

  return matchingTab ? matchingTab.id : undefined;
}

const handleGetParams = (p: any) => {
  let u = ''
  Object.keys(p).forEach((key) => {
    console.log(key, p[key])
    u += `${key}=${p[key]}&`
  })
  u = u.substr(0, u.length - 1);

  return u
}

export const apiCall = (apiInfo: T.ApiInfo<T.Params>): Promise<any> => {
  let url = apiInfo.full_url ? apiInfo.URI : C.API + apiInfo.URI;
  const req: T.RequestReq<any, any> = {
    method: apiInfo.method,
    headers: {
      'Content-Type': apiInfo.content_type || 'application/json',
    },
  };

  switch (apiInfo.method) {
    case 'GET':
      if (apiInfo.params) {
        url = url.concat('?', handleGetParams(apiInfo.params));
      }
      break;
    case 'POST':
      req.body = JSON.stringify(apiInfo.params);
      break;
  }
  return new Promise((resolve, reject) => {
    fetch(url, req).then((v) => {
      resolve(v.json())
    }).catch((e) => {
      reject(e)
    })
  })
}

export const isInWhiteList = (whiteList: T.Domains[], url: string) => {
  return whiteList.some((v) => {
    return url.includes(v.name.toLowerCase())
  })
}

export const currentDomainIdx = (whiteList: T.Domains[], url: string) => {
  return whiteList.findIndex((v) => {
    return url.includes(v.name.toLowerCase())
  })
}

const getQueryVariable = (variable: string, url: string) => {
  const searchParams = new URLSearchParams(new URL(url).search);
  return searchParams.get(variable) || '';
};

export const getBroswerSearch = (url: string) => {
  // Google Bing Duckduckgo
  if (url.includes('google') || url.includes('bing') || url.includes('duckduckgo')) {
    return getQueryVariable('q', url)
  }

  // Baidu
  if (url.includes('baidu')) {
    return getQueryVariable('wd', url)
  }

  return ''
}

export const getUrlParameter = (name: string) => {
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(window.location.href);
  if (!results) return null;
  const parameterValue = results[2] || "";
  return decodeURIComponent(parameterValue.replace(/\+/g, " "));
}
