#!/usr/bin/node
// Generates public/sitemap.txt.
// Run from repo root using `npm run sitemap`.
const fs = require("fs");

const siteUrl = "https://www.edwardml.com";
const apiUrl = `https://api-jet-lfoguxrv7q-uw.a.run.app`;

async function fetchPage(page) {
  const pageSize = 50;
  const url =
    `${apiUrl}/anime?sort=highest_rated&page_size=${pageSize}` +
    `&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  return { items: data.items, hasNextPage: data.items.length === pageSize };
}

async function fetchAllAnimeIds() {
  const ids = [];
  let page = 1;
  while (true) {
    console.log(`Fetching anime page ${page}`);
    const { items, hasNextPage } = await fetchPage(page);

    ids.push(...items.map((i) => i.id));

    if (hasNextPage) {
      page++;
    } else {
      break;
    }
  }

  return ids.sort((a, b) => a - b);
}

async function main() {
  console.log("Building sitemap.txt");

  // Add landing page.
  const urls = [siteUrl];

  // Add all anime pages.
  const animeIds = await fetchAllAnimeIds();
  urls.push(...animeIds.map((id) => `${siteUrl}/anime/${id}`));

  // Write urls to file.
  const file = fs.openSync("public/sitemap.txt", "w");

  urls.forEach((url) => {
    fs.writeSync(file, url + "\n");
  });

  fs.closeSync(file);

  console.log(`Wrote ${urls.length} urls`);
}

main();
