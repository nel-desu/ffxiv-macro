import { ChannelType } from "../types/ChannelType"
import { SoundType } from "../types/SoundType"

class Message {

  static MAX_SOUND = 16;

  // 需要输出到哪个频道
  channel: ChannelType = ChannelType.HOLD;
  // 在聊天栏显示出来的内容
  content: string = '';
  // 当前的宏，没有使用宏时为空字符串
  macro: string = '';
  // 提示音，不能超过 16 个
  sound: Array<SoundType> = [];
  // 等待时间，单位秒，0-30 的整数
  wait: number = 0;
  // 此项不为 ChannelType.HOLD 时，只执行切换频道
  checkChannel: ChannelType = ChannelType.HOLD;
  // 此项为 true 时，清屏
  clear: boolean = false;

  constructor() { }

  static createMessage = (channelType: ChannelType, content: string) => {
    const msg = new Message();
    msg.channel = channelType;
    msg.content = content;
    return msg;
  }

  static createShellErrorMessage = (content: string, macro: string) => {
    const msg = new Message();
    msg.channel = ChannelType.SHELL_ERROR;
    msg.content = content;
    msg.macro = macro;
    msg.sound = [];
    msg.wait = 0;
    msg.checkChannel = ChannelType.HOLD;
    msg.clear = false;
    return msg;
  }

  static createPlainMessage = (content: string, macro: string) => {
    const msg = new Message();
    msg.channel = ChannelType.HOLD;
    msg.content = content;
    msg.macro = macro;
    msg.sound = [];
    msg.wait = 0;
    msg.checkChannel = ChannelType.HOLD;
    msg.clear = false;
    return msg;
  }
}

export { Message }