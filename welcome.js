const { Client, GatewayIntentBits, AttachmentBuilder } = require("discord.js");
const Canvas = require("canvas");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

// Mảng các URL hình ảnh để sử dụng
const imageUrls = [
  // Đặt các URL hình ảnh của bạn ở đây
  "https://cdn.discordapp.com/attachments/1231931105817530401/1231960584493338664/18.jpg?ex=6638dbb4&is=662666b4&hm=a9f0dbb300065fa946c301822256599f02612a8c7311f208a37d644176bc106a&",
  "https://cdn.discordapp.com/attachments/1231931105817530401/1231960698557435925/16.jpg?ex=6627b84f&is=662666cf&hm=74c96fe762a6b798b4ec6b64ef315af7389d17cd3f7cc89b483bc4e3bbc9135e&",
  "https://cdn.discordapp.com/attachments/1231931105817530401/1231960795382939712/15.jpg?ex=6638dbe6&is=662666e6&hm=1e93f6cf0d178215df4cadcdcc503f387f1f21611fda8fa58123de7b812d281f&",
  "https://cdn.discordapp.com/attachments/1231931105817530401/1231960843135225896/14.jpg?ex=6638dbf1&is=662666f1&hm=90032e6a234d34e940215a0e79066b7716bf467f24caa1c0b915c729a204a752&",
  "https://cdn.discordapp.com/attachments/1231931105817530401/1231960893357686784/13.jpg?ex=6627b87d&is=662666fd&hm=ec5400b90e22b456c6dbdc113cbe313a0536ffde012605ababaa9a1d3a117c6d&",
  "https://cdn.discordapp.com/attachments/1231931105817530401/1231960936802418780/12.jpg?ex=6638dc08&is=66266708&hm=6172a5ce8d209479a504754a82114a2b2d34818c4eddb88c9dbfa8ec9d107d82&",
  "https://cdn.discordapp.com/attachments/1231931105817530401/1231961112866455704/8.jpg?ex=6638dc32&is=66266732&hm=52c223321088740bb6f6391097e933f0ccd8f386a8f5f651e2e4cbfca176764e&",

  "https://cdn.discordapp.com/attachments/1231931105817530401/1231961157254779001/7.jpg?ex=6638dc3c&is=6626673c&hm=1bd118921deb20b995e95444dcece73b42e59f761356d46a1a96b5fcfc9a2421&",
  "https://cdn.discordapp.com/attachments/1231931105817530401/1231961208794386543/6.jpg?ex=6638dc48&is=66266748&hm=65c994041d231a31d177dcca67c6b848a371a4c97ee33615ed2fe034d47d5a32&",
  "https://cdn.discordapp.com/attachments/1231931105817530401/1231961272111595540/4.jpg?ex=6627b8d8&is=66266758&hm=c610fac7dd75d18991025ae22b52ceb452d3a24610048b721b96622fc73741bb&",
  "https://cdn.discordapp.com/attachments/1231931105817530401/1231961403917729923/Untitled_Project.jpg?ex=6638dc77&is=66266777&hm=8f2b0b8cf16068e66abfd3a501b962988ab3f7243d9d8b40c1dc2daf45fbcd2d&",
  "https://cdn.discordapp.com/attachments/1231931105817530401/1231961441251233833/Untitled_Project.jpg?ex=6638dc80&is=66266780&hm=9fdb096a675365404c39962d159e4887c36f6a68bc341492a4c8f3ef0f957f40&",
  // thêm nhiều ảnh hơn nếu muốn
];

let lastImageUrl = ""; // Lưu URL của hình ảnh cuối cùng đã được sử dụng
// Mảng các lời chào để sử dụng
const greetings = ["Hola", "Hii", "Xin chào"];

let lastGreeting = ""; // Lưu lời chào cuối cùng đã được sử dụng

client.once("ready", () => {
  console.log("Ready!");
});

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "👋・welcome"
  );
  if (!channel) return;

  let imageUrl;
  do {
    // Chọn ngẫu nhiên một URL hình ảnh không trùng với hình ảnh cuối cùng
    imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
  } while (imageUrl === lastImageUrl);

  // Cập nhật URL hình ảnh cuối cùng đã được sử dụng
  lastImageUrl = imageUrl;

  let greeting;
  do {
    // Chọn ngẫu nhiên một lời chào không trùng với lời chào cuối cùng
    greeting = greetings[Math.floor(Math.random() * greetings.length)];
  } while (greeting === lastGreeting);

  // Cập nhật lời chào cuối cùng đã được sử dụng
  lastGreeting = greeting;

  const canvas = Canvas.createCanvas(800, 200);
  const ctx = canvas.getContext("2d");

  // Tải ảnh nền chọn ngẫu nhiên cho card
  const background = await Canvas.loadImage(imageUrl);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Chèn avatar hình tròn
  const avatar = await Canvas.loadImage(
    member.displayAvatarURL({ extension: "jpg" })
  );
  const avatarX = 60; // Vị trí X của avatar
  const avatarY = 25; // Vị trí Y của avatar
  const avatarSize = 150; // Kích thước của avatar
  ctx.save();
  ctx.beginPath();
  ctx.arc(
    avatarX + avatarSize / 2,
    avatarY + avatarSize / 2,
    avatarSize / 2,
    0,
    Math.PI * 2,
    true
  );
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore();

  // Thiết lập font và màu cho lời chào
  ctx.font = "roboto bold 28px sans-serif";
  ctx.fillStyle = "#ffffff"; // màu trắng
  ctx.fillText(greeting, 230, 90); // Sử dụng lời chào ngẫu nhiên

  // Thiết lập màu cho tên người dùng
  ctx.fillStyle = "#00ff00"; // màu xanh lá
  ctx.fillText(member.displayName + "!", 230, 130);

  // Gửi ảnh
  const attachment = new AttachmentBuilder(canvas.toBuffer(), {
    name: "welcome-image.png",
  });
  channel.send({
    content: `${member.toString()}, chào mừng bạn đã đến với ${
      member.guild.name
    }!`,
    files: [attachment],
  });
});

client.login("");
