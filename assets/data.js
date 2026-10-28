// Data for Nina's 12 Months Journey & Birthday Celebration
// Baby: Nguyễn Ngọc Minh Thư (Nina) - Sinh: 17/11/2025 - 1 Tuổi (9.6kg, 76cm)

const NINA_PROFILE = {
    fullName: "Nguyễn Ngọc Minh Thư",
    nickname: "Nina",
    birthDate: "17/11/2025",
    currentAge: "1 Tuổi (Tròn 365 Ngày)",
    weight: "9.6 kg",
    height: "76 cm",
    parentIntro: `Hôm nay, con tròn 1 tuổi! Tròn 365 ngày trước, con chính thức đặt chân đến thế giới này trong vòng tay yêu thương vô bờ bến của ba mẹ. Một năm qua là một hành trình kỳ diệu, đong đầy những tiếng cười, ánh mắt bỡ ngỡ và cả những bước phát triển tuyệt diệu của con.`
};

const MONTHS_DATA = [
    {
        month: 1,
        time: "17/11/2025 - 17/12/2025",
        badge: "Lời Chào Thế Giới",
        icon: "🍼",
        title: "Thiên Thần Bé Nhỏ Chào Đời",
        weight: "3.2 kg ➔ 4.2 kg",
        height: "50 cm ➔ 53 cm",
        highlight: "Tiếng khóc đầu đời & cái ngáp xíu xiu",
        description: `Ngày 17/11/2025, khoảnh khắc con cất tiếng khóc chào đời là giây phút kỳ diệu nhất cuộc đời ba mẹ. Bàn tay con nhỏ xíu xiu nắm chặt lấy ngón tay mẹ không rời. Những ngày đầu, con chủ yếu ngủ ngoan trong chiếc kén mềm mại, thỉnh thoảng chúm chím môi cười trong mơ làm tim ba mẹ tan chảy.`
    },
    {
        month: 2,
        time: "17/12/2025 - 17/01/2026",
        badge: "Nụ Cười Đầu Đời",
        icon: "✨",
        title: "Ánh Mắt Bỡ Ngỡ & Biết Hóng Chuyện",
        weight: "5.1 kg",
        height: "56 cm",
        highlight: "Nụ cười xã hội đầu tiên tặng mẹ",
        description: `Nina của ba mẹ bắt đầu biết 'hóng chuyện'! Đôi mắt to tròn đen láy dõi theo từng bước chân của mẹ khắp phòng. Con biết phản xạ cười toe toét mỗi khi ba thơm má và trò chuyện rù rì. Những âm thanh 'ê... a...' ngọt ngào đầu tiên bắt đầu vang khắp căn nhà nhỏ.`
    },
    {
        month: 3,
        time: "17/01/2026 - 17/02/2026",
        badge: "Tập Lẫy Kiên Cường",
        icon: "🌸",
        title: "Tummy Time Cừ Khôi & Đôi Má Phúng Phính",
        weight: "5.9 kg",
        height: "59 cm",
        highlight: "Tự xoay người lẫy thành công",
        description: `Tháng thứ 3, con tích cực tập nằm sấp và ngẩng cao đầu một cách đầy kiêu hãnh. Sau bao nhiêu lần dồn sức, con đã tự mình lật úp người thành công trong tràng pháo tay giòn giã của cả nhà! Đôi má sữa trắng hồng phúng phính nhìn chỉ muốn cắn yêu một miếng thôi.`
    },
    {
        month: 4,
        time: "17/02/2026 - 17/03/2026",
        badge: "Cười Giòn Tan",
        icon: "🎈",
        title: "Tiếng Cười Giòn Tan & Khám Phá Thế Giới",
        weight: "6.6 kg",
        height: "62.5 cm",
        highlight: "Cười thành tiếng khanh khách",
        description: `Căn nhà lúc nào cũng rộn rã tiếng cười của Nina. Chỉ cần ba cù nhẹ vào bụng hay chơi trò trốn tìm là con cười ngặt nghẽo phát ra âm thanh giòn tan. Đôi bàn tay nhỏ đã khéo léo hơn, biết với lấy xúc xắc lục lạc, lắc lư theo nhịp điệu cực kỳ thích thú.`
    },
    {
        month: 5,
        time: "17/03/2026 - 17/04/2026",
        badge: "Gặm Chân Tinh Nghịch",
        icon: "🦶",
        title: "Lăn Lộn Muôn Nơi & Phát Hiện Đôi Bàn Chân",
        weight: "7.2 kg",
        height: "65 cm",
        highlight: "Thế giới tròn xoe trên chiếc giường nhỏ",
        description: `Chiếc giường ngủ trở thành sàn diễn xiếc của Nina! Con lăn tròn từ góc này sang góc kia trong nháy mắt. Đặc biệt, con phát hiện ra mình có... hai bàn chân xinh xắn, thế là con thích thú túm chặt lấy ngón chân rồi kéo lên miệng gặm ngon lành với vẻ mặt vô cùng đắc chí.`
    },
    {
        month: 6,
        time: "17/04/2026 - 17/05/2026",
        badge: "Bữa Ăn Dặm Đầu Đời",
        icon: "🥣",
        title: "Cháo Ngọt Ngào & Chiếc Răng Sữa Nhỏ",
        weight: "7.8 kg",
        height: "67.5 cm",
        highlight: "Chiếc răng cửa đầu tiên nhú lên",
        description: `Cột mốc 6 tháng đón chào thìa bột ngọt đầu đời của con. Con tò mò liếm môi, mắt mở to ngạc nhiên rồi hào hứng nuốt ừng ực. Cũng trong tháng này, một mầm răng trắng tinh như hạt bắp non bắt đầu nhú lên ở hàm dưới, biến nụ cười của Nina thành 'nụ cười sún' siêu cưng!`
    },
    {
        month: 7,
        time: "17/05/2026 - 17/06/2026",
        badge: "Tự Ngồi Vững Vàng",
        icon: "🧸",
        title: "Tự Ngồi Chơi & Tiếng Gọi 'Ba Ba... Ma Ma'",
        weight: "8.3 kg",
        height: "69.5 cm",
        highlight: "Bập bẹ gọi ba mẹ đầu đời",
        description: `Nina đã có thể tự ngồi vững vàng giữa đống thú bông mà không cần gối chặn phía sau. Bàn tay khéo léo chuyển đồ chơi từ tay này sang tay kia. Giây phút con bất ngờ bập bẹ hai tiếng 'Ma... Ma...' và 'Ba... Ba...', cả ba và mẹ đều xúc động rơm rớm nước mắt vì hạnh phúc.`
    },
    {
        month: 8,
        time: "17/06/2026 - 17/07/2026",
        badge: "Bò Siêu Tốc Độ",
        icon: "🚀",
        title: "Tay Đua Bò Vô Địch Khắp Nhà",
        weight: "8.7 kg",
        height: "71 cm",
        highlight: "Tốc độ ánh sáng bò bám đuôi mẹ",
        description: `Không còn trườn nữa, Nina chính thức trở thành 'tay đua bò bốn bánh' siêu tốc! Mẹ vừa bước ra khỏi phòng là sau lưng đã thấy một chú sâu nhỏ bò thoăn thoắt bám theo ôm lấy chân mẹ. Mọi ngăn kéo tủ thấp và giỏ đồ chơi trong nhà đều trở thành vùng đất kỳ thú để con khám phá.`
    },
    {
        month: 9,
        time: "17/07/2026 - 17/08/2026",
        badge: "Đứng Vịn Tự Tin",
        icon: "⭐",
        title: "Vịn Tay Đứng Dậy & Trò Chơi Ú Oà",
        weight: "9.0 kg",
        height: "72.5 cm",
        highlight: "Vỗ tay hoan hô & nhún nhảy theo nhạc",
        description: `Đôi chân nhỏ của con ngày càng cứng cáp hơn. Con biết bám vào mép ghế sofa, bàn trà để tự mình đứng thẳng dậy. Mỗi lần đứng lên được là con lại cười híp mắt, tự vỗ tay khen mình 'hoan hô'! Trò chơi con mê nhất lúc này là 'Ú... Oà' với ba mỗi tối trước khi ngủ.`
    },
    {
        month: 10,
        time: "17/08/2026 - 17/09/2026",
        badge: "Chập Chững Bước Đi",
        icon: "👣",
        title: "Những Bước Chân Đầu Tiên & Vẫy Tay Chào",
        weight: "9.2 kg",
        height: "74 cm",
        highlight: "1, 2 bước đi thần thánh về phía ba mẹ",
        description: `Dũng cảm buông tay khỏi thành ghế, Nina đứng thăng bằng giữa nhà rồi chập chững bước 1, 2 bước lao thẳng vào vòng tay đón chờ của mẹ. Cả nhà cùng vỡ oà sung sướng! Con còn học được cử chỉ vẫy tay 'Bye Bye' cực ngọt ngào và biết chu môi thơm gió tặng ba mỗi sáng.`
    },
    {
        month: 11,
        time: "17/09/2026 - 17/10/2026",
        badge: "Cô Bé Lí Lắc",
        icon: "📚",
        title: "Trợ Thủ Đắc Lực & Nghe Hiểu Mọi Lời",
        weight: "9.4 kg",
        height: "75 cm",
        highlight: "Chỉ đúng mắt mũi miệng & con vật yêu thích",
        description: `Nina của ba mẹ thông minh lắm nhé! Mẹ hỏi 'Mắt con đâu? Mũi con đâu?' là ngón tay xinh xinh chỉ ngay tắp lự. Con rất thích lật từng trang truyện tranh nhiều màu sắc, lắng nghe mẹ kể chuyện và bắt chước tiếng kêu 'meo meo', 'gâu gâu'. Con đã hiểu hầu hết những gì người lớn dặn dò.`
    },
    {
        month: 12,
        time: "17/10/2026 - 17/11/2026",
        badge: "Tròn 1 Tuổi Rực Rỡ",
        icon: "👑",
        title: "Công Chúa Nhỏ Độc Lập - Mừng Nina 1 Tuổi!",
        weight: "9.6 kg (Chuẩn trộm vía)",
        height: "76 cm (Dáng người mẫu cưng)",
        highlight: "Tự tin bước đi & nụ cười tỏa nắng",
        description: `Hôm nay, ngày 17/11/2026, tròn 365 ngày kỳ diệu con đến bên cuộc đời ba mẹ! Từ một sinh linh bé bỏng còn đỏ hỏn, nay Nina đã là cô bé 1 tuổi lanh lợi, tự tin bước đi, biết hờn dỗi, biết yêu thương và luôn nở nụ cười rực rỡ như nắng mai. Cảm ơn thiên thần nhỏ đã chọn ba mẹ!`
    }
];

