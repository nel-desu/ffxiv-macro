import { commandLength } from "../util/CmdUtil";
import { Command } from "../cmd/Command";
import { Interpreter } from "./Interpreter";
import { Scanner } from "./Scanner";
import { Token } from "../cmd/Token";
import { Message } from "../cmd/Message";
import { ChannelType } from "../types/ChannelType";
import { TokenType } from "../types/TokenType";
import { findByName as mFindByName } from "../jsonData/Macro";
import { CommandType } from "../types/CommandType";

export function say(macro: string): Array<Message> {
  if (macro.length <= 0) {
    return [];
  }

  const commands: Array<Command> = preprocessing(macro);
  scan(commands);
  // showTokens(commands[0].command, commands[0].tokens);
  const messages = interpret(commands);

  return messages;
}

export function replace(macro: string, channelType: ChannelType): string {
  const lines = macro.split('\n');
  const cmds = new Array<Command>();
  let returnString = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const len = commandLength(line);
    if (len > 180) {
      throw new Error(`第 ${line + 1} 行输入内容过多`);
    }
    cmds.push(new Command(line));
  }

  scan(cmds);

  for (const c of cmds) {
    for (const t of c.tokens) {
      // 如果不是宏，直接添加
      if (t.tokenType !== TokenType.MACRO) {
        returnString += t.lexeme;
        continue;
      }
      const macro = mFindByName(t.lexeme);
      console.log(t.lexeme, macro)
      if (macro === null || macro.type !== CommandType.CHAT) {
        returnString += t.lexeme;
        continue;
      }
      let lexeme: string = '';
      switch (channelType) {
        case ChannelType.ECHO: lexeme = '/e'; break;
        case ChannelType.SAY: lexeme = '/s'; break;
        case ChannelType.YELL: lexeme = '/y'; break;
        case ChannelType.SHOUT: lexeme = '/sh'; break;
        case ChannelType.TELL: lexeme = '/t'; break;
        case ChannelType.REPLY: lexeme = '/r'; break;
        case ChannelType.PARTY: lexeme = '/p'; break;
        case ChannelType.ALLIANCE: lexeme = '/a'; break;
        case ChannelType.FREECOMPANY: lexeme = '/fc'; break;
        case ChannelType.PVPTEAM: lexeme = '/pt'; break;
        case ChannelType.BEGINNER: lexeme = '/b'; break;
        case ChannelType.LINKSHELL_1: lexeme = '/l1'; break;
        case ChannelType.LINKSHELL_2: lexeme = '/l2'; break;
        case ChannelType.LINKSHELL_3: lexeme = '/l3'; break;
        case ChannelType.LINKSHELL_4: lexeme = '/l4'; break;
        case ChannelType.LINKSHELL_5: lexeme = '/l5'; break;
        case ChannelType.LINKSHELL_6: lexeme = '/l6'; break;
        case ChannelType.LINKSHELL_7: lexeme = '/l7'; break;
        case ChannelType.LINKSHELL_8: lexeme = '/l8'; break;
        case ChannelType.CWLINKSHELL_1: lexeme = '/cwl1'; break;
        case ChannelType.CWLINKSHELL_2: lexeme = '/cwl2'; break;
        case ChannelType.CWLINKSHELL_3: lexeme = '/cwl3'; break;
        case ChannelType.CWLINKSHELL_4: lexeme = '/cwl4'; break;
        case ChannelType.CWLINKSHELL_5: lexeme = '/cwl5'; break;
        case ChannelType.CWLINKSHELL_6: lexeme = '/cwl6'; break;
        case ChannelType.CWLINKSHELL_7: lexeme = '/cwl7'; break;
        case ChannelType.CWLINKSHELL_8: lexeme = '/cwl8'; break;
        default: lexeme = ''; break;
      }
      returnString += lexeme;
    }
    returnString += '\n';
  }
  return returnString;
}

function preprocessing(macro: string): Array<Command> {
  const lines = macro.split('\n');
  const cmds = new Array<Command>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const len = commandLength(line);

    // 遇到空行就停止
    if (len <= 0 || line.trim().length <= 0) {
      return cmds;
    }
    if (len > 180) {
      throw new Error(`第 ${line + 1} 行输入内容过多`);
    }

    cmds.push(new Command(line));
  }

  return cmds;
}

function scan(cmds: Array<Command>) {
  for (const cmd of cmds) {
    const scanner = new Scanner(cmd.command);
    const tokens = scanner.scan();
    cmd.tokens = tokens;
  }
}

function interpret(cmds: Array<Command>) {
  const messages = new Array<Message>();
  for (const cmd of cmds) {
    const interpreter = new Interpreter(cmd.tokens);
    const msg = interpreter.interpret();
    cmd.channel = msg.channel;
    cmd.content = msg.content;
    cmd.macro = msg.macro;
    cmd.sound = msg.sound;
    cmd.wait = msg.wait;
    cmd.checkChannel = msg.checkChannel;
    messages.push(msg);
  }

  return messages;
}

/**
 * 方便调试用的函数，检查生成 token 是否正确
 * 
 * @param cmd 当前命令
 * @param tokens 扫描命令得到的 tokens
 */
function showTokens(cmd: string, tokens: Array<Token>) {
  console.log('====================');
  console.log(`[${cmd}]`);

  tokens.forEach((v) => {
    console.log(v.toString());
  });
}
