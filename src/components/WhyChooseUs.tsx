import { useTranslations } from 'next-intl';
import { Users, FileCheck, Globe, Smartphone } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const t = useTranslations('WhyChooseUs');

  const features = [
    {
      icon: <Users className="w-12 h-12 text-red-600" />,
      title: t('features.trusted.title'),
      description: t('features.trusted.description'),
      color: 'bg-red-50 border-red-200',
    },
    {
      icon: <FileCheck className="w-12 h-12 text-blue-600" />,
      title: t('features.realQuestions.title'),
      description: t('features.realQuestions.description'),
      color: 'bg-blue-50 border-blue-200',
    },
    {
      icon: <Globe className="w-12 h-12 text-green-600" />,
      title: t('features.languages.title'),
      description: t('features.languages.description'),
      color: 'bg-green-50 border-green-200',
    },
    {
      icon: <Smartphone className="w-12 h-12 text-purple-600" />,
      title: t('features.loginOptions.title'),
      description: t('features.loginOptions.description'),
      color: 'bg-purple-50 border-purple-200',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-onest">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.color} border-2 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-onest">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed font-nunito">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">50,000+</div>
              <div className="text-gray-600 font-medium">{t('stats.successfulStudents')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">{t('stats.passRate')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">24+</div>
              <div className="text-gray-600 font-medium">{t('stats.languages')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">{t('stats.practiceQuestions')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