const DEFAULT_WISHES = [
    {
        id: 1,
        author: "Ba & Mẹ Yêu",
        role: "Ba Mẹ",
        date: "Hôm nay",
        avatarColor: "bg-pink-100 text-pink-600",
        content: "Chúc công chúa nhỏ Nina của ba mẹ tròn 1 tuổi thật nhiều sức khỏe, luôn vui tươi, ăn ngoan chóng lớn và một đời an nhiên, hạnh phúc trong vòng tay yêu thương của cả nhà! Yêu con gái nhất trên đời! 💖🎂"
    },
    {
        id: 2,
        author: "Ông Bà Nội",
        role: "Ông Bà",
        date: "Hôm nay",
        avatarColor: "bg-amber-100 text-amber-700",
        content: "Mừng cháu gái cưng tròn 1 tuổi! Chúc Nina trộm vía hay ăn chóng lớn, thông minh, ngoan ngoãn và luôn là niềm vui rộn rã của ông bà và ba mẹ nhé! 🌸"
    },
    {
        id: 3,
        author: "Ông Bà Ngoại",
        role: "Ông Bà",
        date: "Hôm nay",
        avatarColor: "bg-purple-100 text-purple-700",
        content: "Chúc bé cưng Minh Thư 1 tuổi mau ăn chóng lớn, chân cứng đá mềm, càng lớn càng xinh đẹp, nết na và thông minh tài giỏi nha cục cưng của ngoại! 💕"
    },
    {
        id: 4,
        author: "Dì Út & Cậu",
        role: "Gia đình",
        date: "Hôm nay",
        avatarColor: "bg-rose-100 text-rose-600",
        content: "Happy 1st Birthday em bé Nina! Chúc cháu gái rượu luôn xinh xắn rạng ngời, mỗi ngày đều đầy ắp tiếng cười giòn tan. Dì Út chuẩn bị quà to bự chờ con nè! 🎁✨"
    }
];

window.NINA_PROFILE = NINA_PROFILE;
window.MONTHS_DATA = MONTHS_DATA;
window.DEFAULT_WISHES = DEFAULT_WISHES;
