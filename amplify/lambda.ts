export const handler = async (parameter: any) => {
  const test = process.env.DB_CONNECTION;
  console.log('DB_CONNECTION: ', test);
  console.log('paramter: ', parameter.arguments.paramter);
  return test;
}
