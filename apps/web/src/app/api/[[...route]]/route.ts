import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';

// ============== Types ==============

interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  employmentType: string;
  description: string;
  requirements: string[];
  skills: string[];
  benefits: string[];
  imageUrl: string;
  createdAt: string;
}

interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  name: string;
  phone: string;
  address: string;
  message?: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
}

interface Favorite {
  id: string;
  userId: string;
  jobId: string;
  createdAt: string;
}

interface Notification {
  id: string;
  userId: string;
  type: 'application_viewed' | 'application_status' | 'new_job' | 'scout' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============== Mock Data ==============

const users: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'テスト太郎',
    phone: '090-1234-5678',
    address: '東京都渋谷区',
    createdAt: '2024-01-15T00:00:00Z',
  },
];

const jobs: Job[] = [
  {
    id: '1',
    title: 'シニアフロントエンドエンジニア',
    company: '株式会社テックイノベーション',
    location: '東京都渋谷区',
    salary: '600万円〜900万円',
    employmentType: '正社員',
    description: 'モダンなフロントエンド技術を駆使して、ユーザー体験を向上させるWebアプリケーションの開発をリードしていただきます。',
    requirements: ['React/TypeScriptでの開発経験3年以上', 'チーム開発経験', 'コードレビューの経験', 'パフォーマンス最適化の知識'],
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    benefits: ['フルリモートワーク可', 'フレックスタイム制', '書籍購入補助', 'カンファレンス参加支援'],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '2',
    title: 'バックエンドエンジニア',
    company: '株式会社クラウドソリューションズ',
    location: '大阪府大阪市',
    salary: '500万円〜800万円',
    employmentType: '正社員',
    description: 'クラウドネイティブなバックエンドシステムの設計・開発を担当していただきます。',
    requirements: ['バックエンド開発経験3年以上', 'Go または Python での開発経験', 'RDBMSの設計・運用経験', 'クラウドサービスの利用経験'],
    skills: ['Go', 'Python', 'AWS', 'Kubernetes', 'PostgreSQL'],
    benefits: ['リモートワーク週3日', '技術書籍購入制度', '資格取得支援', '副業OK'],
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800',
    createdAt: '2024-01-19T00:00:00Z',
  },
  {
    id: '3',
    title: 'フルスタックエンジニア',
    company: 'グローバルテック株式会社',
    location: 'フルリモート',
    salary: '550万円〜850万円',
    employmentType: '正社員',
    description: 'フロントエンドからバックエンドまで幅広く開発を担当していただきます。',
    requirements: ['Web開発経験3年以上', 'フロントエンド・バックエンド両方の経験', '自走できる方', '英語でのコミュニケーション可'],
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    benefits: ['完全フルリモート', 'フレックスタイム', '年間休日125日', 'ストックオプション制度'],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    createdAt: '2024-01-18T00:00:00Z',
  },
  {
    id: '4',
    title: 'モバイルアプリエンジニア',
    company: '株式会社アプリファクトリー',
    location: '東京都港区',
    salary: '500万円〜750万円',
    employmentType: '正社員',
    description: 'iOS/Androidアプリの開発を担当していただきます。',
    requirements: ['モバイルアプリ開発経験2年以上', 'React Native または Flutter の経験', 'ストアへのリリース経験', 'UI/UXへの関心'],
    skills: ['React Native', 'TypeScript', 'iOS', 'Android'],
    benefits: ['リモートワーク可', '最新デバイス支給', '勉強会参加支援', '健康診断充実'],
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
    createdAt: '2024-01-17T00:00:00Z',
  },
  {
    id: '5',
    title: 'データサイエンティスト',
    company: '株式会社AIラボ',
    location: '東京都千代田区',
    salary: '700万円〜1200万円',
    employmentType: '正社員',
    description: '機械学習モデルの構築・運用、データ分析基盤の整備を担当していただきます。',
    requirements: ['データサイエンス実務経験3年以上', 'Python/Rでの分析経験', '機械学習モデルの構築経験', 'ビジネスサイドとの折衝経験'],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'AWS'],
    benefits: ['フレックスタイム', '論文投稿支援', 'GPU環境完備', '学会参加費用支給'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    createdAt: '2024-01-16T00:00:00Z',
  },
  {
    id: '6',
    title: 'DevOpsエンジニア',
    company: '株式会社インフラマスター',
    location: '福岡県福岡市',
    salary: '550万円〜800万円',
    employmentType: '正社員',
    description: 'CI/CDパイプラインの構築・運用、インフラの自動化を担当していただきます。',
    requirements: ['インフラ/DevOps経験3年以上', 'Terraform/Ansibleの経験', 'Kubernetes運用経験', '監視・ログ基盤の構築経験'],
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'GitHub Actions'],
    benefits: ['リモートワーク中心', '資格手当あり', '技術カンファレンス登壇支援', '副業OK'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '7',
    title: 'Webエンジニア（PHP）',
    company: '株式会社Webクリエイト',
    location: '東京都新宿区',
    salary: '400万円〜600万円',
    employmentType: '正社員',
    description: 'LaravelフレームワークをベースとしたWebアプリケーションの開発を行っていただきます。',
    requirements: ['PHP開発経験2年以上', 'Laravelの実務経験', 'MySQLの経験', 'Git経験'],
    skills: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Docker'],
    benefits: ['リモートワーク可', 'フレックスタイム制', '資格取得支援', '社内勉強会あり'],
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    createdAt: '2024-01-14T00:00:00Z',
  },
  {
    id: '8',
    title: 'iOSエンジニア',
    company: '株式会社モバイルワークス',
    location: '東京都品川区',
    salary: '550万円〜800万円',
    employmentType: '正社員',
    description: 'SwiftUIを使用した最新のiOSアプリ開発を担当していただきます。',
    requirements: ['iOS開発経験3年以上', 'Swift/SwiftUIの経験', 'App Store申請経験', 'CI/CD経験'],
    skills: ['Swift', 'SwiftUI', 'iOS', 'Xcode', 'Firebase'],
    benefits: ['フルリモート可', '最新Mac支給', 'WWDC参加支援', '書籍購入補助'],
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    createdAt: '2024-01-13T00:00:00Z',
  },
  {
    id: '9',
    title: 'Androidエンジニア',
    company: '株式会社モバイルワークス',
    location: '東京都品川区',
    salary: '550万円〜800万円',
    employmentType: '正社員',
    description: 'Kotlin/Jetpack Composeを使用したAndroidアプリ開発を担当していただきます。',
    requirements: ['Android開発経験3年以上', 'Kotlinの実務経験', 'MVVM/MVIアーキテクチャの理解', 'Google Play申請経験'],
    skills: ['Kotlin', 'Android', 'Jetpack Compose', 'Firebase', 'Coroutines'],
    benefits: ['フルリモート可', '最新デバイス支給', 'Google I/O参加支援', '書籍購入補助'],
    imageUrl: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800',
    createdAt: '2024-01-12T00:00:00Z',
  },
  {
    id: '10',
    title: 'セキュリティエンジニア',
    company: '株式会社サイバーシールド',
    location: '東京都千代田区',
    salary: '650万円〜1000万円',
    employmentType: '正社員',
    description: 'Webアプリケーションのセキュリティ診断、脆弱性対策の立案・実施を担当していただきます。',
    requirements: ['セキュリティ関連業務経験3年以上', '脆弱性診断の経験', 'OWASP Top 10の理解', 'セキュリティ資格保有者優遇'],
    skills: ['セキュリティ診断', 'ペネトレーションテスト', 'AWS', 'Linux', 'Python'],
    benefits: ['リモートワーク可', '資格取得支援', 'セキュリティカンファレンス参加支援', '高スペックPC支給'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    createdAt: '2024-01-11T00:00:00Z',
  },
  {
    id: '11',
    title: 'SREエンジニア',
    company: '株式会社リライアブルシステムズ',
    location: 'フルリモート',
    salary: '600万円〜950万円',
    employmentType: '正社員',
    description: 'サービスの信頼性向上のため、監視基盤の構築、障害対応の自動化を担当していただきます。',
    requirements: ['SRE/インフラ経験3年以上', 'Prometheus/Grafanaの経験', 'オンコール対応の経験', 'IaCの実務経験'],
    skills: ['Kubernetes', 'Prometheus', 'Grafana', 'Terraform', 'Go'],
    benefits: ['完全フルリモート', 'フレックスタイム', 'オンコール手当あり', '技術書籍購入制度'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: '12',
    title: 'QAエンジニア',
    company: '株式会社クオリティファースト',
    location: '神奈川県横浜市',
    salary: '450万円〜700万円',
    employmentType: '正社員',
    description: 'Webアプリケーションの品質保証を担当していただきます。',
    requirements: ['QA経験2年以上', 'テスト設計の経験', '自動テストの経験', 'アジャイル開発の理解'],
    skills: ['Selenium', 'Cypress', 'Jest', 'TestRail', 'JIRA'],
    benefits: ['リモートワーク週3日', 'フレックスタイム制', '資格取得支援', '社内勉強会'],
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    createdAt: '2024-01-09T00:00:00Z',
  },
  {
    id: '13',
    title: 'MLエンジニア',
    company: '株式会社ディープラーニング研究所',
    location: '東京都文京区',
    salary: '700万円〜1100万円',
    employmentType: '正社員',
    description: '機械学習モデルの開発・本番環境へのデプロイを担当していただきます。',
    requirements: ['ML/DL開発経験3年以上', 'Pythonでのモデル開発経験', 'MLOpsの知識', '論文読解能力'],
    skills: ['Python', 'PyTorch', 'TensorFlow', 'MLflow', 'Kubernetes'],
    benefits: ['フレックスタイム', 'GPU環境完備', '学会参加支援', '論文投稿奨励金'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    createdAt: '2024-01-08T00:00:00Z',
  },
  {
    id: '14',
    title: 'ブロックチェーンエンジニア',
    company: '株式会社Web3ラボ',
    location: '東京都港区',
    salary: '650万円〜1200万円',
    employmentType: '正社員',
    description: 'スマートコントラクトの開発、DAppsの構築を担当していただきます。',
    requirements: ['ブロックチェーン開発経験1年以上', 'Solidityの経験', 'Web3.jsの経験', '暗号技術の基礎知識'],
    skills: ['Solidity', 'Ethereum', 'Web3.js', 'React', 'Node.js'],
    benefits: ['フルリモート可', 'トークン報酬制度', 'カンファレンス参加支援', '最新技術へのアクセス'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    createdAt: '2024-01-07T00:00:00Z',
  },
  {
    id: '15',
    title: 'テックリード',
    company: '株式会社プロダクトビルダーズ',
    location: '東京都渋谷区',
    salary: '800万円〜1200万円',
    employmentType: '正社員',
    description: '開発チームの技術的なリードを担当していただきます。',
    requirements: ['開発経験7年以上', 'チームリード経験', 'アーキテクチャ設計経験', '複数言語での開発経験'],
    skills: ['TypeScript', 'Go', 'AWS', 'システム設計', 'チームマネジメント'],
    benefits: ['フルリモート可', 'フレックスタイム', 'ストックオプション', '技術顧問参加可'],
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
    createdAt: '2024-01-06T00:00:00Z',
  },
  {
    id: '16',
    title: 'Rustエンジニア',
    company: '株式会社ハイパフォーマンス',
    location: 'フルリモート',
    salary: '600万円〜1000万円',
    employmentType: '正社員',
    description: '高速・安全なシステム開発をRustで行っていただきます。',
    requirements: ['システムプログラミング経験3年以上', 'Rustの実務経験1年以上', '低レイヤーの知識', '並行処理の理解'],
    skills: ['Rust', 'C++', 'Linux', 'WebAssembly', 'システムプログラミング'],
    benefits: ['完全フルリモート', '高スペックPC支給', 'OSS活動支援', '技術書籍購入制度'],
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800',
    createdAt: '2024-01-05T00:00:00Z',
  },
  {
    id: '17',
    title: 'Scalaエンジニア',
    company: '株式会社ビッグデータソリューションズ',
    location: '東京都港区',
    salary: '600万円〜900万円',
    employmentType: '正社員',
    description: '大規模データ処理基盤の開発をScala/Sparkで行っていただきます。',
    requirements: ['Scala開発経験2年以上', 'Apache Sparkの経験', '関数型プログラミングの理解', '分散システムの知識'],
    skills: ['Scala', 'Apache Spark', 'Kafka', 'AWS', 'Hadoop'],
    benefits: ['リモートワーク可', 'フレックスタイム', '技術カンファレンス参加支援', '書籍購入補助'],
    imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800',
    createdAt: '2024-01-04T00:00:00Z',
  },
  {
    id: '18',
    title: 'Vue.jsエンジニア',
    company: '株式会社フロントエンドラボ',
    location: '大阪府大阪市',
    salary: '450万円〜700万円',
    employmentType: '正社員',
    description: 'Vue.js/Nuxt.jsを使用したWebフロントエンド開発を担当していただきます。',
    requirements: ['Vue.js開発経験2年以上', 'TypeScriptの経験', 'コンポーネント設計の経験', 'REST APIとの連携経験'],
    skills: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS', 'Pinia'],
    benefits: ['リモートワーク週4日', 'フレックスタイム', '勉強会参加支援', '副業OK'],
    imageUrl: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800',
    createdAt: '2024-01-03T00:00:00Z',
  },
  {
    id: '19',
    title: 'ゲームエンジニア（Unity）',
    company: '株式会社ゲームスタジオ',
    location: '東京都目黒区',
    salary: '500万円〜800万円',
    employmentType: '正社員',
    description: 'Unityを使用したモバイルゲームの開発を担当していただきます。',
    requirements: ['Unity開発経験3年以上', 'C#の実務経験', 'モバイルゲームリリース経験', '3Dグラフィックスの知識'],
    skills: ['Unity', 'C#', 'シェーダー', 'iOS', 'Android'],
    benefits: ['フレックスタイム', 'ゲーム購入補助', '最新デバイス支給', '社内ゲーム大会'],
    imageUrl: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '20',
    title: 'クラウドアーキテクト',
    company: '株式会社クラウドコンサルティング',
    location: '東京都千代田区',
    salary: '800万円〜1300万円',
    employmentType: '正社員',
    description: 'クラウドインフラの設計・構築を担当していただきます。',
    requirements: ['クラウド設計経験5年以上', 'AWS/GCP/Azureの資格', 'マルチクラウドの経験', 'コスト最適化の経験'],
    skills: ['AWS', 'GCP', 'Azure', 'Terraform', 'Kubernetes'],
    benefits: ['フルリモート可', '資格取得全額支援', '高年収', '技術顧問参加可'],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '21',
    title: 'Javaエンジニア',
    company: '株式会社エンタープライズシステムズ',
    location: '東京都中央区',
    salary: '500万円〜750万円',
    employmentType: '正社員',
    description: 'Spring Bootを使用した業務システムの開発を担当していただきます。',
    requirements: ['Java開発経験3年以上', 'Spring Bootの経験', 'RDBMSの設計経験', 'チーム開発経験'],
    skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS'],
    benefits: ['リモートワーク週3日', '資格取得支援', '研修制度充実', '退職金制度'],
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    createdAt: '2023-12-31T00:00:00Z',
  },
  {
    id: '22',
    title: 'Rubyエンジニア',
    company: '株式会社Railsショップ',
    location: '京都府京都市',
    salary: '450万円〜700万円',
    employmentType: '正社員',
    description: 'Ruby on Railsを使用したWebアプリケーションの開発を担当していただきます。',
    requirements: ['Ruby/Rails開発経験2年以上', 'RSpecでのテスト経験', 'API設計の経験', 'アジャイル開発経験'],
    skills: ['Ruby', 'Rails', 'PostgreSQL', 'Redis', 'AWS'],
    benefits: ['フルリモート可', 'フレックスタイム', '書籍購入補助', '副業OK'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
    createdAt: '2023-12-30T00:00:00Z',
  },
  {
    id: '23',
    title: 'データエンジニア',
    company: '株式会社データパイプライン',
    location: '東京都港区',
    salary: '600万円〜900万円',
    employmentType: '正社員',
    description: 'データパイプラインの構築・運用を担当していただきます。',
    requirements: ['データエンジニアリング経験3年以上', 'SQL/Pythonの経験', 'ETL設計の経験', 'クラウドDWHの経験'],
    skills: ['Python', 'SQL', 'Airflow', 'BigQuery', 'dbt'],
    benefits: ['リモートワーク可', 'フレックスタイム', 'データ分析ツール補助', '勉強会参加支援'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    createdAt: '2023-12-29T00:00:00Z',
  },
  {
    id: '24',
    title: 'エンベデッドエンジニア',
    company: '株式会社IoTソリューションズ',
    location: '愛知県名古屋市',
    salary: '500万円〜800万円',
    employmentType: '正社員',
    description: 'IoTデバイスのファームウェア開発を担当していただきます。',
    requirements: ['組込み開発経験3年以上', 'C/C++の経験', 'RTOS経験', '通信プロトコルの知識'],
    skills: ['C', 'C++', 'RTOS', 'ARM', 'BLE'],
    benefits: ['フレックスタイム', '開発キット支給', '特許報奨金', '技術研修充実'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    createdAt: '2023-12-28T00:00:00Z',
  },
  {
    id: '25',
    title: 'プラットフォームエンジニア',
    company: '株式会社プラットフォームビルダーズ',
    location: 'フルリモート',
    salary: '650万円〜950万円',
    employmentType: '正社員',
    description: '開発者向けプラットフォームの構築・運用を担当していただきます。',
    requirements: ['インフラ/DevOps経験4年以上', 'Kubernetesの深い知識', 'IaCの経験', '開発者体験への関心'],
    skills: ['Kubernetes', 'Terraform', 'ArgoCD', 'GitHub Actions', 'Go'],
    benefits: ['完全フルリモート', 'フレックスタイム', 'OSS活動支援', 'カンファレンス登壇支援'],
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    createdAt: '2023-12-27T00:00:00Z',
  },
  {
    id: '26',
    title: 'Angularエンジニア',
    company: '株式会社エンタープライズフロント',
    location: '東京都新宿区',
    salary: '500万円〜750万円',
    employmentType: '正社員',
    description: 'Angularを使用した大規模Webアプリケーションの開発を担当していただきます。',
    requirements: ['Angular開発経験2年以上', 'TypeScriptの経験', 'RxJSの理解', 'ユニットテストの経験'],
    skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Jest'],
    benefits: ['リモートワーク週3日', '資格取得支援', '社内勉強会', 'メンター制度'],
    imageUrl: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800',
    createdAt: '2023-12-26T00:00:00Z',
  },
  {
    id: '27',
    title: '.NETエンジニア',
    company: '株式会社マイクロソフトパートナー',
    location: '東京都品川区',
    salary: '500万円〜800万円',
    employmentType: '正社員',
    description: '.NET/C#を使用した業務システムの開発を担当していただきます。',
    requirements: ['.NET開発経験3年以上', 'C#の実務経験', 'Azure経験', 'SQL Serverの経験'],
    skills: ['C#', '.NET', 'Azure', 'SQL Server', 'Blazor'],
    benefits: ['リモートワーク可', 'Microsoft認定資格支援', '最新Surface支給', '研修制度充実'],
    imageUrl: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=800',
    createdAt: '2023-12-25T00:00:00Z',
  },
  {
    id: '28',
    title: 'Flutterエンジニア',
    company: '株式会社クロスプラットフォーム',
    location: '福岡県福岡市',
    salary: '500万円〜750万円',
    employmentType: '正社員',
    description: 'Flutterを使用したクロスプラットフォームアプリの開発を担当していただきます。',
    requirements: ['モバイル開発経験2年以上', 'Flutter/Dartの経験', '状態管理の理解', 'ストアリリース経験'],
    skills: ['Flutter', 'Dart', 'Firebase', 'iOS', 'Android'],
    benefits: ['フルリモート可', '最新デバイス支給', 'カンファレンス参加支援', '副業OK'],
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    createdAt: '2023-12-24T00:00:00Z',
  },
  {
    id: '29',
    title: 'AIエンジニア',
    company: '株式会社ジェネレーティブAI',
    location: '東京都渋谷区',
    salary: '700万円〜1200万円',
    employmentType: '正社員',
    description: 'LLMを活用したアプリケーションの開発を担当していただきます。',
    requirements: ['AI/ML開発経験2年以上', 'Pythonの実務経験', 'LLM APIの利用経験', 'プロンプトエンジニアリングの知識'],
    skills: ['Python', 'LangChain', 'OpenAI API', 'Vector DB', 'FastAPI'],
    benefits: ['フルリモート可', 'GPU環境提供', 'AI関連カンファレンス参加支援', '研究時間確保'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    createdAt: '2023-12-23T00:00:00Z',
  },
  {
    id: '30',
    title: 'Node.jsエンジニア',
    company: '株式会社ノードワークス',
    location: '大阪府大阪市',
    salary: '450万円〜700万円',
    employmentType: '正社員',
    description: 'Node.js/NestJSを使用したバックエンド開発を担当していただきます。',
    requirements: ['Node.js開発経験2年以上', 'TypeScriptの経験', 'REST/GraphQL APIの経験', 'データベース設計の経験'],
    skills: ['Node.js', 'NestJS', 'TypeScript', 'GraphQL', 'PostgreSQL'],
    benefits: ['リモートワーク週4日', 'フレックスタイム', '書籍購入補助', '勉強会参加支援'],
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
    createdAt: '2023-12-22T00:00:00Z',
  },
  {
    id: '31',
    title: 'UI/UXエンジニア',
    company: '株式会社デザインシステムズ',
    location: '東京都目黒区',
    salary: '500万円〜800万円',
    employmentType: '正社員',
    description: 'デザインシステムの構築とUI実装を担当していただきます。',
    requirements: ['フロントエンド開発経験3年以上', 'デザインツールの使用経験', 'アクセシビリティの知識', 'コンポーネント設計の経験'],
    skills: ['React', 'Figma', 'Storybook', 'CSS', 'アクセシビリティ'],
    benefits: ['リモートワーク可', 'デザインツール補助', 'カンファレンス参加支援', '副業OK'],
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    createdAt: '2023-12-21T00:00:00Z',
  },
  {
    id: '32',
    title: 'ネットワークエンジニア',
    company: '株式会社ネットワークソリューションズ',
    location: '東京都千代田区',
    salary: '500万円〜750万円',
    employmentType: '正社員',
    description: 'ネットワークインフラの設計・構築・運用を担当していただきます。',
    requirements: ['ネットワーク経験3年以上', 'CCNA以上の資格', 'L2/L3スイッチの設計経験', 'トラブルシューティング能力'],
    skills: ['Cisco', 'ネットワーク設計', 'ファイアウォール', 'VPN', 'SDN'],
    benefits: ['資格取得全額支援', 'オンコール手当', '研修制度充実', '退職金制度'],
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800',
    createdAt: '2023-12-20T00:00:00Z',
  },
  {
    id: '33',
    title: 'DBAエンジニア',
    company: '株式会社データベースマスターズ',
    location: '東京都中央区',
    salary: '550万円〜850万円',
    employmentType: '正社員',
    description: 'データベースの設計・運用・チューニングを担当していただきます。',
    requirements: ['DBA経験3年以上', 'PostgreSQL/MySQLの深い知識', 'パフォーマンスチューニング経験', 'バックアップ/リカバリ設計経験'],
    skills: ['PostgreSQL', 'MySQL', 'Oracle', 'パフォーマンスチューニング', 'AWS RDS'],
    benefits: ['リモートワーク可', '資格取得支援', '技術書籍購入制度', '勉強会参加支援'],
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
    createdAt: '2023-12-19T00:00:00Z',
  },
  {
    id: '34',
    title: 'Salesforceエンジニア',
    company: '株式会社セールスフォースパートナー',
    location: '東京都港区',
    salary: '550万円〜900万円',
    employmentType: '正社員',
    description: 'Salesforceの導入・カスタマイズ・開発を担当していただきます。',
    requirements: ['Salesforce開発経験2年以上', 'Apex/LWCの経験', 'Salesforce認定資格', '顧客折衝経験'],
    skills: ['Salesforce', 'Apex', 'Lightning Web Components', 'SOQL', 'JavaScript'],
    benefits: ['リモートワーク可', '資格取得全額支援', '案件によりリモート率変動', '高年収'],
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    createdAt: '2023-12-18T00:00:00Z',
  },
  {
    id: '35',
    title: 'SAPエンジニア',
    company: '株式会社SAPコンサルティング',
    location: '東京都千代田区',
    salary: '600万円〜1000万円',
    employmentType: '正社員',
    description: 'SAP S/4HANAの導入・開発を担当していただきます。',
    requirements: ['SAP開発経験3年以上', 'ABAP開発経験', 'SAP認定資格', '業務知識（会計/販売/購買等）'],
    skills: ['SAP', 'ABAP', 'S/4HANA', 'Fiori', 'BTP'],
    benefits: ['リモートワーク可', '資格取得全額支援', '海外プロジェクト参加機会', '高年収'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    createdAt: '2023-12-17T00:00:00Z',
  },
  {
    id: '36',
    title: 'VRエンジニア',
    company: '株式会社バーチャルリアリティ',
    location: '東京都渋谷区',
    salary: '550万円〜850万円',
    employmentType: '正社員',
    description: 'VR/ARアプリケーションの開発を担当していただきます。',
    requirements: ['3D開発経験2年以上', 'Unity/Unreal Engineの経験', 'VR/ARデバイス開発経験', '3Dグラフィックスの知識'],
    skills: ['Unity', 'Unreal Engine', 'C#', 'C++', 'VR/AR'],
    benefits: ['最新VRデバイス支給', 'フレックスタイム', '技術カンファレンス参加支援', '社内VR体験会'],
    imageUrl: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800',
    createdAt: '2023-12-16T00:00:00Z',
  },
  {
    id: '37',
    title: 'FinTechエンジニア',
    company: '株式会社フィンテックイノベーション',
    location: '東京都千代田区',
    salary: '600万円〜950万円',
    employmentType: '正社員',
    description: '金融サービスのシステム開発を担当していただきます。',
    requirements: ['金融システム開発経験3年以上', 'セキュリティ意識の高い方', 'API設計の経験', '高可用性システムの経験'],
    skills: ['Java', 'Kotlin', 'AWS', 'Kubernetes', 'セキュリティ'],
    benefits: ['リモートワーク可', '高年収', '金融資格取得支援', '社内勉強会'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    createdAt: '2023-12-15T00:00:00Z',
  },
  {
    id: '38',
    title: 'HRTechエンジニア',
    company: '株式会社HRテクノロジー',
    location: 'フルリモート',
    salary: '500万円〜750万円',
    employmentType: '正社員',
    description: '人事・採用システムの開発を担当していただきます。',
    requirements: ['Web開発経験3年以上', 'SaaS開発経験', 'API設計の経験', 'アジャイル開発経験'],
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    benefits: ['完全フルリモート', 'フレックスタイム', '自社サービス利用可', '副業OK'],
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
    createdAt: '2023-12-14T00:00:00Z',
  },
  {
    id: '39',
    title: 'EdTechエンジニア',
    company: '株式会社エデュケーションテック',
    location: '東京都文京区',
    salary: '450万円〜700万円',
    employmentType: '正社員',
    description: 'オンライン学習プラットフォームの開発を担当していただきます。',
    requirements: ['Web開発経験2年以上', '動画配信の知識', 'UXへの関心', '教育への関心'],
    skills: ['React', 'Python', 'Django', 'AWS', 'WebRTC'],
    benefits: ['リモートワーク可', '自社サービス無料利用', '勉強会参加支援', '書籍購入補助'],
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
    createdAt: '2023-12-13T00:00:00Z',
  },
  {
    id: '40',
    title: 'HealthTechエンジニア',
    company: '株式会社ヘルスケアテック',
    location: '東京都港区',
    salary: '550万円〜850万円',
    employmentType: '正社員',
    description: '医療・ヘルスケア領域のシステム開発を担当していただきます。',
    requirements: ['Web開発経験3年以上', '個人情報の取り扱い意識', 'API設計の経験', 'ヘルスケアへの関心'],
    skills: ['TypeScript', 'React', 'Go', 'GCP', 'FHIR'],
    benefits: ['リモートワーク可', 'フレックスタイム', '健康関連サービス補助', '医療知識研修'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    createdAt: '2023-12-12T00:00:00Z',
  },
  {
    id: '41',
    title: 'ロボティクスエンジニア',
    company: '株式会社ロボットテクノロジー',
    location: '神奈川県川崎市',
    salary: '550万円〜900万円',
    employmentType: '正社員',
    description: '産業用ロボットのソフトウェア開発を担当していただきます。',
    requirements: ['ロボット開発経験2年以上', 'ROS/ROS2の経験', 'C++/Pythonの経験', '制御理論の知識'],
    skills: ['ROS', 'C++', 'Python', 'Linux', '制御工学'],
    benefits: ['フレックスタイム', '開発機材支給', '学会参加支援', '特許報奨金'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    createdAt: '2023-12-11T00:00:00Z',
  },
  {
    id: '42',
    title: '自動運転エンジニア',
    company: '株式会社オートノマステック',
    location: '愛知県名古屋市',
    salary: '650万円〜1100万円',
    employmentType: '正社員',
    description: '自動運転システムのソフトウェア開発を担当していただきます。',
    requirements: ['自動車/ロボット開発経験3年以上', 'C++の深い経験', 'センサー処理の経験', '機械学習の知識'],
    skills: ['C++', 'Python', 'ROS', 'CUDA', 'ディープラーニング'],
    benefits: ['高年収', '研究開発費支給', '学会・論文支援', '最先端技術へのアクセス'],
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    createdAt: '2023-12-10T00:00:00Z',
  },
  {
    id: '43',
    title: 'コンパイラエンジニア',
    company: '株式会社言語処理研究所',
    location: 'フルリモート',
    salary: '700万円〜1200万円',
    employmentType: '正社員',
    description: 'プログラミング言語のコンパイラ・ランタイム開発を担当していただきます。',
    requirements: ['コンパイラ/言語処理系開発経験', 'C/C++/Rustの深い経験', '計算機科学の知識', 'OSS貢献経験優遇'],
    skills: ['C++', 'Rust', 'LLVM', 'コンパイラ', '言語処理系'],
    benefits: ['完全フルリモート', 'OSS活動奨励', '学会参加支援', '高スペックPC支給'],
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800',
    createdAt: '2023-12-09T00:00:00Z',
  },
  {
    id: '44',
    title: 'ゲームサーバーエンジニア',
    company: '株式会社オンラインゲームズ',
    location: '東京都渋谷区',
    salary: '550万円〜850万円',
    employmentType: '正社員',
    description: 'オンラインゲームのサーバーサイド開発を担当していただきます。',
    requirements: ['サーバーサイド開発経験3年以上', 'リアルタイム通信の経験', '大規模システムの経験', 'ゲームへの関心'],
    skills: ['Go', 'C++', 'Redis', 'Kubernetes', 'gRPC'],
    benefits: ['フレックスタイム', 'ゲーム購入補助', '社内ゲーム大会', '最新ゲーム機支給'],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    createdAt: '2023-12-08T00:00:00Z',
  },
  {
    id: '45',
    title: 'SaaSプロダクトエンジニア',
    company: '株式会社SaaSビルダーズ',
    location: 'フルリモート',
    salary: '550万円〜850万円',
    employmentType: '正社員',
    description: 'BtoB SaaSプロダクトの開発を担当していただきます。',
    requirements: ['Web開発経験3年以上', 'SaaS/マルチテナントの経験', 'API設計の経験', 'プロダクト志向'],
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Stripe'],
    benefits: ['完全フルリモート', 'フレックスタイム', 'ストックオプション', '副業OK'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    createdAt: '2023-12-07T00:00:00Z',
  },
  {
    id: '46',
    title: 'Eコマースエンジニア',
    company: '株式会社ECプラットフォーム',
    location: '東京都港区',
    salary: '500万円〜750万円',
    employmentType: '正社員',
    description: 'ECサイトの開発・運用を担当していただきます。',
    requirements: ['Web開発経験2年以上', 'EC/決済システムの経験', 'パフォーマンス最適化の経験', 'セキュリティ意識'],
    skills: ['PHP', 'Laravel', 'Vue.js', 'MySQL', 'Stripe'],
    benefits: ['リモートワーク可', '社割制度', 'フレックスタイム', '書籍購入補助'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    createdAt: '2023-12-06T00:00:00Z',
  },
  {
    id: '47',
    title: 'メディアエンジニア',
    company: '株式会社メディアテック',
    location: '東京都渋谷区',
    salary: '500万円〜750万円',
    employmentType: '正社員',
    description: 'Webメディアのシステム開発を担当していただきます。',
    requirements: ['Web開発経験2年以上', 'CMSの開発経験', 'SEOの知識', 'パフォーマンス最適化の経験'],
    skills: ['Next.js', 'TypeScript', 'WordPress', 'AWS', 'CDN'],
    benefits: ['リモートワーク可', 'フレックスタイム', '副業OK', '自社メディア執筆機会'],
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
    createdAt: '2023-12-05T00:00:00Z',
  },
  {
    id: '48',
    title: '動画配信エンジニア',
    company: '株式会社ストリーミングテック',
    location: '東京都目黒区',
    salary: '550万円〜850万円',
    employmentType: '正社員',
    description: '動画配信プラットフォームの開発を担当していただきます。',
    requirements: ['バックエンド開発経験3年以上', '動画エンコードの知識', 'CDNの知識', 'ストリーミングプロトコルの理解'],
    skills: ['Go', 'FFmpeg', 'HLS', 'AWS MediaServices', 'Kubernetes'],
    benefits: ['リモートワーク可', 'フレックスタイム', '動画サービス無料', '技術カンファレンス参加支援'],
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    createdAt: '2023-12-04T00:00:00Z',
  },
  {
    id: '49',
    title: '検索エンジニア',
    company: '株式会社サーチテクノロジー',
    location: '東京都千代田区',
    salary: '600万円〜950万円',
    employmentType: '正社員',
    description: '検索システムの開発・改善を担当していただきます。',
    requirements: ['検索システム開発経験2年以上', 'Elasticsearchの深い知識', '自然言語処理の知識', 'ランキングアルゴリズムの理解'],
    skills: ['Elasticsearch', 'Python', 'NLP', 'Lucene', 'AWS'],
    benefits: ['リモートワーク可', 'フレックスタイム', '論文読み会', '技術書籍購入制度'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    createdAt: '2023-12-03T00:00:00Z',
  },
  {
    id: '50',
    title: 'レコメンドエンジニア',
    company: '株式会社パーソナライゼーション',
    location: 'フルリモート',
    salary: '600万円〜950万円',
    employmentType: '正社員',
    description: 'レコメンドシステムの開発・改善を担当していただきます。',
    requirements: ['ML/データサイエンス経験2年以上', 'Pythonの実務経験', 'レコメンドアルゴリズムの知識', 'A/Bテストの経験'],
    skills: ['Python', 'TensorFlow', 'Spark', 'AWS', 'A/Bテスト'],
    benefits: ['完全フルリモート', 'フレックスタイム', 'GPU環境完備', '論文投稿支援'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    createdAt: '2023-12-02T00:00:00Z',
  },
];

// デモ用：テストユーザーの初期お気に入りデータ（サーバーレス環境対応）
let favorites: Favorite[] = [
  { id: 'fav_1', userId: '1', jobId: '1', createdAt: '2024-01-20T10:00:00Z' },
  { id: 'fav_2', userId: '1', jobId: '3', createdAt: '2024-01-19T15:30:00Z' },
  { id: 'fav_3', userId: '1', jobId: '5', createdAt: '2024-01-18T09:00:00Z' },
  { id: 'fav_4', userId: '1', jobId: '10', createdAt: '2024-01-17T14:00:00Z' },
  { id: 'fav_5', userId: '1', jobId: '15', createdAt: '2024-01-16T11:00:00Z' },
];

const notifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'application_viewed',
    title: '応募書類が確認されました',
    message: '株式会社テックイノベーションがあなたの応募書類を確認しました。',
    isRead: false,
    link: '/jobs/1',
    createdAt: '2024-01-21T10:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    type: 'new_job',
    title: '新着求人のお知らせ',
    message: 'あなたのスキルにマッチした求人が5件追加されました。',
    isRead: false,
    link: '/jobs',
    createdAt: '2024-01-20T15:00:00Z',
  },
  {
    id: '3',
    userId: '1',
    type: 'scout',
    title: 'スカウトが届きました',
    message: 'グローバルテック株式会社からスカウトメッセージが届いています。',
    isRead: true,
    link: '/jobs/3',
    createdAt: '2024-01-19T09:00:00Z',
  },
];

const sessions = new Map<string, string>();
const applications: JobApplication[] = [];

// ============== Hono App ==============

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const app = new Hono().basePath('/api');

app.use('*', cors({ origin: (origin) => origin || '*', credentials: true }));

// Helper
function success<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

function error(message: string): ApiResponse<null> {
  return { success: false, error: message };
}

function getUserFromToken(authHeader: string | undefined): User | null {
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  // セッションMapを使わず、トークン形式のみチェック（サーバーレス環境対応）
  // 本番環境ではJWTなど永続化可能な認証方式を使用すべき
  if (token.startsWith('token_')) {
    return users[0]; // デモ用：常にテストユーザーを返す
  }
  return null;
}

// Auth routes
app.post('/auth/login', async (c) => {
  const { email, password } = await c.req.json();
  if (email === 'test@example.com' && password === 'password') {
    const user = users[0];
    const token = `token_${Date.now()}`;
    sessions.set(token, user.id);
    return c.json(success({ user, token }));
  }
  return c.json(error('Invalid credentials'), 401);
});

app.post('/auth/logout', (c) => {
  const token = c.req.header('Authorization')?.substring(7);
  if (token) sessions.delete(token);
  return c.json(success(null));
});

// Users routes
app.get('/users/me', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  return c.json(success(user));
});

app.put('/users/me', async (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const { name, phone, address } = await c.req.json();
  Object.assign(user, { name: name ?? user.name, phone: phone ?? user.phone, address: address ?? user.address });
  return c.json(success(user));
});

// Jobs routes
app.get('/jobs', (c) => {
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '10');
  const search = c.req.query('search')?.toLowerCase();
  const location = c.req.query('location');
  const skillsParam = c.req.query('skills');
  const skills = skillsParam ? skillsParam.split(',') : [];

  let filtered = [...jobs];
  if (search) {
    filtered = filtered.filter(
      (j) => j.title.toLowerCase().includes(search) || j.company.toLowerCase().includes(search) || j.description.toLowerCase().includes(search)
    );
  }
  if (location) {
    filtered = filtered.filter((j) => j.location.includes(location));
  }
  if (skills.length > 0) {
    filtered = filtered.filter((j) => skills.some((s) => j.skills.includes(s)));
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return c.json(
    success({
      jobs: paginated,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit), hasMore: start + limit < total },
    })
  );
});

app.get('/jobs/skills', (c) => {
  const skillSet = new Set<string>();
  jobs.forEach((j) => j.skills.forEach((s) => skillSet.add(s)));
  const allSkills = Array.from(skillSet);
  return c.json(success(allSkills));
});

app.get('/jobs/:id', (c) => {
  const job = jobs.find((j) => j.id === c.req.param('id'));
  if (!job) return c.json(error('Job not found'), 404);
  return c.json(success(job));
});

app.post('/jobs/:id/apply', async (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const jobId = c.req.param('id');
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return c.json(error('Job not found'), 404);
  const { name, phone, address, message } = await c.req.json();
  const application: JobApplication = {
    id: `app_${Date.now()}`,
    userId: user.id,
    jobId,
    name,
    phone,
    address,
    message,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  applications.push(application);
  return c.json(success(application));
});

// Favorites routes
app.get('/favorites', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const userFavorites = favorites
    .filter((f) => f.userId === user.id)
    .map((f) => ({ ...f, job: jobs.find((j) => j.id === f.jobId)! }))
    .filter((f) => f.job);
  return c.json(success(userFavorites));
});

app.get('/favorites/check/:jobId', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const isFavorite = favorites.some((f) => f.userId === user.id && f.jobId === c.req.param('jobId'));
  return c.json(success({ isFavorite }));
});

app.post('/favorites/:jobId', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const jobId = c.req.param('jobId');
  if (!favorites.some((f) => f.userId === user.id && f.jobId === jobId)) {
    const favorite: Favorite = { id: `fav_${Date.now()}`, userId: user.id, jobId, createdAt: new Date().toISOString() };
    favorites.push(favorite);
    return c.json(success(favorite));
  }
  return c.json(success(favorites.find((f) => f.userId === user.id && f.jobId === jobId)!));
});

app.delete('/favorites/:jobId', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  favorites = favorites.filter((f) => !(f.userId === user.id && f.jobId === c.req.param('jobId')));
  return c.json(success(null));
});

// Notifications routes
app.get('/notifications', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const userNotifications = notifications.filter((n) => n.userId === user.id);
  const unreadCount = userNotifications.filter((n) => !n.isRead).length;
  return c.json(success({ notifications: userNotifications, unreadCount }));
});

app.get('/notifications/unread-count', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const count = notifications.filter((n) => n.userId === user.id && !n.isRead).length;
  return c.json(success({ count }));
});

app.post('/notifications/:id/read', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  const notification = notifications.find((n) => n.id === c.req.param('id') && n.userId === user.id);
  if (!notification) return c.json(error('Not found'), 404);
  notification.isRead = true;
  return c.json(success(notification));
});

app.post('/notifications/read-all', (c) => {
  const user = getUserFromToken(c.req.header('Authorization'));
  if (!user) return c.json(error('Unauthorized'), 401);
  notifications.filter((n) => n.userId === user.id).forEach((n) => (n.isRead = true));
  return c.json(success(null));
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);
