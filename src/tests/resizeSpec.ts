import Resize from "../utilities/reizeImage";

describe("test resize image function", () => {
  it("should return a buffer", async () => {
    const data = await Resize("santamonica", "400", "200");
    expect(data).toBeInstanceOf(Buffer);
  });
});
