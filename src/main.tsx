import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from 'antd-style'

interface MyToken {
  // 普通文本的颜色
  normalTextColor: string;
  // 标题文本的颜色
  titleTextColor: string;
  // 信息文本的颜色
  infoTextColor: string;
  // 链接标题的颜色
  groupTextColor: string;
  // 发光字的颜色，一般为白色
  glowTextColor: string;
  // 发光字的发光颜色
  glowTextShadow: string;
  // 弹窗的背景颜色
  modalBackground: string;
  // 弹窗的外发光颜色
  modalShadow: string;
  // 文本的通用阴影
  textShadow: string;
  // 频道选择 - 选中
  channelSelectBg: string;
  // 频道选择 - 悬停
  channelHoverBg: string;
  // 文字被框选时的背景颜色
  textSelection: string;
  // 窗口边框颜色
  windowBorder: string;
  // 窗口背景颜色
  windowBg: string;
  // 窗口标题背景颜色
  windowTitleBg: string;
  // 按钮的阴影
  buttonShadow: string;
  // 按钮的背景颜色
  buttonBg: string;
  // 悬浮在按钮时的颜色
  buttonHoverBg: string;
  // 分割线的背景颜色
  dividerBg: string;
  // 输入宏的文本区的背景颜色
  textareaBg: string,
}

// 通过给 antd-style 扩展 CustomToken 对象类型定义，可以为 useTheme 中增加相应的 token 对象
declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends MyToken { }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider<MyToken>
      theme={{
        token: {
          fontFamily: 'FFXIV, 黑体, SimHei',
          fontFamilyCode: 'FFXIV, 黑体, SimHei',
          fontSize: 16,
          motion: false,
        },
      }}
      customToken={{
        normalTextColor: '#ffffff',
        titleTextColor: '#cccccc',
        groupTextColor: '#d8bb7d',
        infoTextColor: '#eee1c5',
        glowTextColor: '#ffffff',
        glowTextShadow: '0px 0px 2px #e38836',
        modalBackground: '#424242',
        modalShadow: '0px 2px 3px #000000',
        textShadow: '0px 1px 1px #000000',
        channelSelectBg: 'linear-gradient(to right, #7e6b5230 0%, #00000000 100%)',
        channelHoverBg: 'linear-gradient(to right, #00000030 0%, #00000000 100%)',
        textSelection: '#5c8634',
        windowBorder: 'linear-gradient(180deg, #d6d7b9 0%, #948c73 100%)',
        windowBg: '#313031',
        windowTitleBg: 'linear-gradient(to bottom, #737573 0%, #313031 100%)',
        buttonShadow: '0px 0px 3px #000000',
        buttonBg: 'linear-gradient(to bottom, #919191 0%, #5c5c5c 5%, #484848 50%, #373737 50%, #494949 100%)',
        buttonHoverBg: 'linear-gradient(to bottom, #a1a1a1 0%, #6c6c6c 5%, #585858 50%, #474747 50%, #595959 100%)',
        dividerBg: 'linear-gradient(to bottom, #161616 33%, #313031 33%, #565556 100%)',
        textareaBg: '#555555',
      }}
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
