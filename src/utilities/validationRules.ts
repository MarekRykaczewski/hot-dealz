export const decimalValidation = {
  decimal: (value: string) => {
    if (!/^\d+(\.\d{1,2})?$/.test(value)) return "Invalid decimal value";
  },
};

export const priceValidation = {
  min: 0,
  max: {
    value: 9999999,
    message: "Are you sure it's THAT expensive? 🤔",
  },
  validate: {
    required: (value: number) => {
      if (!(value >= 0)) return "This is required";
    },
    ...decimalValidation,
  },
};

export const nextBestPriceValidation = {
  min: 0,
  max: {
    value: 9999999,
    message: "Are you sure it's THAT expensive? 🤔",
  },
  validate: {
    required: (value: number) => {
      if (!(value >= 0)) return "This is required";
    },
    notSmallerThanPrice: (value: number, formDetails: any) => {
      const priceValue = formDetails.price || 0;
      if (value < priceValue)
        return "Price can't be bigger than the next best price!";
    },
    ...decimalValidation,
  },
};

export const shippingCostValidation = {
  min: 0,
  validate: {
    ...decimalValidation,
  },
};

const TITLE_CHARACTER_LIMIT = 100;
const DESCRIPTION_CHARACTER_LIMIT = 500;

export const titleValidation = {
  required: "This is required",
  maxLength: {
    value: TITLE_CHARACTER_LIMIT,
    message: `Max length is ${TITLE_CHARACTER_LIMIT}`,
  },
};

export const descriptionValidation = {
  required: "This is required",
  maxLength: {
    value: DESCRIPTION_CHARACTER_LIMIT,
    message: `Max length is ${DESCRIPTION_CHARACTER_LIMIT}`,
  },
};

export const dealLinkValidation = {
  required: "This is required.",
  pattern: {
    value: /^(ftp|http|https):\/\/[^ "]+$/,
    message: "Please enter a valid link.",
  },
};
