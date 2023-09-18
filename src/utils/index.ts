export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const findByName = (data: any, selected: string | undefined) => {
  return data?.find((each: any) => {
    if (each?.title) return each.title === selected;
    return each.name === selected;
  });
};
