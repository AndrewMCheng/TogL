/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://playtogl.com',
  generateRobotsTxt: true,
  sitemapSize: 50000,  // large enough that it won’t split for a small site
  additionalPaths: async (config) => [
    await config.transform(config, '/'),           
    await config.transform(config, '/daily'),      
    await config.transform(config, '/leaderboard') 
  ],
};
