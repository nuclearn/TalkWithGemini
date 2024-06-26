import { create } from 'zustand'
import storage from '@/utils/Storage'
import { detectLanguage } from '@/utils/common'

interface SettingStore extends Setting {
  init: (isProtected: boolean) => Setting
  setPassword: (password: string) => void
  setApiKey: (key: string) => void
  setApiProxy: (url: string) => void
  setLang: (lang: string) => void
  setSTTLang: (lang: string) => void
  setTTSLang: (lang: string) => void
  setTTSVoice: (voice: string) => void
  setTalkMode: (mode: 'chat' | 'voice') => void
  setMaxHistoryLength: (length: number) => void
}

export const useSettingStore = create<SettingStore>((set) => ({
  password: '',
  apiKey: '',
  apiProxy: '',
  sttLang: '',
  ttsLang: '',
  ttsVoice: '',
  lang: '',
  isProtected: false,
  talkMode: 'chat',
  maxHistoryLength: 0,
  init: (isProtected) => {
    const sttLang = storage.get<string>('sttLang')
    const ttsLang = storage.get<string>('ttsLang')
    const ttsVoice = storage.get<string>('ttsVoice')
    const lang = storage.get<string>('lang') || detectLanguage()
    const state: Setting = {
      password: storage.get<string>('password') || '',
      apiKey: storage.get<string>('apiKey') || '',
      apiProxy: storage.get<string>('apiProxy') || 'https://generativelanguage.googleapis.com',
      sttLang: sttLang || lang,
      ttsLang: ttsLang || lang,
      ttsVoice: ttsVoice || '',
      lang,
      isProtected: !!isProtected,
      talkMode: (storage.get<string>('talkMode') as Setting['talkMode']) || 'chat',
      maxHistoryLength: Number(storage.get<string>('maxHistoryLength') || '0'),
    }
    set(() => state)
    return state
  },
  setPassword: (password) => {
    set(() => ({ password }))
    storage.set<string>('password', password)
  },
  setApiKey: (key) => {
    set(() => ({ apiKey: key }))
    storage.set<string>('apiKey', key)
  },
  setApiProxy: (url) => {
    set(() => ({ apiProxy: url }))
    storage.set<string>('apiProxy', url)
  },
  setLang: (lang) => {
    set(() => ({ lang }))
    storage.set<string>('lang', lang)
  },
  setSTTLang: (lang) => {
    set(() => ({ sttLang: lang }))
    storage.set<string>('sttLang', lang)
  },
  setTTSLang: (lang) => {
    set(() => ({ ttsLang: lang }))
    storage.set<string>('ttsLang', lang)
  },
  setTTSVoice: (voice) => {
    set(() => ({ ttsVoice: voice }))
    storage.set<string>('ttsVoice', voice)
  },
  setTalkMode: (mode) => {
    set(() => ({ talkMode: mode }))
    storage.set<string>('talkMode', mode)
  },
  setMaxHistoryLength: (length) => {
    set(() => ({ maxHistoryLength: length }))
    storage.set<string>('maxHistoryLength', length.toString())
  },
}))
