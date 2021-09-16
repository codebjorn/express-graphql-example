export const slug = (title: string): string => {
  let slug: string;

  slug = title.toLowerCase();
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );

  slug = slug.replace(/ /gi, "-");

  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");

  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  return slug;
};

/* eslint @typescript-eslint/no-explicit-any: "off" */
export const randomFromArray = <T>(array: Array<any>): T => {
  return array[Math.floor(Math.random() * array.length)];
};
