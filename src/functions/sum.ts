const sum = (x: number, y: number) => {
  if (x < 0 || y < 0) throw new Error('0より小さな数字を指定しないでください');
  return x + y;
};

export default sum;
