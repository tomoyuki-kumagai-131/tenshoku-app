import type { Job } from '@tenshoku/types';

// Job templates
const jobTemplates = [
  { title: 'フロントエンドエンジニア', salary: '500万円〜800万円', type: 'frontend' },
  { title: 'バックエンドエンジニア', salary: '600万円〜900万円', type: 'backend' },
  { title: 'フルスタックエンジニア', salary: '550万円〜850万円', type: 'fullstack' },
  { title: 'データエンジニア', salary: '600万円〜950万円', type: 'data' },
  { title: 'モバイルアプリエンジニア', salary: '500万円〜750万円', type: 'mobile' },
  { title: 'SREエンジニア', salary: '650万円〜1000万円', type: 'sre' },
  { title: 'セキュリティエンジニア', salary: '600万円〜1000万円', type: 'security' },
  { title: 'MLエンジニア', salary: '700万円〜1200万円', type: 'ml' },
  { title: 'DevOpsエンジニア', salary: '550万円〜900万円', type: 'devops' },
  { title: 'QAエンジニア', salary: '450万円〜700万円', type: 'qa' },
  { title: 'テックリード', salary: '800万円〜1300万円', type: 'lead' },
  { title: 'エンジニアリングマネージャー', salary: '900万円〜1500万円', type: 'em' },
  { title: 'プロダクトマネージャー', salary: '700万円〜1200万円', type: 'pm' },
  { title: 'UIデザイナー', salary: '450万円〜750万円', type: 'design' },
  { title: 'UXデザイナー', salary: '500万円〜800万円', type: 'ux' },
];

// Companies
const companies = [
  { name: '株式会社テックイノベーション', location: '東京都渋谷区' },
  { name: '株式会社クラウドソリューションズ', location: '東京都港区' },
  { name: 'スタートアップラボ株式会社', location: '大阪府大阪市' },
  { name: '株式会社ビッグデータ', location: 'フルリモート' },
  { name: '株式会社アプリクリエイト', location: '福岡県福岡市' },
  { name: '株式会社インフラテック', location: '東京都千代田区' },
  { name: 'グローバルテック株式会社', location: '東京都新宿区' },
  { name: '株式会社AIラボ', location: '東京都文京区' },
  { name: 'フィンテック株式会社', location: '東京都中央区' },
  { name: '株式会社ヘルステック', location: '神奈川県横浜市' },
  { name: 'エドテック株式会社', location: '京都府京都市' },
  { name: '株式会社モビリティ', location: '愛知県名古屋市' },
  { name: 'リテールテック株式会社', location: '大阪府大阪市' },
  { name: '株式会社メディアプラス', location: 'フルリモート' },
  { name: 'セキュアネット株式会社', location: '東京都品川区' },
  { name: '株式会社クリエイティブワークス', location: '福岡県福岡市' },
  { name: 'データドリブン株式会社', location: 'フルリモート' },
  { name: '株式会社スマートシティ', location: '北海道札幌市' },
  { name: 'エンタープライズ株式会社', location: '東京都千代田区' },
  { name: '株式会社ネクストジェネレーション', location: '東京都渋谷区' },
];

// Job descriptions by type
const descriptions: Record<string, string> = {
  frontend:
    'モダンなフロントエンド技術を使用したWebアプリケーション開発をお任せします。React、TypeScriptを中心とした開発環境で、ユーザー体験を重視したプロダクト開発に携わっていただきます。',
  backend:
    '大規模なクラウドサービスのバックエンド開発をリードしていただきます。マイクロサービスアーキテクチャの設計・実装から、パフォーマンス最適化まで幅広く担当していただきます。',
  fullstack:
    '新規プロダクトの立ち上げから運用まで、フルスタックで開発に携わっていただきます。少人数チームでスピード感を持って開発を進める環境です。',
  data: '大規模データ基盤の構築・運用を担当していただきます。データパイプラインの設計から、分析基盤の整備まで幅広く携わっていただきます。',
  mobile:
    'iOS/Androidアプリの開発を担当していただきます。Swift、Kotlinを使用したネイティブアプリ開発、またはFlutterを使用したクロスプラットフォーム開発に携わります。',
  sre: '大規模サービスの信頼性向上を担当していただきます。インフラ設計、モニタリング、障害対応、自動化など、SRE全般の業務に携わっていただきます。',
  security:
    '企業のセキュリティ対策全般を担当していただきます。脆弱性診断、セキュリティ監視、インシデント対応など幅広い業務に携わります。',
  ml: '機械学習モデルの開発・運用を担当していただきます。データ分析からモデル構築、本番環境へのデプロイまで一貫して携わります。',
  devops:
    '開発・運用の効率化を推進していただきます。CI/CDパイプラインの構築、インフラの自動化、開発環境の改善に取り組みます。',
  qa: 'プロダクトの品質保証を担当していただきます。テスト設計、自動テストの構築、品質改善の提案など幅広く携わります。',
  lead: 'エンジニアチームの技術的なリーダーシップを担っていただきます。技術選定、アーキテクチャ設計、メンバーの育成に携わります。',
  em: 'エンジニアチームのマネジメントを担当していただきます。チームビルディング、目標設定、評価、採用など幅広い業務に携わります。',
  pm: 'プロダクトの企画・開発をリードしていただきます。要件定義、ロードマップ策定、ステークホルダーとの調整を担当します。',
  design:
    'Webサービス・アプリのUIデザインを担当していただきます。Figmaを使用したデザイン制作、デザインシステムの構築に携わります。',
  ux: 'ユーザー体験の設計を担当していただきます。ユーザーリサーチ、プロトタイピング、ユーザビリティテストに携わります。',
};

