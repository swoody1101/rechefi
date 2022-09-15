export const dummyDetail = {
  member_id: "1",
  member_nickname: "안녕하세요",
  title: "중학생도 만들 수 있는 쉬운",
  content:
    "<p>먼저 근처 짜장면집에 전화를 걸어서 탕수육 大자를 시킵니다.</p>```<img src='https://media.discordapp.net/attachments/433506654009425921/979195859524788244/1014134412025bc65e924b01d5ffd1a3578c7262.gif'></img>```<p>배달이 오면 맛있게 먹습니다.</p>```<img style='width: 100%;' src='https://cdn.discordapp.com/attachments/433506654009425921/986506798636884029/unknown.png'></img>",
  ingredients: [
    {
      name: "양파",
      amount: "3개",
    },
    {
      name: "당근",
      amount: "1개",
    },
    {
      name: "돼지고기",
      amount: "2근",
    },
    {
      name: "파인애플",
      amount: "20개",
    },
    {
      name: "레몬",
      amount: "5개",
    },
  ],
  tags: [
    {
      id: 1,
      name: "한식",
    },
  ],
  img_url:
    "https://cdn.discordapp.com/attachments/433506654009425921/979195859524788244/1014134412025bc65e924b01d5ffd1a3578c7262.gif",
  likes: 30,
  date: "2022-09-07",
  comment_count: 3,
  like_member_id: [1],
  comments: [],
};

export const dummyDetailComment = [
  {
    member_id: 1,
    member_nickname: "기타치는이현태",
    content: "이거 보고 제 애완 돼지가 춤을 추고 있습니다",
    create_at: "2022-09-07",
    root: 0,
    group: 1,
    sequence: 1,
  },
  {
    member_id: 2,
    member_nickname: "기타안치는이현태",
    content: "와! 애완 돼지!",
    create_at: "2022-09-07",
    root: 0,
    group: 2,
    sequence: 1,
  },
  {
    member_id: 3,
    member_nickname: "탕수육이좋아요",
    content: "제 돼지가 탕수육을 좋아해요",
    create_at: "2022-09-07",
    root: 1,
    group: 1,
    sequence: 2,
  },
];
