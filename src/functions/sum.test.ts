import sum from './sum';

test('正常に演算ができる', () => {
  expect(sum(1, 2)).toBe(3);
});

describe('エラーの発生を確認するテスト', () => {
  it('0より小さい数字を指定した場合は「0より小さな数字を指定しないでください」エラーになる', () => {
    expect(() => sum(-1, -10)).toThrowError(
      new Error('0より小さな数字を指定しないでください')
    );
  });
});