// Requirements by job type
const requirementsByType: Record<string, string[]> = {
  frontend: [
    'React/Vue.js等のフレームワーク経験3年以上',
    'TypeScriptの実務経験',
    'Git/GitHubを使用したチーム開発経験',
    'レスポンシブデザインの実装経験',
  ],
  backend: [
    'Go/Python/Node.js等でのバックエンド開発経験5年以上',
    'AWSまたはGCPの実務経験',
    'データベース設計・最適化の経験',
    'CI/CDパイプラインの構築経験',
  ],
  fullstack: [
    'Web開発経験3年以上',
    'フロントエンドとバックエンド両方の経験',
    'クラウドサービスの利用経験',
    'アジャイル開発の経験',
  ],
  data: [
    'データエンジニアリング経験3年以上',
    'SQL、Python等のプログラミングスキル',
    'Spark、Airflow等の経験',
    'データウェアハウスの設計経験',
  ],
  mobile: [
    'iOS/Androidアプリ開発経験2年以上',
    'Swift、Kotlin、またはFlutterの経験',
    'App Store/Google Playへのリリース経験',
    'UI/UXへの強い関心',
  ],
  sre: [
    'SRE/インフラエンジニア経験5年以上',
    'Kubernetes、Docker等のコンテナ技術',
    'Terraform等のIaCツールの経験',
    'オンコール対応の経験',
  ],
  security: [
    'セキュリティエンジニア経験3年以上',
    '脆弱性診断の経験',
    'セキュリティ監視ツールの運用経験',
    'セキュリティ資格保有者歓迎',
  ],
  ml: [
    '機械学習エンジニア経験3年以上',
    'Python、TensorFlow/PyTorchの経験',
    'MLOpsの知識',
    '統計学・数学の知識',
  ],
  devops: [
    'DevOpsエンジニア経験3年以上',
    'CI/CDツールの構築経験',
    'クラウドインフラの運用経験',
    'スクリプト言語の経験',
  ],
  qa: [
    'QAエンジニア経験2年以上',
    'テスト設計・実行の経験',
    '自動テストツールの経験',
    '品質改善の提案経験',
  ],
  lead: [
    'エンジニア経験7年以上',
    'チームリーダー経験',
    'アーキテクチャ設計の経験',
    '技術選定の経験',
  ],
  em: [
    'エンジニア経験5年以上',
    'マネジメント経験2年以上',
    'チームビルディングの経験',
    '採用・評価の経験',
  ],
  pm: [
    'PM経験3年以上',
    'Webサービスの企画・開発経験',
    'ステークホルダー調整の経験',
    'データ分析スキル',
  ],
  design: [
    'UIデザイン経験3年以上',
    'Figma/Sketchの実務経験',
    'デザインシステム構築の経験',
    'フロントエンド知識歓迎',
  ],
  ux: [
    'UXデザイン経験3年以上',
    'ユーザーリサーチの経験',
    'プロトタイピングツールの経験',
    '定量・定性分析の経験',
  ],
};

