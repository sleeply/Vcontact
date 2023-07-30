export const useNumbFormatter = () => {
  let regex = /[(),-]/g;

  const listener = (value: string): string => {
    let phone = "";

    if (!value || value.length === 0) return phone;

    phone = value.split(" ").join("").replace(regex, "");

    return phone;
  };

  return {
    listener,
  };
};
