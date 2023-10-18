import { findByName as macroFindByName } from "../jsonData/Macro";
import { getTargetName, findByName as targetFindByName } from "../jsonData/Target";
import { JMacro } from "../jsonData/Types";
import { ChannelType } from "../types/ChannelType";
import { Message, } from "../cmd/Message";
import { Token } from "../cmd/Token";
import { TokenType } from "../types/TokenType";
import { CommandType } from "../types/CommandType";
import { soundTypes } from "../types/SoundType";

export class Interpreter {

  private tokens: Array<Token>;
  private message: Message;
  private start = 0;

  constructor(tokens: Array<Token>) {
    this.tokens = tokens;
    this.message = new Message();
  }

  interpret = (): Message => {
    if (this.tokens.length <= 0) {
      throw new Error('token 长度 ' + this.tokens.length);
    }

    const fstToken = this.tokens[0];
    // 检查第一个是不是文本指令
    if (fstToken.tokenType === TokenType.MACRO) {
      const m = macroFindByName(fstToken.lexeme);
      if (m === null) {
        return Message.createShellErrorMessage(
          `“${fstToken.lexeme}”出现问题：该命令不存在。`,
          fstToken.lexeme
        );
      }
      this.message.macro = fstToken.lexeme;
      this.parseMacro(m);
      this.start = 2;
    }

    for (let i = this.start; i < this.tokens.length; i++) {

      const element = this.tokens[i];
      const lx = element.lexeme;
      // 判断代名词
      if (element.tokenType === TokenType.TARGET) {
        // 提示音
        if (lx.match(/<se.\d{1,2}>/g)) {
          const match = lx.match(/(?<=<se\.)\d{1,2}(?=>)/g);
          const num = match ? parseInt(match[0]) : -1;
          if (num > 0 && this.message.sound.length < Message.MAX_SOUND) {
            this.message.sound.push(soundTypes[num - 1]);
          }
          this.message.content += lx;
        }
        // 延时
        else if (lx.match(/<wait.\d(\.\d)?>/g)) {
          const match = lx.match(/(?<=<wait\.)\d(\.\d)?(?=>)/g);
          let time = 0
          const num = match ? Math.round(parseFloat(match[0])) : -1;
          if (num >= 0 && num <= 30) {
            time = num;
          }
          this.message.wait = time * 1000;
        }
        // 复唱
        else if (lx.match(/<recast\..{1,8}>/g)) {
          this.message.content += '--:--';
        } else {
          // 其他代名词
          const target = targetFindByName(lx);
          if (target) {
            this.message.content += getTargetName(target.cmd_en);
          } else {
            this.message.content += lx;
          }
        }
      } else {
        this.message.content += lx;
      }
    }

    return this.message;
  }

  private parseMacro(macro: JMacro) {
    switch (macro.type) {
      case CommandType.CHAT:
        this.parseChat(macro);
        break;
      case CommandType.EMOTE:
        this.parseEmote(macro);
        break;
      default:
        break;
    }
  }

  private parseEmote = (macro: JMacro) => {
    switch (macro.cmd_en) {
      case '/emote':
        if (this.tokens.length === 1) {
          this.message = Message.createShellErrorMessage(
            `“${this.tokens[0].lexeme}”出现问题：1号指定的字串不存在。`,
            this.tokens[0].lexeme
          );
          return;
        }
        this.message.channel = ChannelType.EMOTE;
        break;
    }
  }

  private parseChat = (macro: JMacro) => {
    switch (macro.cmd_en) {
      case '/say':
        if (this.tokens.length === 1) {
          this.message.checkChannel = ChannelType.SAY;
          return;
        }
        this.message.channel = ChannelType.SAY;
        break;
      case '/yell':
        if (this.tokens.length === 1) {
          this.message.checkChannel = ChannelType.YELL;
          return;
        }
        this.message.channel = ChannelType.YELL;
        break;
      case '/shout':
        if (this.tokens.length === 1) {
          this.message = Message.createShellErrorMessage(
            `“${this.tokens[0].lexeme}”出现问题：1号指定的字串不存在。`,
            this.tokens[0].lexeme
          );
          return;
        }
        this.message.channel = ChannelType.SHOUT;
        break;
      case '/tell':
        this.message = Message.createShellErrorMessage(
          `“${this.tokens[0].lexeme}”出现问题：1号指定的玩家名不存在。`,
          this.tokens[0].lexeme
        );
        return;
      case '/reply':
        if (this.tokens.length === 1) {
          this.message = Message.createShellErrorMessage(
            `“${this.tokens[0].lexeme}”出现问题：1号指定的字串不存在。`,
            this.tokens[0].lexeme
          );
        } else {
          this.message = Message.createShellErrorMessage(
            `“${this.tokensToErrorString()}”出现问题：1号指定的玩家名不正确。`,
            this.tokens[0].lexeme
          );
        }
        return;
      case '/cleartellhistory':
        return;
      case '/party':
        if (this.tokens.length === 1) {
          this.message.checkChannel = ChannelType.PARTY;
          return;
        }
        this.message.channel = ChannelType.PARTY;
        break;
      case '/alliance':
        if (this.tokens.length === 1) {
          this.message.checkChannel = ChannelType.ALLIANCE;
          return;
        }
        this.message.channel = ChannelType.ALLIANCE;
        break;
      case '/freecompany':
        if (this.tokens.length === 1) {
          this.message.checkChannel = ChannelType.FREECOMPANY;
          return;
        }
        this.message.channel = ChannelType.FREECOMPANY;
        break;
      case '/pvpteam':
        this.message = Message.createShellErrorMessage(
          `“${this.tokensToErrorString()}”出现问题：该命令现在无法使用。`,
          this.tokens[0].lexeme
        );
        return;
      case '/linkshell':
        if (this.tokens.length === 1) {
          this.message.checkChannel = ChannelType.LINKSHELL_1;
          return;
        }
        this.message.channel = ChannelType.LINKSHELL_1;
        break;
      case '/linkshell1':
        if (this.tokens.length === 1) {
          this.message.checkChannel = ChannelType.LINKSHELL_1;
          return;
        }
        this.message.channel = ChannelType.LINKSHELL_1;
        break;
      case '/cwlinkshellcmd':
        return;
      case '/cwlinkshell':
        if (this.tokens.length === 1) {
          this.message.checkChannel = ChannelType.CWLINKSHELL_1;
          return;
        }
        this.message.channel = ChannelType.CWLINKSHELL_1;
        break;
      case '/cwlinkshell1':
        if (this.tokens.length === 1) {
          this.message.checkChannel = ChannelType.CWLINKSHELL_1;
          return;
        }
        this.message.channel = ChannelType.CWLINKSHELL_1;
        break;
      case '/beginner':
        if (this.tokens.length === 1) {
          this.message.checkChannel = ChannelType.BEGINNER;
          return;
        }
        this.message.channel = ChannelType.BEGINNER;
        break;
      case '/echo':
        if (this.tokens.length === 1) {
          this.message = Message.createShellErrorMessage(
            `“${this.tokens[0].lexeme}”出现问题：1号指定的字串不存在。`,
            this.tokens[0].lexeme
          );
          return;
        }
        break;
      case '/clearlog':
        this.message.clear = true;
        return;
      case '/quickchat':
        throw new Error("该指令只有在参战“水晶冲突”时才可使用。");
    }
  }

  private tokensToErrorString = () => {
    return this.tokens.map((v) => v.lexeme).join('');
  }
}