// Skills by job type
const skillsByType: Record<string, string[]> = {
  frontend: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  backend: ['Go', 'Python', 'Node.js', 'Java', 'AWS', 'GCP', 'PostgreSQL', 'MySQL', 'Redis'],
  fullstack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
  data: ['Python', 'SQL', 'Spark', 'Airflow', 'BigQuery', 'Snowflake', 'dbt', 'AWS'],
  mobile: ['Swift', 'Kotlin', 'Flutter', 'React Native', 'iOS', 'Android', 'Firebase'],
  sre: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'GCP', 'Prometheus', 'Grafana', 'Linux'],
  security: ['AWS', 'Azure', 'Splunk', 'SIEM', 'Linux', 'Python', 'ネットワーク', 'クラウドセキュリティ'],
  ml: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'MLflow', 'AWS SageMaker', 'Kubernetes'],
  devops: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform', 'Ansible', 'AWS', 'GCP'],
  qa: ['Selenium', 'Cypress', 'Jest', 'TestRail', 'JIRA', 'Python', 'JavaScript'],
  lead: ['React', 'Node.js', 'AWS', 'システム設計', 'アーキテクチャ', 'TypeScript', 'Go'],
  em: ['アジャイル', 'スクラム', 'チームマネジメント', 'プロジェクト管理', '1on1', '採用'],
  pm: ['プロダクト戦略', 'ロードマップ', 'データ分析', 'SQL', 'JIRA', 'Figma', 'ユーザーインタビュー'],
  design: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'デザインシステム', 'UI設計'],
  ux: ['ユーザーリサーチ', 'ワイヤーフレーム', 'プロトタイピング', 'Figma', 'ユーザビリティテスト', 'A/Bテスト'],
};

// Benefits list
const benefitsList = [
  ['フルリモート可', 'フレックスタイム制', '書籍購入補助', '資格取得支援', '年間休日125日'],
  ['ハイブリッドワーク', 'ストックオプション', '健康診断充実', '社内勉強会', '副業OK'],
  ['完全フルリモート', '年収1000万円以上も可', '裁量労働制', '最新技術の導入積極的'],
  ['地方移住支援', 'フレックスタイム', '最新デバイス支給', 'カンファレンス参加支援'],
  ['高年収', 'リモートワーク可', '技術投資惜しまない', 'グローバルチーム'],
  ['週休3日制度あり', '育休取得実績多数', '社員食堂あり', '交通費全額支給'],
  ['401k制度', '社内バー', 'ペット同伴可', 'ジム利用補助'],
  ['フルフレックス', '有給消化率90%以上', 'メンター制度', '1on1充実'],
];

// Generate jobs
function generateJobs(count: number = 50): Job[] {
  const jobs: Job[] = [];

  for (let i = 0; i < count; i++) {
    const template = jobTemplates[i % jobTemplates.length];
    const company = companies[i % companies.length];
    const benefits = benefitsList[i % benefitsList.length];
    const skills = skillsByType[template.type];
    const baseDate = new Date('2024-01-20');
    baseDate.setDate(baseDate.getDate() - i);

    // Slightly vary skills for each job
    const jobSkills = skills.slice(0, 4 + (i % 4));

    jobs.push({
      id: `job-${i + 1}`,
      title: template.title,
      company: company.name,
      location: company.location,
      salary: template.salary,
      description: descriptions[template.type],
      requirements: requirementsByType[template.type],
      benefits: benefits,
      skills: jobSkills,
      employmentType: i % 10 === 0 ? '契約社員' : i % 15 === 0 ? '業務委託' : '正社員',
      imageUrl: `https://picsum.photos/seed/job${i + 1}/400/250`,
      createdAt: baseDate.toISOString(),
    });
  }

  return jobs;
}

// Mock jobs database
export const jobs: Job[] = generateJobs();

// Get all unique skills
export function getAllSkills(): string[] {
  const skillSet = new Set<string>();
  jobs.forEach((job) => {
    job.skills.forEach((skill) => skillSet.add(skill));
  });
  return Array.from(skillSet).sort();
}

// Helper functions
export function findJobById(id: string): Job | undefined {
  return jobs.find((job) => job.id === id);
}

export function searchJobs(options: {
  search?: string;
  location?: string;
  skills?: string[];
  page?: number;
  limit?: number;
  sort?: 'newest' | 'recommended';
}) {
  const { search = '', location = '', skills = [], page = 1, limit = 9, sort = 'recommended' } = options;

  let filtered = [...jobs];

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchLower))
    );
  }

  if (location && location !== 'all') {
    filtered = filtered.filter((job) => job.location.includes(location));
  }

  // Filter by skills
  if (skills.length > 0) {
    filtered = filtered.filter((job) =>
      skills.some((skill) =>
        job.skills.some((jobSkill) => jobSkill.toLowerCase() === skill.toLowerCase())
      )
    );
  }

  // Sort jobs
  if (sort === 'newest') {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else {
    // 'recommended' - shuffle based on a consistent seed for better UX
    // Using job id for deterministic "recommended" order
    filtered.sort((a, b) => {
      const scoreA = parseInt(a.id.replace('job-', '')) % 7;
      const scoreB = parseInt(b.id.replace('job-', '')) % 7;
      return scoreA - scoreB;
    });
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedJobs = filtered.slice(start, end);

  return {
    jobs: paginatedJobs,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
}
