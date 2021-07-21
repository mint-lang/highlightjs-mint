import fs from "fs";
import hljs from "highlight.js/lib/core";
import mint from "../src/languages/mint.js";
import chai from "chai"

const expect = chai.expect;

hljs.registerLanguage("mint", mint);

describe("highlightjs-mint", () => {
  it("should detect correct language", () => {
    // Load the input file...
    const input = fs.readFileSync(
      new URL("./detect/mint/default.txt", import.meta.url),
      "utf-8"
    );

    const { language } = hljs.highlightAuto(input);
    expect(language).to.equal("mint");
  });

  it("should generate correct markup", () => {
    // Load the input file...
    const input = fs.readFileSync(
      new URL("./markup/mint/default.txt", import.meta.url),
      "utf-8"
    );

    // Do the highlight...
    const { value: result, language } = hljs.highlight(input, {
      language: "mint"
    });
    expect(language).to.equal("mint");

    // Check the output is what we expect...
    const expected = fs.readFileSync(
      new URL("./markup/mint/default.expect.txt", import.meta.url),
      "utf-8"
    );
    expect(result).to.equal(expected);
  });
});