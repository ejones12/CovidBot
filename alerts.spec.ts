import { Message } from "discord.js";
import { execute } from "../commands/alerts.js"
const prefix = "!"

describe("Message Handler", () => {
  const message = ({
    channel: {
      send: jest.fn(),
    },
    content: "",
    author: {
      bot: false,
    },
  } as unknown) as Message;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("it should send Hello, World!", async () => {
    message.content = "!alerts masks";
    let subs = new Map();
    const categories = ['travel', 'vaccines', 'masks'] ;
    const args = message.content.slice(prefix.length).split(/ +/);
    await execute(message,args,subs,categories);
    expect(message.channel.send).toHaveBeenCalledWith("Hello, World!");
    expect(message.channel.send).not.toHaveBeenCalledWith("Help Command");
  });

 


});