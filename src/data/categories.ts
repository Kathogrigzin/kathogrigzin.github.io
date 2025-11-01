export interface Category {
  id: string; // 英文ID，用於URL
  name: string; // 中文名稱
  name_ti: string;
  imageUrl: string; // 封面圖片路徑
  description: string; // 簡短描述
}

// 假設圖片都放在 public/images/categories/ 資料夾下
export const categories: Category[] = [
  { id: 'guru-yoga', name: '上師瑜伽', name_ti: 'བླ་རྣམ་རྒྱུན་འཁྱེར་གྱི་སྐོར།', imageUrl: '/images/categories/guru-yoga.jpg', description: '甚深上師相應法' },
  { id: 'dohas', name: '道歌', name_ti: 'ཞལ་གདམས་མགུར་གླུ་འི་སྐོར།', imageUrl: '/images/categories/dohas.png', description: '全心全力而實行佛法，上師父視作永遠怙主，佛法口訣當永遠財物，累積福德作永遠良田。' },
  { id: 'autobiography', name: '自傳', name_ti: 'རང་རྣམ་གྱི་སྐོར།', imageUrl: '/images/categories/autobiography.png', description: '才旺諾布自述經歷' },  
  { id: 'biography', name: '傳紀', name_ti: 'རྣམ་ཐར་གྱི་སྐོར།', imageUrl: '/images/categories/biography.png', description: '才旺諾布生平事蹟' },
  { id: 'guhya-jnanakali', name: '密慧佛母', name_ti: 'མཁའ་འགྲོ་གསང་ཡེའི་སྐོར།', imageUrl: '/images/categories/guhya-jnanakali.jpg', description: '密慧佛母的智慧' },
  { id: 'spontaneous-aspirations', name: '祈願任運', name_ti: 'དགོངས་གཏེར་བསམ་པ་ལྷུན་གྲུབ་མའི་ཆོས་སྐོར།', imageUrl: '/images/categories/spontaneous-aspirations.png', description: '蓮師前往西南羅剎國前託付王子牟尼贊普之教言' },
  { id: 'astrology', name: '星相算命', name_ti: 'རྩིས་དང་སྒྲ་ཡི་སྐོར།', imageUrl: '/images/categories/astrology.jpg', description: '少壯之士志弘遠，數理明晰通算學，欲入此門求究竟，此乃至寶眾所需。' }, 
  { id: 'sadhana', name: '法行儀軌', name_ti: 'ཆོ་ག་ཆོས་སྤྱོད་ཀྱི་སྐོར།', imageUrl: '/images/categories/sadhana.png', description: '此等暇滿人生極難得，任誰擁有能獲究竟義。 ' },
  { id: 'aspiration', name: '祈願', name_ti: 'སྨོན་ཚིག་གི་སྐོར།', imageUrl: '/images/categories/aspiration.jpg', description: '祈願文集' },
  { id: 'empowerment', name: '灌頂', name_ti: 'དབང་ཆོག་གི་སྐོར།', imageUrl: '/images/categories/empowerment.jpg', description: '灌頂布壇儀式 須經上師允許方可閱覽' },
  { id: 'history', name: '歷史', name_ti: 'དེབ་ཐེར་དང་ཆོས་འབྱུང་གི་སྐོར།', imageUrl: '/images/categories/history.jpg', description: '歷代王統文獻、條約' },
  { id: 'clarifications', name: '解疑', name_ti: 'དོགས་སེལ་གྱི་སྐོར།', imageUrl: '/images/categories/clarifications.jpeg', description: '問答形式之教法解析' },
  { id: 'vajrakilaya', name: '普巴金剛', name_ti: 'ཕུར་བའི་སྐོར།', imageUrl: '/images/categories/vajrakilaya.png', description: '摧破障礙甚深緣想' },
  { id: 'longevity-prayer', name: '長壽祈請文', name_ti: 'གསོལ་འདེབས་ཞབས་བརྟན་གྱི་སྐོར།', imageUrl: '/images/categories/longevity-prayer.jpg', description: '為上師祈求長壽' },
  { id: 'prayer', name: '祈請文', name_ti: 'བརྒྱུད་འདེབས་དང་གསོལ་འདེབས་ཀྱི་སྐོར།', imageUrl: '/images/categories/prayer.jpeg', description: '祈請傳承祖師大德' },
  { id: 'instructions', name: '導引文', name_ti: 'ཁྲིད་ཡིག་གི་སྐོར།', imageUrl: '/images/categories/instructions.jpg', description: '實修引導大手印解脫門等' },
  { id: 'recitation', name: '念誦文', name_ti: 'བསྙེན་ཡིག་གི་སྐོར།', imageUrl: '/images/categories/recitation.jpg', description: '日常課誦儀軌文' },
  { id: 'sanskrit', name: '梵文', name_ti: 'སྒྲ་ཡི་སྐོར།', imageUrl: '/images/categories/sanskrit.jpg', description: '梵文規則研究' },
  { id: 'aspiration', name: '預言', name_ti: 'ལུང་བསྟན་གྱི་སྐོར།', imageUrl: '/images/categories/prophecy.jpg', description: '總體西藏與上師、寺院之預言' },
  { id: 'letter', name: '信箋', name_ti: 'ཆབ་ཤོག་གི་སྐོར།', imageUrl: '/images/categories/letter.jpg', description: '大師之書信往來' },
];
