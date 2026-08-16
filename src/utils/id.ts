let counter = 0;

export function generateId(prefix: string = 'sa'): string {
  counter += 1;
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `${prefix}-${counter}-${randomStr}`;
}
