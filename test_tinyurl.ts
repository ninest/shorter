import { assertEquals, assertThrowsAsync } from "./deps.ts";
import { tinyurl } from "./mod.ts";
import { shorten } from "./tinyurl.ts";

Deno.test("tinyurl shortens https://google.com", async () => {
  const shortLink = await tinyurl.shorten("https://google.com");
  assertEquals(shortLink, "https://tinyurl.com/mbq3m");
});

Deno.test(
  "tinyurl shortens https://google.com with alias alongalias",
  async () => {
    const shortLink = await tinyurl.shorten(
      "https://google.com",
      "anexamplealias"
    );
    assertEquals(shortLink, "https://tinyurl.com/anexamplealias");
  }
);

Deno.test("tinyurl alias does not support invalid aliases", () => {
  assertThrowsAsync(async () => await shorten("https://google.com", "a"));
  assertThrowsAsync(
    async () => await shorten("https://google.com", "a".repeat(31))
  );
  assertThrowsAsync(async () => await shorten("https://google.com", "a#$&"));
});

export {};
