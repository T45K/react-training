export class Squares {
  value: string[];

  constructor(value?: string[]) {
    this.value = value ?? Array(9).fill('');
  }

  isFilled = (index: number): boolean => this.value[index] !== '';

  linesUp = (): boolean => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const hasSameStringInOneLine = (indexes: number[]): boolean => {
      const base = this.value[indexes[0]];
      return indexes.map((i) => this.value[i]).every((it) => it === base);
    };
    return lines.some((line) => this.value[line[0]] !== '' && hasSameStringInOneLine(line));
  };

  copyWith = (i: number, v: string): Squares => {
    const next = this.value.slice();
    next[i] = v;
    return new Squares(next);
  };

  get = (i: number): string => this.value[i];
}
