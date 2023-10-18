import { TokenType } from '../types/TokenType';

export class Token {

  tokenType: TokenType;
  lexeme: string;
  position: number

  constructor(tokenType: TokenType, lexeme: string, position: number) {
    this.tokenType = tokenType;
    this.lexeme = lexeme;
    this.position = position;
  }

  private formatPosition = (): string => {
    if (this.position >= 0 && this.position < 10) {
      return `  ${this.position}`;
    } else if (this.position >= 10 && this.position < 100) {
      return ` ${this.position}`;
    } else {
      return this.position.toString();
    }
  }

  toString = (): string => {
    return '[' + this.formatPosition() + '] [' + this.lexeme + '], ' + this.tokenType;
  }

}
