import { ChannelType } from "../types/ChannelType";

const map = new Map<ChannelType, string>([
  [ChannelType.ECHO, '#f7f7f7'],
  [ChannelType.SAY, '#f7f7f7'],
  [ChannelType.YELL, '#ffff00'],
  [ChannelType.SHOUT, '#ffa666'],
  [ChannelType.TELL, '#ffb8de'],
  [ChannelType.REPLY, '#ffb8de'],
  [ChannelType.PARTY, '#66e5ff'],
  [ChannelType.ALLIANCE, '#ff7f00'],
  [ChannelType.FREECOMPANY, '#abdbe5'],
  [ChannelType.PVPTEAM, '#abdbe5'],
  [ChannelType.BEGINNER, '#d4ff7d'],
  [ChannelType.EMOTE, '#bafff0'],

  [ChannelType.LINKSHELL_1, '#d4ff7d'],
  [ChannelType.LINKSHELL_2, '#d4ff7d'],
  [ChannelType.LINKSHELL_3, '#d4ff7d'],
  [ChannelType.LINKSHELL_4, '#d4ff7d'],
  [ChannelType.LINKSHELL_5, '#d4ff7d'],
  [ChannelType.LINKSHELL_6, '#d4ff7d'],
  [ChannelType.LINKSHELL_7, '#d4ff7d'],
  [ChannelType.LINKSHELL_8, '#d4ff7d'],

  [ChannelType.CWLINKSHELL_1, '#94bfff'],
  [ChannelType.CWLINKSHELL_2, '#d4ff7d'],
  [ChannelType.CWLINKSHELL_3, '#d4ff7d'],
  [ChannelType.CWLINKSHELL_4, '#d4ff7d'],
  [ChannelType.CWLINKSHELL_5, '#d4ff7d'],
  [ChannelType.CWLINKSHELL_6, '#d4ff7d'],
  [ChannelType.CWLINKSHELL_7, '#d4ff7d'],
  [ChannelType.CWLINKSHELL_8, '#d4ff7d'],

  [ChannelType.ERROR, '#ff4a4a'],
  [ChannelType.SYSTEM, '#b38cff'],

  [ChannelType.SHELL_ERROR, '#ff4a4a'],
  [ChannelType.SHELL_SYSTEM, '#b38cff'],
]);

export function getChannelColor(channelType: ChannelType): string {
  const color = map.get(channelType);
  return color ? color : getChannelDefaultColor();
}

export function getChannelDefaultColor(): string {
  return '#f7f7f7';
}