import { ChannelType } from "../types/ChannelType";
import { SoundType } from "../types/SoundType";
import { Token } from "./Token";

export class Command {

  command: string;
  
  tokens: Array<Token> = [];

  channel: ChannelType = ChannelType.HOLD;
  content: string = '';
  macro: string = '';
  sound: Array<SoundType> = [];
  wait: number = 0;
  checkChannel: ChannelType = ChannelType.HOLD;

  constructor(cmd: string) {
    this.command = cmd;
  }

}