import { Token } from "../cmd/Token";
import { TokenType } from "../types/TokenType";

export class Scanner {

  private cmd: string;
  private tokens: Array<Token> = [];

  private start: number = 0;
  private current: number = 0;

  constructor(cmd: string) {
    this.cmd = cmd;
  }

  /**
   * 扫描一行指令
   */
  scan = (): Array<Token> => {
    while (!this.isEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    return this.tokens;
  }

  private scanToken = () => {
    const str = this.advance();

    // 第一位是 / 时，判断为文本指令
    if (str === '/' && this.start === 0) {
      while (this.peek() !== ' ' && !this.isEnd()) {
        this.advance();
      }
      const w = this.cmd.substring(this.start, this.current);
      this.tokens.push(new Token(TokenType.MACRO, w, this.start));
    } 
    // 代名词
    else if (str === '<' && this.peekRightArrow() > 0) {
      const rightArrowPos = this.peekRightArrow();
      if (rightArrowPos > 0) {
        const target = this.cmd.substring(this.start, rightArrowPos + 1);
        this.current = rightArrowPos + 1;
        this.tokens.push(new Token(TokenType.TARGET, target, this.start));
      }
    } 
    // 空格单独处理
    else if (str === ' ') {
      while (this.peek() === ' ' && !this.isEnd()) {
        this.advance();
      }
      const w = this.cmd.substring(this.start, this.current);
      this.tokens.push(new Token(TokenType.SPACE, w, this.start));
    } 
    // 普通文本
    else {
      while (this.peek() !== ' ' && this.peek() !== '<' && !this.isEnd()) {
        this.advance();
      }
      const w = this.cmd.substring(this.start, this.current);
      this.tokens.push(new Token(TokenType.LITERAL, w, this.start));
    }
  }

  private peek = (): string => {
    if (this.isEnd()) {
      return '\0';
    }
    return this.cmd.substring(this.current, this.current + 1);
  }

  private peekRightArrow = (): number => {
    let p = this.start + 1;
    while (p < this.cmd.length) {
      const str = this.cmd.substring(p, p + 1);
      if (str === '>') {
        return p;
      }
      if (str === '<') {
        return -1;
      }
      p++;
    }
    return -1;
  }

  private advance = (): string => {
    this.current++;
    return this.cmd.substring(this.current - 1, this.current);
  }

  private isEnd = (): boolean => {
    return this.current >= this.cmd.length;
  }

}
