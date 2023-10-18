export enum TokenType {
  // 以 / 开头的宏指令
  MACRO = 'macro',
  // 格式为 <xxx> 的代名词
  TARGET = 'target',
  // 任意数量的空格
  SPACE = 'space',
  // 字面量，可能是文本、数字、特殊字符等
  LITERAL = 'literal',
}
