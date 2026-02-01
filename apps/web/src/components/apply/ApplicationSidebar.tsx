import type { Job } from '@tenshoku/types';

interface ApplicationSidebarProps {
  job: Job;
}

export default function ApplicationSidebar({ job }: ApplicationSidebarProps) {
  return (
    <div className="space-y-6">
      <ApplicationTips />
      <RequiredSkills skills={job.skills} />
      <SecurityNotice />
      <ContactInfo />
    </div>
  );
}

function ApplicationTips() {
  const tips = [
    '志望動機は具体的に書くと好印象です',
    '自分のスキルや経験を活かせるポイントをアピール',
    '連絡先は正確に入力しましょう',
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        応募のコツ
      </h3>
      <ul className="space-y-3 text-sm text-gray-600">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RequiredSkills({ skills }: { skills: string[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        求められるスキル
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function SecurityNotice() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-gray-900">安心のセキュリティ</p>
          <p className="text-xs text-gray-500">SSL暗号化通信で保護</p>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        お客様の個人情報は厳重に管理し、採用活動以外の目的には使用いたしません。
      </p>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-bold text-gray-900 mb-3">お問い合わせ</h3>
      <p className="text-sm text-gray-600 mb-3">
        応募に関するご質問は下記までお気軽にどうぞ
      </p>
      <a
        href="mailto:support@tenshoku.example.com"
        className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        support@tenshoku.example.com
      </a>
    </div>
  );
}
