export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        priceId: process.env.FREE_PRICEID as string,
        quota: {
          LINKS: 5,
        },
      },
      pro: {
        priceId: process.env.PRO_PRICEID as string,
        quota: {
          LINKS: 100,
        },
      },
    },
  },
};
