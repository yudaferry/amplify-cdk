export const handler = (parameter: any) => {
  const test = process.env.DB_CONNECTION;
  console.log('DB_CONNECTION: ', test);
  console.log('paramter: ', parameter);
  return test;
}
