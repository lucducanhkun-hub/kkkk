export interface WishItem {
  id: string;
  category: 'class' | 'mother' | 'teacher' | 'girlfriend' | 'friend';
  categoryLabel: string;
  content: string;
  short: string;
  icon: string;
}

export const WISHES_DATA: WishItem[] = [
  {
    id: '1',
    category: 'class',
    categoryLabel: 'Các bạn nữ lớp mình',
    content: 'Chúc toàn thể các bạn nữ trong lớp luôn xinh đẹp, rạng rỡ như những đóa hoa hướng dương, học tập thật tốt, thi đâu đỗ đó và luôn là niềm tự hào của cả lớp!',
    short: 'Luôn xinh tươi, rạng ngời và thi cử toàn điểm 10!',
    icon: '🌻',
  },
  {
    id: '2',
    category: 'class',
    categoryLabel: 'Các bạn nữ lớp mình',
    content: 'Nhân ngày 20/10, chúc phái đẹp lớp ta luôn nhận được thật nhiều hoa, nhiều quà, nhận cơn mưa lời khen và nụ cười luôn nở trên môi mỗi ngày đến trường!',
    short: 'Nhận ngập tràn hoa quà và luôn rộn rã tiếng cười!',
    icon: '💐',
  },
  {
    id: '3',
    category: 'class',
    categoryLabel: 'Các bạn nữ lớp mình',
    content: 'Chúc các bạn nữ lớp mình ngày càng duyên dáng, đáng yêu, ăn hoài không béo, thức khuya không mụn và sớm tìm được hoàng tử như ý nha!',
    short: 'Duyên dáng, đáng yêu và mãi là những đóa hoa tuyệt nhất!',
    icon: '✨',
  },
  {
    id: '4',
    category: 'mother',
    categoryLabel: 'Mẹ yêu',
    content: 'Nhân ngày 20/10, con chúc Mẹ luôn mạnh khỏe, bình an và hạnh phúc. Cảm ơn Mẹ vì tất cả những hi sinh và tình yêu thương vô bờ bến dành cho gia đình.',
    short: 'Chúc Mẹ yêu luôn dồi dào sức khỏe, an vui và tươi trẻ!',
    icon: '💖',
  },
  {
    id: '5',
    category: 'teacher',
    categoryLabel: 'Cô giáo',
    content: 'Kính chúc Cô một ngày 20/10 ngập tràn niềm vui, luôn giữ vững ngọn lửa nhiệt huyết với sự nghiệp trồng người và luôn tràn đầy hạnh phúc trong cuộc sống.',
    short: 'Kính chúc Cô luôn dồi dào sức khỏe và hạnh phúc viên mãn!',
    icon: '📚',
  },
  {
    id: '6',
    category: 'girlfriend',
    categoryLabel: 'Bạn gái / Crush',
    content: 'Chúc em một ngày 20/10 thật ngọt ngào và ấm áp. Em luôn là điều kỳ diệu và xinh đẹp nhất trong thế giới của anh. Chúc em mãi cười tươi như thế nhé!',
    short: 'Chúc em luôn ngọt ngào, hạnh phúc và luôn mỉm cười!',
    icon: '🌹',
  },
  {
    id: '7',
    category: 'friend',
    categoryLabel: 'Bạn thân',
    content: 'Chúc bạn thân 20/10 vui vẻ, sớm đạt được mọi ước mơ, bớt quạu lại, bớt deadline đi và lúc nào cũng sẵn sàng cùng tớ đi ăn cả thế giới!',
    short: 'Mãi là bạn thân tốt nhất, luôn thành công và vui tươi!',
    icon: '🌷',
  },
];

export interface FortuneCookie {
  id: number;
  title: string;
  prediction: string;
  luckyNumber: number;
  luckyColor: string;
  emoji: string;
}

export const FORTUNES: FortuneCookie[] = [
  {
    id: 1,
    title: 'Quẻ Đại Cát',
    prediction: 'Kỳ thi sắp tới điểm số cao chót vót, làm bài thi đến đâu trúng tủ đến đó!',
    luckyNumber: 10,
    luckyColor: 'Hồng phấn',
    emoji: '🎯',
  },
  {
    id: 2,
    title: 'Quẻ Duyên Lành',
    prediction: 'Có ai đó trong lớp đang thầm thương trộm nhớ bạn đấy, hãy để ý xung quanh nhé!',
    luckyNumber: 20,
    luckyColor: 'Đỏ son',
    emoji: '💌',
  },
  {
    id: 3,
    title: 'Quẻ Nhan Sắc',
    prediction: 'Nhan sắc ngày càng thăng hạng vượt bậc, chụp góc nào cũng thành nàng thơ!',
    luckyNumber: 8,
    luckyColor: 'Tím pastel',
    emoji: '✨',
  },
  {
    id: 4,
    title: 'Quẻ Thần Tài',
    prediction: 'Ví tiền luôn rủng rỉnh, nhận quà liền tay, đi đâu cũng được bao ăn uống thả ga!',
    luckyNumber: 68,
    luckyColor: 'Vàng kim',
    emoji: '💰',
  },
  {
    id: 5,
    title: 'Quẻ Tâm Trí',
    prediction: 'Mọi áp lực và mệt mỏi sẽ tan biến, tuần mới ngập tràn năng lượng tích cực!',
    luckyNumber: 99,
    luckyColor: 'Xanh bạc hà',
    emoji: '🌈',
  },
  {
    id: 6,
    title: 'Quẻ May Mắn',
    prediction: 'Bất cứ điều ước nào bạn thì thầm vào ngày hôm nay đều sẽ sớm trở thành hiện thực!',
    luckyNumber: 77,
    luckyColor: 'Cam đào',
    emoji: '🌟',
  },
];
