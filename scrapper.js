const fs = require("fs");
const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices["iPhone 6"];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let prevH;
  let newH;

  await page.emulate(iPhone);

  await page.goto(
    "https://www.google.com/maps/place/isexshop.sk+-+online+sexshop/@48.121212,17.0915144,17z/data=!4m7!3m6!1s0x476c8eb91b7c8635:0xfc6596f342ab740a!8m2!3d48.1212084!4d17.0937084!9m1!1b1",
    {
      waitUntil: "networkidle0",
    }
  );

  const btn = await page.evaluateHandle(() =>
    document.querySelector("span[jsaction*='promotion.dismiss'] button")
  );

  await btn.click();
  await page.waitForTimeout(1000);

  do {
    prevH = await page.evaluate(() => {
      const h = document.querySelector('div[jstcache="20"]').scrollHeight;
      document.querySelector("div.nkePVe").scrollTo(0, h);
      return h;
    });

    await page.waitForTimeout(2000);

    newH = await page.evaluate(
      () => document.querySelector('div[jstcache="20"]').scrollHeight
    );
  } while (newH > prevH);

  const elms = await page.$$eval(".hjmQqc", async (h) =>
    h.map((e) => {
      return {
        meno: e.querySelector(".IaK8zc.CVo7Bb").textContent,
        kedy: e.querySelector(".bHyEBc").textContent,
        hodnotenie: parseInt(
          e
            .querySelector(".HeTgld")
            .getAttribute("aria-label")
            .replace("Hodnotenie ", ""),
          10
        ),
        text: e.querySelector(".d5K5Pd").textContent,
      };
    })
  );

  fs.writeFileSync("./hodnotenia.json", JSON.stringify(elms), {
    encoding: "utf8",
  });

  await browser.close();
})();
